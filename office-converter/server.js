'use strict';

const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const execFileAsync = promisify(execFile);
const PORT = Number.parseInt(process.env.PORT || '3001', 10);
const MAX_FILE_BYTES = Number.parseInt(process.env.MAX_FILE_BYTES || String(50 * 1024 * 1024), 10);
const CONVERSION_TIMEOUT_MS = Number.parseInt(process.env.CONVERSION_TIMEOUT_MS || '120000', 10);
const MAX_CONCURRENT_CONVERSIONS = Math.max(1, Number.parseInt(process.env.MAX_CONCURRENT_CONVERSIONS || '2', 10));
const SOFFICE_PATH = process.env.SOFFICE_PATH || 'libreoffice';
const MIME_BY_EXTENSION = Object.freeze({
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
});
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || '*').split(',').map((origin) => origin.trim()).filter(Boolean);
let activeConversions = 0;
let activeRequests = 0;

app.disable('x-powered-by');
app.use(cors({
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes('*') || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new HttpError(403, 'Origin is not allowed by CORS.'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 600,
}));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_BYTES, files: 1, fields: 0, parts: 1 },
  fileFilter(_req, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase();
    const expectedMime = MIME_BY_EXTENSION[extension];
    const mimeMatches = file.mimetype === expectedMime || file.mimetype === 'application/octet-stream';
    if (!expectedMime || !mimeMatches) return callback(new HttpError(415, 'Only matching DOCX, PPTX, and XLSX files are supported.'));
    callback(null, true);
  },
});

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/convert', (req, res, next) => {
  if (activeRequests >= MAX_CONCURRENT_CONVERSIONS) {
    return next(new HttpError(503, 'The conversion service is busy. Please try again shortly.'));
  }
  activeRequests += 1;
  let released = false;
  const releaseRequest = () => {
    if (released) return;
    released = true;
    activeRequests -= 1;
  };
  res.once('finish', releaseRequest);
  res.once('close', releaseRequest);
  upload.single('file')(req, res, (error) => {
    if (error) return next(error);
    if (!req.file) return next(new HttpError(400, 'Upload one DOCX, PPTX, or XLSX file in the "file" field.'));
    return convertUpload(req, res, next);
  });
});

async function convertUpload(req, res, next) {
  let workDir;
  let handedOff = false;
  if (activeConversions >= MAX_CONCURRENT_CONVERSIONS) {
    return next(new HttpError(503, 'The conversion service is busy. Please try again shortly.'));
  }
  activeConversions += 1;
  try {
    const extension = path.extname(req.file.originalname).toLowerCase();
    // Office Open XML files are ZIP containers. Reject obvious mismatches before invoking LibreOffice.
    if (req.file.size < 4 || req.file.buffer[0] !== 0x50 || req.file.buffer[1] !== 0x4b) {
      throw new HttpError(415, 'The uploaded file is not a valid Office Open XML document.');
    }

    workDir = await fs.mkdtemp(path.join(os.tmpdir(), 'paperly-office-'));
    const inputPath = path.join(workDir, `input${extension}`);
    const outputPath = path.join(workDir, 'input.pdf');
    const profilePath = path.join(workDir, 'profile');
    await fs.mkdir(profilePath);
    await fs.writeFile(inputPath, req.file.buffer, { flag: 'wx', mode: 0o600 });

    try {
      await execFileAsync(SOFFICE_PATH, [
        '--headless',
        '--nologo',
        '--nodefault',
        '--nolockcheck',
        '--norestore',
        `-env:UserInstallation=${pathToFileUrl(profilePath)}`,
        '--convert-to', 'pdf',
        '--outdir', workDir,
        inputPath,
      ], {
        timeout: CONVERSION_TIMEOUT_MS,
        maxBuffer: 1024 * 1024,
        windowsHide: true,
        env: { ...process.env, HOME: workDir },
      });
    } catch (error) {
      if (error.code === 'ENOENT') throw new HttpError(503, 'LibreOffice was not found. Install it or set SOFFICE_PATH.');
      if (error.killed || error.code === 'ETIMEDOUT') throw new HttpError(504, 'Document conversion timed out.');
      throw new HttpError(422, 'LibreOffice could not convert this document. Check that the file is valid and not password-protected.');
    }

    const stat = await fs.stat(outputPath).catch(() => null);
    if (!stat || !stat.isFile() || stat.size < 5) throw new HttpError(422, 'LibreOffice did not produce a valid PDF.');
    const handle = await fs.open(outputPath, 'r');
    const signature = Buffer.alloc(5);
    await handle.read(signature, 0, 5, 0);
    await handle.close();
    if (signature.toString('ascii') !== '%PDF-') throw new HttpError(422, 'LibreOffice produced an invalid PDF.');

    const downloadName = `${path.basename(req.file.originalname, extension).replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 100) || 'document'}.pdf`;
    res.status(200);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': String(stat.size),
      'Content-Disposition': `attachment; filename="${downloadName.replace(/["\\]/g, '_')}"`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    handedOff = true;
    res.sendFile(outputPath, async (error) => {
      if (error && !res.headersSent) next(error);
      await cleanup(workDir);
      workDir = null;
      activeConversions -= 1;
    });
  } catch (error) {
    next(error);
  } finally {
    if (!handedOff) {
      if (workDir) await cleanup(workDir);
      activeConversions -= 1;
    }
  }
}

function pathToFileUrl(filePath) {
  return `file://${filePath.split(path.sep).map(encodeURIComponent).join('/')}`;
}

async function cleanup(directory) {
  if (directory) await fs.rm(directory, { recursive: true, force: true }).catch(() => {});
}

app.use((error, _req, res, _next) => {
  if (res.headersSent) return;
  const status = error instanceof HttpError ? error.status : error instanceof multer.MulterError ? (error.code === 'LIMIT_FILE_SIZE' ? 413 : 400) : 500;
  const message = error instanceof HttpError ? error.message
    : error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE' ? `File exceeds the ${Math.floor(MAX_FILE_BYTES / (1024 * 1024))} MB upload limit.`
      : error instanceof multer.MulterError ? 'Upload exactly one file using the "file" field.'
        : error.message === 'Origin is not allowed by CORS.' ? error.message : 'An unexpected conversion error occurred.';
  if (status >= 500) console.error('[office-converter]', error);
  res.status(status).json({ error: message });
});

app.listen(PORT, () => console.log(`Office converter listening on port ${PORT}`));

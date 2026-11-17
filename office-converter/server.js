'use strict';

const { execFile } = require('node:child_process');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { promisify } = require('node:util');
const { pathToFileURL } = require('node:url');
const cors = require('cors');
const express = require('express');
const multer = require('multer');

const app = express();
const execFileAsync = promisify(execFile);
const PORT = Number.parseInt(process.env.PORT || '3001', 10);
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const MAX_OUTPUT_BYTES = Number.parseInt(process.env.MAX_OUTPUT_BYTES || String(250 * 1024 * 1024), 10);
const CONVERSION_TIMEOUT_MS = Number.parseInt(process.env.CONVERSION_TIMEOUT_MS || '120000', 10);
const LIBREOFFICE_PATH = process.env.LIBREOFFICE_PATH || 'libreoffice';
const OFFICE_TYPES = {
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

const configuredOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    if (!origin || configuredOrigins.includes('*') || configuredOrigins.includes(origin)) {
      return callback(null, true);
    }
    const error = new Error('This website is not allowed to use the conversion API.');
    error.status = 403;
    return callback(error);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

function cleanupWorkspace(req) {
  if (!req.officeWorkspace || req.officeWorkspaceCleaned) return Promise.resolve();
  req.officeWorkspaceCleaned = true;
  return fs.rm(req.officeWorkspace, { recursive: true, force: true }).catch(() => {});
}

async function createWorkspace(req, res, next) {
  try {
    req.officeWorkspace = await fs.mkdtemp(path.join(os.tmpdir(), 'paperly-office-'));
    next();
  } catch (error) {
    next(error);
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, req.officeWorkspace);
    },
    filename(req, file, callback) {
      const extension = path.extname(file.originalname.replace(/\\/g, '/').split('/').pop() || '').toLowerCase();
      callback(null, `source${extension}`);
    },
  }),
  limits: { fileSize: MAX_UPLOAD_BYTES, files: 1, fields: 0, parts: 1 },
  fileFilter(req, file, callback) {
    const originalName = file.originalname.replace(/\\/g, '/').split('/').pop() || '';
    const extension = path.extname(originalName).toLowerCase();
    const expectedMime = OFFICE_TYPES[extension];
    const mime = (file.mimetype || '').toLowerCase();
    if (!expectedMime || (mime && mime !== expectedMime && mime !== 'application/octet-stream')) {
      const error = new Error('Upload must be a DOCX, PPTX, or XLSX file with a matching MIME type.');
      error.code = 'UNSUPPORTED_OFFICE_FILE';
      return callback(error);
    }
    callback(null, true);
  },
});

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'paperly-office-converter' });
});

app.post('/convert', createWorkspace, (req, res, next) => {
  upload.single('file')(req, res, (error) => {
    if (error) return next(error);
    next();
  });
}, async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('Upload one file using the multipart field named "file".');
      error.status = 400;
      throw error;
    }
    if (!req.file.size) {
      const error = new Error('The uploaded file is empty.');
      error.status = 400;
      throw error;
    }

    const inputPath = req.file.path;
    const inputHandle = await fs.open(inputPath, 'r');
    const archiveSignature = Buffer.alloc(4);
    await inputHandle.read(archiveSignature, 0, archiveSignature.length, 0);
    await inputHandle.close();
    if (archiveSignature[0] !== 0x50 || archiveSignature[1] !== 0x4b) {
      const error = new Error('The uploaded file is not a valid Office Open XML archive.');
      error.status = 415;
      throw error;
    }

    const outputPath = path.join(req.officeWorkspace, 'source.pdf');
    const profilePath = path.join(req.officeWorkspace, 'libreoffice-profile');
    const profileUrl = pathToFileURL(profilePath).href;

    try {
      await execFileAsync(LIBREOFFICE_PATH, [
        '--headless',
        `-env:UserInstallation=${profileUrl}`,
        '--convert-to', 'pdf',
        '--outdir', req.officeWorkspace,
        inputPath,
      ], {
        timeout: CONVERSION_TIMEOUT_MS,
        maxBuffer: 1024 * 1024,
        windowsHide: true,
      });
    } catch (error) {
      if (error.code === 'ENOENT') {
        error.status = 503;
        error.publicMessage = 'LibreOffice was not found. Install it or set LIBREOFFICE_PATH.';
      } else if (error.killed || error.signal === 'SIGTERM') {
        error.status = 504;
        error.publicMessage = 'The document conversion timed out.';
      } else {
        error.status = 422;
        error.publicMessage = 'LibreOffice could not convert this document.';
      }
      throw error;
    }

    let outputStat;
    try {
      outputStat = await fs.stat(outputPath);
    } catch {
      const error = new Error('LibreOffice did not produce a PDF.');
      error.status = 422;
      throw error;
    }
    if (!outputStat.isFile() || outputStat.size < 5) {
      const error = new Error('LibreOffice produced an invalid or empty PDF.');
      error.status = 422;
      throw error;
    }
    if (outputStat.size > MAX_OUTPUT_BYTES) {
      const error = new Error('The converted PDF exceeds the configured output-size limit.');
      error.status = 413;
      throw error;
    }
    const handle = await fs.open(outputPath, 'r');
    const signature = Buffer.alloc(5);
    await handle.read(signature, 0, signature.length, 0);
    await handle.close();
    if (signature.toString('ascii') !== '%PDF-') {
      const error = new Error('LibreOffice output was not a valid PDF.');
      error.status = 422;
      throw error;
    }

    res.status(200).type('application/pdf');
    res.setHeader('Content-Length', outputStat.size);
    res.setHeader('Content-Disposition', 'attachment; filename="converted.pdf"');
    res.sendFile(outputPath, (sendError) => {
      cleanupWorkspace(req);
      if (sendError && !res.headersSent) next(sendError);
    });
  } catch (error) {
    await cleanupWorkspace(req);
    next(error);
  }
});

app.use((error, req, res, next) => {
  cleanupWorkspace(req);
  if (res.headersSent) return next(error);

  let status = error.status || 500;
  let message = error.publicMessage || error.message || 'An unexpected conversion error occurred.';
  if (error instanceof multer.MulterError) {
    status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    message = error.code === 'LIMIT_FILE_SIZE'
      ? 'Upload size must not exceed 50 MB.'
      : 'Upload one file in a multipart field named "file".';
  } else if (error.code === 'UNSUPPORTED_OFFICE_FILE') {
    status = 415;
  } else if (status === 500) {
    message = 'The conversion service encountered an internal error.';
    console.error('Office conversion request failed:', error);
  }
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Paperly Office Converter listening on port ${PORT}`);
});

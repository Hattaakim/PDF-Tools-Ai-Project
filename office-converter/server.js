'use strict';

const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { promisify } = require('node:util');
const { execFile } = require('node:child_process');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const execFileAsync = promisify(execFile);
const PORT = Number(process.env.PORT || 3001);
const MAX_FILE_BYTES = 50 * 1024 * 1024;
const CONVERSION_TIMEOUT_MS = Number(process.env.CONVERSION_TIMEOUT_MS || 120000);
const LIBREOFFICE_PATH = process.env.LIBREOFFICE_PATH || 'libreoffice';
const MAX_CONCURRENT_CONVERSIONS = 2;
let activeConversions = 0;
const officeTypes = Object.freeze({
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
});

const allowedOrigins = (process.env.CORS_ORIGIN || '*').split(',').map(value => value.trim()).filter(Boolean);
app.use(cors({ origin: allowedOrigins.includes('*') ? '*' : allowedOrigins, methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type'] }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_BYTES, files: 1, fields: 0, parts: 1 },
});

function validateOfficeFile(file) {
  const extension = path.extname(file.originalname).toLowerCase();
  const expectedType = officeTypes[extension];
  if (!expectedType) {
    const error = new Error('Only DOCX, PPTX, and XLSX files are supported.');
    error.status = 415;
    throw error;
  }
  if (file.mimetype && file.mimetype !== expectedType && file.mimetype !== 'application/octet-stream') {
    const error = new Error('The file extension and MIME type do not match.');
    error.status = 415;
    throw error;
  }
  return extension;
}

async function convertOfficeFile(file) {
  const extension = validateOfficeFile(file);
  const workDir = await fs.mkdtemp(path.join(os.tmpdir(), 'paperly-office-'));
  const inputDir = path.join(workDir, 'input');
  const outputDir = path.join(workDir, 'output');
  const profileDir = path.join(workDir, 'lo-profile');
  const inputPath = path.join(inputDir, `document${extension}`);
  const outputPath = path.join(outputDir, 'document.pdf');
  try {
    await Promise.all([fs.mkdir(inputDir), fs.mkdir(outputDir)]);
    await fs.writeFile(inputPath, file.buffer, { flag: 'wx', mode: 0o600 });
    const profileUrl = pathToFileURL(profileDir).href;
    await execFileAsync(LIBREOFFICE_PATH, [
      '--headless', '--nologo', '--nodefault', '--nolockcheck', '--nofirststartwizard',
      `-env:UserInstallation=${profileUrl}`,
      '--convert-to', 'pdf', '--outdir', outputDir, inputPath,
    ], {
      timeout: CONVERSION_TIMEOUT_MS,
      maxBuffer: 1024 * 1024,
      windowsHide: true,
      env: { ...process.env, HOME: workDir, TMPDIR: workDir },
    });
    const pdf = await fs.readFile(outputPath);
    if (pdf.length < 5 || pdf.subarray(0, 5).toString('ascii') !== '%PDF-') {
      throw new Error('LibreOffice did not produce a valid PDF.');
    }
    return pdf;
  } finally {
    await fs.rm(workDir, { recursive: true, force: true });
  }
}

app.post('/convert', (req, res, next) => {
  upload.single('file')(req, res, error => {
    if (error) return next(error);
    if (!req.file) {
      const missing = new Error('Upload exactly one file in the multipart "file" field.');
      missing.status = 400;
      return next(missing);
    }
    if (activeConversions >= MAX_CONCURRENT_CONVERSIONS) {
      const busy = new Error('The conversion service is busy. Please try again shortly.');
      busy.status = 503;
      return next(busy);
    }
    activeConversions++;
    convertOfficeFile(req.file).then(pdf => {
      const base = path.basename(req.file.originalname, path.extname(req.file.originalname));
      const safeName = base.replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120) || 'document';
      res.status(200).type('application/pdf').set({
        'Content-Disposition': `attachment; filename="${safeName}.pdf"`,
        'Content-Length': String(pdf.length),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      }).send(pdf);
    }).catch(next).finally(() => { activeConversions--; });
  });
});

app.use((error, _req, res, _next) => {
  if (res.headersSent) return res.end();
  let status = error.status || 500;
  let message = error.message || 'Office conversion failed.';
  if (error instanceof multer.MulterError) {
    status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    message = error.code === 'LIMIT_FILE_SIZE' ? 'File size must not exceed 50 MB.' : 'Upload exactly one file in the multipart "file" field.';
  }
  if (status >= 500) {
    console.error('[office-converter]', error.code || error.name || 'Error', message);
    if (error.code === 'ENOENT') message = 'LibreOffice was not found. Install it or set LIBREOFFICE_PATH.';
    else if (error.killed || error.code === 'ETIMEDOUT') message = 'Conversion timed out. Try a smaller or simpler document.';
    else message = 'Conversion failed. Check that the Office document is valid and try again.';
  }
  res.status(status).json({ error: message });
});

app.listen(PORT, () => console.log(`Paperly Office Converter listening on port ${PORT}`));

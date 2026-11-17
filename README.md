# PDF-Tools-Ai-Project

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Remixed using [OMGithub.com](https://go.ondev.store/).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://go.ondev.store/Hattaakim/PDF-Tools-Ai-Project)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/Hattaakim/PDF-Tools-Ai-Project)

- 🎮 [Open the project](https://go.ondev.store/Hattaakim/PDF-Tools-Ai-Project).
- ✨ [Remix this project](https://go.ondev.store/Hattaakim/PDF-Tools-Ai-Project?remix=1).
- 💻 [Explore the source](https://github.com/Hattaakim/PDF-Tools-Ai-Project).
- 🛠️ [Check build runs](https://github.com/Hattaakim/PDF-Tools-Ai-Project/actions).
- 🐛 [Report an issue](https://github.com/Hattaakim/PDF-Tools-Ai-Project/issues).
- 👤 [Explore the creator's projects](https://go.ondev.store/Hattaakim).
- 🌍 [Create with OMGithub](https://go.ondev.store/).
- 🧬 [Explore the remix source](https://github.com/Hattaakim/PDF-Tools-Ai-Project).
<!-- omgithub:readme:end -->

## Office to PDF conversion service

DOCX, PPTX, and XLSX conversion is handled by the separate Node.js + LibreOffice service in `office-converter/`. The browser uploads one document to `POST /convert`, previews the returned PDF, and downloads that same PDF when the user confirms. The frontend's Office API URL defaults to `http://localhost:3001` and can be changed in the conversion dialog.

### Requirements and startup

- Node.js 18 or newer
- LibreOffice installed and available as `libreoffice` on `PATH` (or configure `SOFFICE_PATH`)

From the project directory, start the service with:

```sh
cd office-converter
npm install
npm start
```

The API listens on port `3001` by default. Set `PORT` to change it. `GET /health` returns a small health status response.

### API contract

Send a `multipart/form-data` request to `/convert`, with exactly one file in the `file` field. Supported file extensions and MIME types are DOCX, PPTX, and XLSX. The default upload size limit is 50 MiB. Successful requests return the converted document with `Content-Type: application/pdf`; errors return JSON with an `error` message. Conversion has a 120-second timeout and allows two concurrent jobs by default.

Optional environment settings:

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3001` | HTTP listen port |
| `SOFFICE_PATH` | `libreoffice` | LibreOffice executable path |
| `MAX_FILE_BYTES` | `52428800` | Maximum upload size in bytes |
| `CONVERSION_TIMEOUT_MS` | `120000` | Per-document conversion timeout |
| `MAX_CONCURRENT_CONVERSIONS` | `2` | Maximum simultaneous LibreOffice jobs |
| `CORS_ORIGINS` | `*` | Comma-separated allowed browser origins; `*` allows any origin |

For deployment, set `CORS_ORIGINS` to the exact frontend origin(s), restrict network access, and put the service behind appropriate authentication and rate limiting. CORS is not an access-control mechanism for non-browser clients. LibreOffice processes untrusted office documents, so run the service as an unprivileged user in a resource-limited environment and keep LibreOffice updated. Temporary uploads and conversion profiles are removed after the response completes.

### OCR output

The existing searchable-PDF OCR mode renders source pages at up to 3200 pixels per dimension (with a 12-megapixel cap), embeds each rendered page as a PNG, and adds recognized words as transparent PDF text. The visual page remains high-resolution while text can be selected and searched. Office conversion itself does not rasterize PDFs in the browser; LibreOffice generates the preview/download PDF.

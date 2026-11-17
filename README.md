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

DOCX, PPTX, and XLSX conversion is handled by a separate Node.js service that runs LibreOffice. The browser sends the selected Office file to the service; the returned PDF is used for both the in-app preview and the download. The service is not required for the other browser-based PDF tools.

### Requirements and startup

- Node.js 18 or newer
- LibreOffice installed on the machine running the service (`libreoffice` on `PATH`; use `LIBREOFFICE_PATH` if the executable is named differently)

```sh
cd office-converter
npm install
npm start
```

The API listens on `http://localhost:3001` by default. Check it with `GET /health`. In the Office-to-PDF dialog, enter the service's base URL; the browser saves this setting locally. Conversion uses `POST /convert` with a multipart form field named `file` and returns `application/pdf`.

### Configuration

| Environment variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3001` | HTTP port |
| `LIBREOFFICE_PATH` | `libreoffice` | LibreOffice executable path/name (for example, `soffice`) |
| `CORS_ORIGIN` | `*` | Comma-separated allowed browser origins; set this to the exact origin(s) hosting the UI when possible |
| `CONVERSION_TIMEOUT_MS` | `120000` | Per-document conversion timeout |
| `MAX_OUTPUT_BYTES` | `262144000` (250 MiB) | Maximum generated PDF size |

Uploads are limited to one DOCX/PPTX/XLSX file up to 50 MiB, and the extension must agree with the corresponding Office MIME type (or the browser may report `application/octet-stream`). Temporary input, profile, and output files are removed after the request completes. Conversion failures return a JSON object such as `{ "error": "..." }` with an appropriate HTTP status.

The service has no built-in authentication or rate limiting. Do not expose it directly to the public internet; for a remote deployment, place it behind an authenticated/restricted reverse proxy, use HTTPS, and configure `CORS_ORIGIN` for the UI origin. CORS is not an authentication mechanism.

### Text and OCR notes

LibreOffice-generated PDFs retain normal document text as selectable/searchable text. The separate browser OCR tool creates a searchable PDF from scanned input by rendering page images at higher resolution and adding a hidden text layer; it does not send those files to the Office conversion service. Since scanned or image-only content in an Office document is not automatically OCRed by LibreOffice, run the resulting PDF through the OCR tool if searchable text is needed.

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

DOCX, PPTX, and XLSX are converted by a server-side Node.js + LibreOffice service. The browser uses the same returned PDF for preview and download. Other PDF tools continue to run in the browser.

### Run the complete app (recommended)

Docker Compose starts the static app and the conversion service together. LibreOffice is installed inside its service container; end users do not install it or enter a localhost port. The app defaults to the same-origin `/api/office` endpoint, which the included Nginx reverse proxy forwards internally to the converter.

Requirements: Docker Engine and the Docker Compose plugin.

```sh
docker compose up --build
```

Open <http://localhost:8080>. To choose a different local port, set `PAPERLY_PORT` (for example, `PAPERLY_PORT=8088 docker compose up --build`). In production, serve this stack behind your HTTPS domain/reverse proxy and keep the converter container private; users then use the site normally without API configuration.

The bundled proxy applies a basic per-IP request rate limit. For a public deployment, also put the app/API behind your normal access controls, abuse monitoring, and resource limits as appropriate. The converter has no built-in user authentication; CORS is not authentication.

### Separate/manual setup

If you host the UI separately from the Compose stack, the UI's API URL setting may be pointed to the externally reachable converter/proxy base URL. Conversion uses `POST <base-url>/convert` with a multipart field named `file`, returning `application/pdf`; `GET /health` checks service health. Browser access to a remote API requires HTTPS on a public HTTPS site and an appropriate `CORS_ORIGIN` setting.

For running the Node service directly (rather than with Docker), you need Node.js 18+ and LibreOffice installed on the server:

```sh
cd office-converter
npm ci
npm start
```

The direct service listens on port 3001 by default. This manual mode is for development/server operators, not something end users should need to set up.

### Configuration

| Environment variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3001` | HTTP port |
| `LIBREOFFICE_PATH` | `libreoffice` | LibreOffice executable path/name (for example, `soffice`) |
| `CORS_ORIGIN` | `*` | Comma-separated allowed browser origins; configure exact UI origin(s) for direct cross-origin use |
| `CONVERSION_TIMEOUT_MS` | `120000` | Per-document conversion timeout |
| `MAX_OUTPUT_BYTES` | `262144000` (250 MiB) | Maximum generated PDF size |

Uploads are limited to one DOCX/PPTX/XLSX file up to 50 MiB, and the extension must agree with the corresponding Office MIME type (or the browser may report `application/octet-stream`). Temporary input, profile, and output files are removed after each request. Conversion failures return JSON such as `{ "error": "..." }` with an appropriate HTTP status.

### Text and OCR notes

LibreOffice-generated PDFs retain normal document text as selectable/searchable text. The separate browser OCR tool creates a searchable PDF from scanned input by rendering page images at higher resolution and adding a hidden text layer; it does not send those files to the Office conversion service. Since scanned or image-only content in an Office document is not automatically OCRed by LibreOffice, run the resulting PDF through the OCR tool if searchable text is needed.

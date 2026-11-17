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

## Office documents to PDF

DOCX, PPTX, and XLSX conversion is handled by the separate Node.js service in `office-converter/`. Office files are uploaded to the conversion API you configure; other PDF tools continue to run in the browser. The preview and download use the exact same PDF returned by that service.

### Requirements

- Node.js 18 or newer
- LibreOffice (including `soffice`/`libreoffice`) installed on the machine running the service

Install LibreOffice with your platform's package manager or from [libreoffice.org](https://www.libreoffice.org/download/download/). On Debian/Ubuntu, for example:

```sh
sudo apt-get update
sudo apt-get install -y libreoffice
```

### Start the conversion API

```sh
cd office-converter
npm install
npm start
```

The API listens on `http://localhost:3001` by default. In Paperly, open **Office ke PDF** and set **URL dasar API konversi** to the API's base URL. The service accepts `POST /convert` as `multipart/form-data` with one `file` field and returns `application/pdf`; `GET /health` is available for a basic health check. Uploads are limited to 50 MB and must have a matching DOCX, PPTX, or XLSX extension and MIME type. Temporary input, output, and LibreOffice profile files are removed after each conversion.

### Configuration

| Environment variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3001` | HTTP port for the API |
| `CORS_ORIGIN` | `*` | Comma-separated allowed browser origins, or `*` |
| `LIBREOFFICE_PATH` | `libreoffice` | LibreOffice executable path (use `soffice` if that is its name on your system) |
| `CONVERSION_TIMEOUT_MS` | `120000` | Per-document conversion timeout in milliseconds |

For example, to serve the frontend from `https://paperly.example.com`:

```sh
CORS_ORIGIN=https://paperly.example.com PORT=3001 npm start
```

For deployments, put the API behind HTTPS and restrict CORS to the frontend's origin. Do not expose an unauthenticated conversion service to untrusted networks without suitable access controls and resource limits.

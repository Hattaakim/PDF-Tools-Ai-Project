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

## Pembuat PDF

**Pembuat PDF** menulis dokumen baru langsung di browser lalu mengekspornya menjadi PDF. Selain format teks dasar, editor menyediakan pengaturan tata letak:

- Ukuran kertas (A4, A5, B5, Letter, Legal, F4/Folio, A3) dan margin atas, kanan, bawah, kiri.
- Orientasi halaman portrait atau landscape.
- Jumlah kolom yang berlaku khusus pada teks yang dipilih/diblok, bukan seluruh dokumen.
- Inden kiri, inden baris pertama, spasi baris, dan spasi paragraf.
- Perataan teks rata kiri, tengah, kanan, dan rata kiri-kanan (justify).

Semua proses dokumen berjalan lokal di perangkat; tidak ada file yang diunggah ke server.

## Perbaikan progress bar

Progress bar pada alat PDF tidak lagi terlihat penuh (100%) saat file diganti atau saat proses baru dimulai:

- Indikator "sedang menyiapkan" tidak lagi bergantung pada animasi transform. Jika animasi dinonaktifkan (misalnya karena pengaturan *reduced motion*), indikator tampil sebagai pita 35%, bukan bar penuh.
- Setiap proses kini punya penanda sesi. Mengganti/menambah file, menutup dialog, atau membuka alat lain otomatis membatalkan proses lama sehingga hasil dan progresnya tidak lagi menimpa file yang baru dipilih.
- Saat progress bar disembunyikan, lebar isi dan nilai `aria-valuenow` direset ke nol, jadi proses berikutnya selalu mulai dari keadaan bersih.
- Tombol aksi kembali aktif setelah file diganti, sehingga file baru bisa langsung diproses tanpa menunggu proses lama selesai.

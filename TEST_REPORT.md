# Laporan Pengujian — Ruang Kerja Edit PDF, Anotasi, dan Riwayat Backup

Tanggal: 23 November 2026
Cabang: `opencode/45125279255`
Lingkungan: Chromium headless (Playwright), server lokal `http://127.0.0.1:8123`, file uji `edit-test.pdf` (2 halaman).

## Ringkasan

| Pengujian | Hasil |
| --- | --- |
| Regresi utama fitur baru (21 kasus) | **21/21 lulus** |
| Regresi offline/regresi lama yang disesuaikan (5 kasus) | **5/5 lulus** |
| Pemulihan offline semua fitur (11 kasus) | **11/11 lulus** |
| Navigasi offline (5 kasus) | **5/5 lulus** |
| **Total** | **42/42 lulus** |

Tidak ada error JavaScript atau consoles error yang tercatat selama seluruh pengujian.

## Detail pengujian fitur baru

1. Halaman dimuat tanpa error JS awal.
2. Tombol **Riwayat backup** tersembunyi saat belum ada backup untuk semua fitur.
3. Kartu **Edit PDF** membuka halaman mandiri (`#editPage.open`), bukan modal alat, dengan layar awal pilih file.
4. PDF uji termuat; workspace aktif, label `Halaman 1 dari 2`, tombol **Simpan PDF** aktif.
5. Anotasi **Teks** ditambahkan lewat klik; penanda **Belum disimpan** muncul.
6. Anotasi **Sorot** ditambahkan lewat seret; elemen DOM dan model sesuai.
7. Anotasi **Garis bawah**, **Coret**, dan **Kotak** ditambahkan lewat seret pada area berbeda.
8. Anotasi **Catatan** ditambahkan dengan kolom teks yang bisa diketik.
9. Coretan **Pensil** ditambahkan; model menyimpan lebih dari satu titik.
10. Backup otomatis tersimpan di IndexedDB (berisi ArrayBuffer PDF), dan tombol riwayat langsung tampil.
11. Dialog riwayat terbuka dengan judul `Riwayat backup — Tulis & Sunting` dan minimal satu entri.
12. **Simpan salinan sekarang** menghasilkan dua entri backup yang hidup berdampingan.
13. **Pulihkan** dari entri lama menutup dialog, menjaga halaman editor tetap terbuka, dan memulihkan isi anotasi.
14. Tombol **Simpan PDF** membuka dialog simpan dengan nama `edit-test-suntingan`.
15. `saveEditorPDF()` menghasilkan data valid (`%PDF-`, > 1,5 KB) yang memuat anotasi.
16. Tata letak responsif pada viewport 390×844: bilah atas tidak melebihi lebar layar, area pratinjau dapat digulirkan horizontal.
17. Tombol **Kembali** memunculkan konfirmasi saat ada suntingan.
18. **Tetap di sini** mempertahankan halaman editor.
19. **Ya, tutup** menutup halaman mandiri dan menghapus kelas `editing` dari body.
20. Tombol riwayat muncul untuk **Edit PDF, Pembuat PDF, PDF Sheet, dan Database SQLite** saat backup tersedia.
21. Tidak ada error JS selama seluruh alur.

## Pengujian regresi

- **Regresi lama yang disesuaikan dengan arsitektur baru** (5/5): peringatan `beforeunload` masih aktif, pindah alat meminta konfirmasi, konfirmasi membuka alat tujuan, tombol unduh pratinjau sheet tetap terlihat di layar 375 px, tanpa error runtime.
- **Pemulihan offline seluruh fitur** (11/11): backup dokumen, sheet, dan database berisi konten unik, ukuran backup dihitung benar, pemulihan mengembalikan isi/nama/variabel/tabel, dan retensi membatasi jumlah entri. Adapter pengujian menggunakan `kind` karena ID backup sekarang unik per entri.
- **Navigasi offline** (5/5): cache aset siap, backup ada sebelum reload, shell aplikasi dimuat dari cache saat offline, backup dipulihkan tanpa jaringan (termasuk nama file asli), tanpa error.

## Catatan implementasi

- Edit PDF tidak lagi memakai modal alat; status halaman kini ikut dijaga saat berpindah alat, menutup halaman, dan memuat ulang tab.
- Anotasi baru: sorotan, garis bawah, coretan teks, kotak, dan catatan, ditambahkan ke teks/gambar/pensil yang sudah ada.
- Backup kini dibuat dengan ID unik, maksimal 5 entri per fitur dan 12 entri total; salinan manual selalu dibuat sebagai entri baru.
- Cache aset dan query string versi dinaikkan ke `v50` agar service worker tidak menyajikan berkas lama.

---

# Putaran Pengujian Lanjutan — 24 November 2026

Cabang: `opencode/45331698890`
Lingkungan: Chromium headless (Playwright), server lokal `http://127.0.0.1:8123`, file uji `fixture.pdf` (2 halaman dengan teks asli).

## Ringkasan

| Pengujian | Hasil |
| --- | --- |
| Verifikasi fitur baru (18 kasus) | **18/18 lulus** |
| Regresi inti aplikasi (14 kasus) | **14/14 lulus** |
| **Total** | **32/32 lulus** |

Tidak ada error JavaScript atau console error yang tercatat.

## Cakupan fitur baru

1. Pratinjau Edit PDF dirender tajam pada layar high-DPI: canvas 1904 px untuk tampilan CSS 952 px (rasio 2×), bukan lagi dibatasi 720 px.
2. Tombol **zoom +** memperbesar halaman dari 952 px ke 1095 px dan label berubah menjadi `115%`.
3. Tombol **Fit** mengembalikan tampilan ke `100%` dan lebar awal.
4. Mode **Pilih teks** mengaktifkan lapisan teks PDF; 3 span teks terdeteksi dan menerima pointer event.
5. Teks PDF dapat diblok dan disalin; hasil seleksi berisi `Hello Paperly selection test`.
6. Anotasi teks tetap dapat ditambahkan setelah mode pilih teks dinonaktifkan.
7. Backup **Tulis & Sunting** menyimpan beberapa entri sekaligus; 8 penyimpanan manual dipangkas menjadi 5 entri terbaru dengan ID unik.
8. Dialog riwayat menampilkan kelima entri beserta tombol **Pulihkan**, **Hapus**, dan **Simpan salinan sekarang**.
9. Entri backup dapat dipulihkan lengkap dengan anotasi, halaman, dan lapisan teks.
10. Kolom judul Pembuat PDF memiliki nilai awal **Dokumen baru**.
11. Judul yang diketik dipakai sebagai nama file pada dialog simpan (`Laporan-Uji-Paperly`).
12. Metadata PDF memakai judul yang diketik (`Laporan Uji Paperly`).
13. Backup Pembuat PDF ikut menyimpan judul dokumen.
14. Tombol riwayat backup PDF Sheet berubah menjadi ikon 34 px di layar mobile.
15. Tombol riwayat backup tidak lagi menutupi judul sheet pada 390 px.
16. Tombol ikon tetap membuka dialog riwayat PDF Sheet.
17. Workspace Edit PDF menyesuaikan lebar layar mobile tanpa overflow horizontal.
18. Tidak ada error JavaScript.

## Cakupan regresi

- Halaman utama dan 25 kartu alat termuat; service worker tersedia.
- Hanya satu workspace mandiri (Edit PDF, Pembuat PDF, PDF Sheet, Database SQLite) aktif saat berpindah alat.
- PDF 2 halaman dimuat dengan pratinjau dan label halaman yang benar.
- Enam jenis anotasi tampil di halaman pertama; penanda **Belum disimpan** aktif.
- Navigasi halaman 1 → 2 → 1 bekerja dan memuat anotasi halaman yang sesuai.
- `saveEditorPDF()` menghasilkan PDF valid 2 halaman (12.166 byte) dengan anotasi di kedua halaman.
- Backup Edit PDF tersimpan, tombol riwayat muncul, dan penghapusan entri dari dialog mengurangi jumlah entri.
- Tombol riwayat backup merespons di keempat fitur dengan judul dialog yang benar.
- Judul dokumen dipakai pada dialog simpan (`Regresi-Dokumen`).
- Tombol backup PDF Sheet tidak menutupi judul pada lebar 390, 360, dan 320 px; tidak ada overflow horizontal.
- Kolom judul Pembuat PDF tetap terlihat dan dapat dipakai pada lebar 360 px.
- Service worker memakai cache `paperly-ui-v51` dan aset `app.js?v=51`.

## Pemeriksaan tambahan manajemen backup

- 20 entri uji dipangkas menjadi 12 entri (batas total); distribusi merata menghasilkan 3 entri per fitur.
- Entri berumur lebih dari 30 hari dan entri yang tidak diakses lebih dari 14 hari dihapus.
- Tiga entri berukuran 30 MB dipangkas menjadi dua entri (60 MB) agar tetap di bawah batas 80 MB.
- Tombol **Simpan salinan sekarang** menambah tepat satu entri baru; timer autosave yang tertunda dibatalkan agar tidak membuat entri duplikat.
- Setiap entri memakai ID unik dan dapat dipulihkan atau dihapus satu per satu.

## Catatan implementasi

- Render Edit PDF memakai `devicePixelRatio` (dibatasi agar canvas maksimal 4096 px) dan skala fit terhadap lebar wadah.
- Lapisan teks dibangun dari `page.getTextContent()` dan hanya menerima pointer event saat mode **Pilih teks** aktif.
- `touch-action` halaman diubah menjadi `pan-x pan-y` untuk alat non-gambar dan `none` untuk pensil/bentuk agar kontrol lebih nyaman.
- Judul Pembuat PDF disimpan di backup dan ditulis ke metadata PDF melalui `doc.setTitle()`.
- Tombol riwayat backup di layar ≤640 px tampil sebagai ikon `↺` dengan `aria-label` dan `title` tetap terbaca.
- Cache aset dan query string versi dinaikkan ke `v51`.

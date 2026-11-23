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

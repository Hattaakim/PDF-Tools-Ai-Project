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
- Pratinjau kertas memakai proporsi dan pembungkusan baris yang sama dengan PDF, dengan kontrol zoom serta tombol Fit untuk layar kecil.
- Jumlah kolom yang berlaku khusus pada teks yang dipilih/diblok, bukan seluruh dokumen.
- Inden kiri, inden baris pertama, spasi baris, dan spasi paragraf.
- Perataan teks rata kiri, tengah, kanan, dan rata kiri-kanan (justify).

Semua proses dokumen berjalan lokal di perangkat; tidak ada file yang diunggah ke server.

## Database File (SQLite)

**Database File** membuka file `.db`, `.sqlite`, atau `.sqlite3` dan menampilkannya sebagai spreadsheet yang bisa disunting langsung di browser:

- Pilih atau seret file SQLite untuk melihat daftar tabel, kolom, dan baris.
- Ubah nilai sel, tambah baris, dan hapus baris; perubahan ditandai "Belum disimpan" sampai diekspor.
- Simpan kembali hasil edit sebagai file `.db` yang valid, atau ekspor satu tabel/seluruh database ke PDF.
- Wizard empat langkah membantu pengguna awam membuat database baru: nama file, struktur tabel dan kolom (Teks, Angka, Angka desimal, Tanggal, Tanggal & waktu, Ya/Tidak), data awal, lalu unduh.
- Tabel dengan kunci utama tetap bisa disunting, termasuk tabel `WITHOUT ROWID`.

Mesin SQLite memakai [sql.js](https://sql.js.org/) yang disimpan lokal di `vendor/`. Lisensinya ada di `vendor/SQLJS-LICENSE.txt`. File database tidak pernah dikirim ke server dan hanya disimpan di tab sampai pengguna mengunduhnya.

## Perbaikan progress bar

Progress bar pada alat PDF tidak lagi terlihat penuh (100%) saat file diganti atau saat proses baru dimulai:

- Indikator "sedang menyiapkan" tidak lagi bergantung pada animasi transform. Jika animasi dinonaktifkan (misalnya karena pengaturan *reduced motion*), indikator tampil sebagai pita 35%, bukan bar penuh.
- Setiap proses kini punya penanda sesi. Mengganti/menambah file, menutup dialog, atau membuka alat lain otomatis membatalkan proses lama sehingga hasil dan progresnya tidak lagi menimpa file yang baru dipilih.
- Saat progress bar disembunyikan, lebar isi dan nilai `aria-valuenow` direset ke nol, jadi proses berikutnya selalu mulai dari keadaan bersih.
- Tombol aksi kembali aktif setelah file diganti, sehingga file baru bisa langsung diproses tanpa menunggu proses lama selesai.

## Antarmuka liquid glass yang ringan

Tampilan Paperly diperbarui menjadi lebih modern dan minimalis tanpa meninggalkan nuansa kaca:

- Sidebar dan topbar kini berupa panel kaca mengambang dengan sudut membulat, sehingga ruang kerja terasa lebih lega di layar besar.
- Kartu alat, panduan, dan hero memakai gradien lembut serta sorotan kursor (liquid glass) yang halus. Sorotan hanya aktif pada perangkat dengan pointer presisi.
- Tata letak menyesuaikan diri dari layar 320 px hingga desktop lebar: grid alat otomatis menjadi 1, 2, 3, atau 4 kolom, dan topbar berubah menjadi kapsul ringkas di ponsel.
- Judul halaman aktif ditampilkan di topbar, sedangkan navigasi utama tetap berada di sidebar.

Agar tetap ringan di perangkat kecil, efek mahal dibatasi:

- `backdrop-filter` hanya dipakai pada sidebar, topbar, modal, dan lapisan overlay. Kartu alat tidak memakai blur per kartu.
- Animasi memakai `transform`/`opacity` agar diproses compositor. Animasi hero dan ambient berhenti saat tab tidak terlihat atau hero keluar dari layar.
- Profil `lite` otomatis aktif saat perangkat memiliki RAM/CPU rendah atau mode hemat data, dan mematikan blur serta animasi non-esensial.
- Preferensi `prefers-reduced-motion` dan `prefers-reduced-transparency` dihormati, termasuk indikator progres yang tetap terbaca tanpa animasi.

## Konsistensi tema terang dan gelap

Warna kaca kini memakai satu set token untuk kedua tema, sehingga tidak ada lagi permukaan yang saling bertabrakan:

- Mode terang memakai latar krem hangat dengan kaca susu yang lebih tenang. Intensitas putih dikurangi, tepi panel dipertegas, dan teks sekunder dibuat lebih gelap agar layar tidak terasa menyilaukan.
- Mode gelap memakai palet espresso hangat yang seragam untuk sidebar, topbar, kartu, modal, dan editor. Ikon alat, avatar, serta penanda kecil tidak lagi berupa kotak krem terang.
- Ilustrasi hero, kartu panduan, banner privasi, dan halaman Tentang mengikuti tema yang sama; gradien emas tetap dipakai sebagai aksen, bukan sebagai latar yang membanjiri layar.
- Warna `theme-color` dan scrollbar browser ikut berubah saat tema diganti, termasuk scrollbar akar halaman.
- Kontras teks sekunder pada modal, tabel rentang halaman, dan catatan pratinjau dinaikkan agar tetap terbaca di latar gelap.

## Penyimpanan offline dan pemulihan otomatis

Pekerjaan di grup **Tulis & Sunting** kini memiliki salinan lokal yang dibuat otomatis di browser:

- **Edit PDF, Pembuat PDF, PDF Sheet, dan Database SQLite** menyimpan salinan dokumen beserta suntingannya ke IndexedDB setiap kali ada perubahan. File PDF asli dan data SQLite ikut disimpan, sehingga pekerjaan tidak hilang saat tab atau browser ditutup.
- Saat situs dibuka kembali, aplikasi menampilkan dialog **Lanjutkan pekerjaan Anda?** dengan ringkasan backup terbaru. Pilih **Muat backup** untuk melanjutkan atau **Mulai dari awal** untuk menghapus salinan lokal tersebut.
- Aset antarmuka (HTML, CSS, JavaScript, pustaka vendor, dan WASM) disimpan dalam cache service worker. Halaman tetap dapat dibuka dan dipakai tanpa koneksi setelah kunjungan pertama.
- Manajemen cache berjalan di latar belakang: entri cache yang lebih tua dari 30 hari atau melebihi batas jumlah dihapus, cache versi lama dibersihkan saat service worker diperbarui, dan backup IndexedDB yang sudah tidak diakses lebih dari 14 hari ikut dibuang.
- Status **PDF siap disimpan** kini berada di dalam dialog **Simpan sebagai**, bukan lagi mengambang di bilah judul editor.

## Ruang kerja Edit PDF mandiri dan anotasi

**Edit PDF** sekarang dibuka sebagai halaman kerja penuh yang terpisah dari dialog alat:

- Halaman mandiri memakai seluruh area layar dengan bilah atas berisi tombol **Kembali**, **Ganti PDF**, **Simpan PDF**, penanda **Belum disimpan**, dan **Riwayat backup**.
- File PDF dapat dipilih lewat tombol **Pilih file PDF**, **Ganti PDF**, atau dengan menyeret dan melepaskan file ke area utama.
- Tata letak menyesuaikan layar ponsel, tablet, dan desktop. Pratinjau halaman tetap bisa digulirkan tanpa mengubah lebar jendela.
- Peringatan **Suntingan Anda belum disimpan** muncul saat menutup halaman, berpindah alat, atau memuat ulang tab selama masih ada anotasi.

Anotasi yang tersedia langsung di atas pratinjau halaman:

- **Teks** — klik untuk menambah teks yang bisa diketik dan dipindah.
- **Sorot**, **Garis bawah**, **Coret**, dan **Kotak** — seret untuk menandai area; warna bisa dipilih dari toolbar.
- **Catatan** — klik untuk menaruh catatan berisi teks bebas.
- **Gambar** — sisipkan PNG/JPG, lalu seret atau ubah ukurannya.
- **Pensil** — gambar coretan bebas.

Semua anotasi ikut ditulis ke PDF saat **Simpan PDF** ditekan. Teks asli halaman tidak dirasterisasi, sehingga hasil tetap bisa dicari dan dipilih.

## Beberapa backup dan riwayat per fitur

Penyimpanan lokal tidak lagi dibatasi satu salinan per fitur:

- Tombol **Riwayat backup** muncul otomatis pada **Edit PDF, Pembuat PDF, PDF Sheet, dan Database SQLite** begitu ada backup untuk fitur tersebut.
- Dialog riwayat menampilkan setiap salinan beserta waktu, ukuran, dan jenisnya (otomatis atau manual). Salinan dapat **dipulihkan** atau **dihapus** satu per satu.
- Tombol **Simpan salinan sekarang** membuat salinan manual tambahan tanpa menunggu penulisan otomatis.
- Autosave memakai ID unik per salinan, menggabungkan penulisan dalam jendela 2 menit, dan membatasi penyimpanan menjadi 5 salinan per fitur / 12 salinan total / 80 MB / 30 hari.

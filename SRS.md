**Preniche**

**1.1 Tujuan (Purpose)**

Dokumen ini mendefinisikan persyaratan fungsional dan non-fungsional untuk pembuatan aplikasi web Campus Thrift & Marketplace. Aplikasi ini bertujuan menyediakan platform transaksi (Jual-Beli atau sewa barang bekas) yang aman, terverifikasi, dan berbasis lokasi untuk komunitas mahasiswa.

**1.2 Ruang Lingkup (Scope)**  
Platform berbasis web ini akan mencakup:

* Autentikasi pengguna berbasis email institusi perguruan tinggi (.ac.id).  
* Manajemen listing produk (Buku/Diktat, Peralatan Kost, Alat Praktikum).  
* Mesin pencari hyper-local berdasarkan radius kampus/kost.  
* Fitur obrolan langsung (in-app chat) dan penjadwalan titik temu COD (Meeting Scheduler).  
* Sistem moderasi, reputasi pengguna, dan Admin Dashboard.  
* Sistem pembayaran terintegrasi (E-Wallet/Payment Gateway) dan kurir logistik pihak ketiga dinonaktifkan pada Tahap 1 (MVP) untuk mengutamakan transaksi langsung (COD).

**1.3 Definisi dan Singkatan**

* MVP: Minimum Viable Product  
* COD: Cash on Delivery (Bayar di Tempat)  
* OTP: One-Time Password  
* User: Mahasiswa terdaftar dan terverifikasi di platform.

**2.1 Perspektif Produk**  
Aplikasi web ini berdiri sendiri (standalone web application) dengan pendekatan Mobile-First Responsive Design.

\[ Mahasiswa / User \] \<---\> \[ Web App (Next.js / React) \] \<---\> \[ REST API / GraphQL \]   
									    |   
							           	\+-----------+-----------+  
								| 		        |   
							    \[ PostgreSQL \] \[ Cloud Storage \] 

**2.2 Kategori Pengguna (User Roles)**

* Mahasiswa (User/Buyer/Seller): Mahasiswa aktif yang dapat mengunggah barang, mencari barang, berkirim pesan, dan memberikan ulasan.  
* Administrator (Admin System): Pengelola platform yang menangani laporan penipuan, verifikasi domain kampus baru, serta pemblokiran pengguna bermasalah.

**2.3 Lingkungan Operasional (Operating Environment)**

* Klien: Browser modern pada desktop dan smartphone (Chrome, Safari, Edge, Firefox).  
* Server: Vercel

**3.1 Modul Autentikasi & Verifikasi Akun**

| Kode Req | Nama Fitur | Deskripsi Kebutuhan |
| :---- | :---- | :---- |
| **FR-AUTH-01** | Registrasi Email Kampus | Sistem harus memvalidasi bahwa email pendaftar memiliki domain .ac.id (atau domain universitas terdaftar). |
| **FR-AUTH-02** | Verifikasi OTP/Magic Link | Sistem wajib mengirimkan tautan verifikasi atau kode OTP ke email kampus pengguna sebelum akun diaktifkan. |
| **FR-AUTH-03** | Manajemen Profil | Pengguna dapat mengatur profil mencakup: nama lengkap, nama kampus, fakultas, angkatan, foto profil, dan lokasi area kost/kampus. |

**3.2 Modul Manajemen Listing Barang & Jasa**

| Kode Req | Nama Fitur | Deskripsi Kebutuhan |
| :---- | :---- | :---- |
| **FR-LIST-01** | Pembuatan Listing Baru | Penjual dapat mengunggah foto (maks. 5 foto), judul, deskripsi, harga, kondisi barang (Baru / Bekas-Sangat Baik / Bekas-Layak), dan lokasi COD. |
| **FR-LIST-02** | Opsi Jenis Transaksi | Penjual dapat memilih kategori transaksi: **Dijual**, **Disewakan** (per hari/bulan) atau **Gratis**. |
| **FR-LIST-03** | Atribut Spesifik Kampus | Khusus kategori buku/diktat, pengguna wajib mengisi Nama Mata Kuliah dan Kode Dosen/Mata Kuliah untuk memudahkan pencarian.  |
| **FR-LIST-04** | Status Listing | Penjual dapat memperbarui status barang menjadi: *Tersedia*, *Reserved (Janji COD)*, atau *Terjual/Selesai*. |

**3.3 Modul Pencarian & Filter (Hyper-Local Discovery)**

| Kode Req | Nama Fitur | Deskripsi Kebutuhan |
| :---- | :---- | :---- |
| **FR-SEARCH-01** | Filter Berbasis Kampus | Pengguna dapat memfilter barang yang hanya dijual oleh mahasiswa dari kampus yang sama atau kampus tetangga terdekat. |
| **FR-SEARCH-02** | Filter Kategori & Harga | Menyediakan pencarian teks bebas, kategori barang, rentang harga (termasuk filter khusus barang "Gratis"). |
| **FR-SEARCH-03** | Urutan (Sorting) | Menampilkan hasil pencarian berdasarkan: *Paling Baru*, *Jarak Terdekat*, dan *Harga Terendah/Tertinggi*. |

**3.4 Modul Komunikasi & Penjadwalan COD**

| Kode Req | Nama Fitur | Deskripsi Kebutuhan |
| :---- | :---- | :---- |
| **FR-CHAT-01** | Pesan Instan (*In-App Chat*) | Pembeli dan penjual dapat saling berkirim pesan tanpa perlu membagikan nomor WhatsApp/telepon pribadi di awal. |
| **FR-CHAT-02** | Usulan Titik Temu (COD) | Sistem menyediakan preset lokasi aman di area kampus (misal: Perpustakaan Pusat, Kantin Fakultas, Gerbang Utama) yang dapat disepakati kedua pihak via chat. |
| **FR-CHAT-03** | Pengunci Kesepakatan | Penjual dapat mengklik "Buat Janji COD" kepada pembeli tertentu yang mengunci status barang menjadi *Reserved*. |

**3.5 Modul Reputasi, Keamanan, & Moderasi**

| Kode Req | Nama Fitur | Deskripsi Kebutuhan |
| :---- | :---- | :---- |
| **FR-MOD-01** | Rating & Ulasan Sejawat | Setelah transaksi selesai, kedua pihak wajib memberikan rating (1-5 bintang) dan ulasan singkat. |
| **FR-MOD-02** | Laporkan Listing/User | Fitur pelaporan untuk barang terlarang, indikasi penipuan, atau akun palsu. |
| **FR-ADMIN-01** | Panel Moderasi Admin | Admin dapat meninjau laporan pengguna, menangguhkan (*suspend*) akun, dan menghapus listing bermasalah. |

**4.1 Keamanan (Security)**

* NFR-SEC-01: Semua lalu lintas data wajib menggunakan protokol terenkripsi HTTPS (TLS 1.3).  
    
* NFR-SEC-02: Kata sandi pengguna wajib disimpan menggunakan algoritma hashing aman (misal: bcrypt atau argon2).  
    
* NFR-SEC-03: Sistem harus mengisolasi alamat email kampus agar tidak dapat disalin oleh bot web scraper luar.

**4.2 Performa (Performance)**

* NFR-PERF-01: Page Load Time pada koneksi 4G standar tidak boleh melebihi 2.5 detik untuk halaman Katalog Utama.  
    
* NFR-PERF-02: Optimasi gambar otomatis (kompresi ke format WebP/AVIF dan responsive sizing) sebelum disimpan di cloud storage.

**4.3 Kemudahan Penggunaan (Usability)**

* NFR-USA-01: Desain responsif sempurna (mobile-first) dengan porsi penggunaan pada layar seluler minimal 80%.  
    
* NFR-USA-02: Alur pembuatan listing barang baru harus dapat diselesaikan dalam kurang dari 3 menit (maksimal 4 langkah simpel).

**5.1 Rekomendasi Arsitektur Teknologi (Tech Stack)**

| Komponen | Teknologi Rekomendasi | Alasan Pemilihan |
| :---- | :---- | :---- |
| **Frontend Framework** | **Next.js (React)** / Tailwind CSS | Cepat, SEO-friendly, render responsif di perangkat seluler. |
| **Backend & Database** | **Node.js** \+ **PostgreSQL** (Prisma ORM) / Supabase | Relational DB sangat baik untuk pemetaan relasi user, produk, dan lokasi. Supabase mempercepat pembuatan auth & real-time chat. |
| **Storage (Media)** | Cloudflare R2 / AWS S3 | Penyimpanan foto produk berbiaya rendah dengan integrasi CDN cepat. |
| **Hosting & Deployment** | Vercel / Render | Gratis/murah untuk fase awal, penggelaran otomatis langsung dari repositori Git. |

29 septe
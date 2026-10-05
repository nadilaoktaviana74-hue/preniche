# Preniche — Campus Thrift & Marketplace Mahasiswa

Aplikasi web **Campus Thrift & Marketplace** yang dirancang khusus untuk komunitas mahasiswa perguruan tinggi di Indonesia. Menyediakan platform transaksi aman (Jual-Beli, Sewa, atau Hibah Gratis barang bekas) berbasis verifikasi email institusi (.ac.id) dan sistem titik temu COD aman (*Meeting Scheduler*) di area fasilitas kampus.

Dibangun berdasarkan dokumen **SRS.md (Software Requirements Specification)**.

---

## 🛠️ Tech Stack & Arsitektur

* **Framework:** Next.js 14 (App Router)
* **Bahasa:** TypeScript
* **Styling & Desain:** Tailwind CSS (Mobile-First Responsive Design, NFR-USA-01)
* **Icon:** Lucide React
* **Database & ORM:** PostgreSQL + Prisma ORM
* **State & Data Mock:** Dataset realistis mahasiswa ITB, UI, UGM, Undip, ITS, dan preset titik temu aman kampus ber-CCTV.

---

## 📁 Struktur Folder & File Boilerplate

```text
Preniche/
├── .env.example                 # Contoh konfigurasi environment
├── .env                         # Konfigurasi lokal (DATABASE_URL, NEXTAUTH_SECRET)
├── package.json                 # Dependencies & skrip npm
├── tsconfig.json                # Konfigurasi TypeScript
├── tailwind.config.ts           # Desain token & tema warna kampus (brand & campus accents)
├── postcss.config.js            # PostCSS plugin
├── next.config.mjs              # Konfigurasi Next.js & remote image domain
├── prisma/
│   ├── schema.prisma            # Skema Database Prisma (User, Product, Category, CODAppointment, dll)
│   └── seed.ts                  # Skrip seed data awal untuk database
├── src/
│   ├── app/
│   │   ├── globals.css          # CSS global, Tailwind directives & custom scrollbars
│   │   ├── layout.tsx           # Root Layout (Navbar, Footer, MobileNav, SEO Metadata)
│   │   ├── page.tsx             # [UI Utama] Landing Page (Hero, Kategori, Hibah Maba, Nilai Keamanan)
│   │   ├── catalog/
│   │   │   └── page.tsx         # [UI Utama] Katalog Barang & Filter Hyper-Local Kampus
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # [UI Utama] Halaman Detail Produk & Janji Temu COD
│   │   └── sell/
│   │       └── page.tsx         # [UI Utama] Formulir Upload Barang Preloved (< 3 Menit)
│   ├── components/
│   │   ├── Navbar.tsx           # Navigasi desktop, search bar, & quick campus selector
│   │   ├── MobileNav.tsx        # Navigasi bawah mobile-first untuk pengalaman HP optimal
│   │   ├── ProductCard.tsx      # Komponen kartu produk preloved ber-badge & verifikasi
│   │   ├── CampusBadge.tsx      # Badge warna identitas universitas (ITB, UI, UGM, dll)
│   │   ├── CategoryIcon.tsx     # Mapping ikon kategori Lucide
│   │   ├── SafeCODModal.tsx     # Modal penjadwalan titik temu COD aman kampus
│   │   └── Footer.tsx           # Footer informasi kampus, keamanan COD, & hak cipta
│   ├── data/
│   │   └── mockData.ts          # Mock data mahasiswa, produk, kategori, & preset safe COD points
│   ├── lib/
│   │   └── utils.ts             # Helper format Rupiah, badge kondisi, styling kampus
│   └── types/
│       └── index.ts             # Definisi TypeScript model & skema
└── SRS.md                       # Spesifikasi Kebutuhan Perangkat Lunak
```

---

## 🗄️ Skema Database (Prisma ORM)

Skema database lengkap terdapat pada file [`prisma/schema.prisma`](prisma/schema.prisma), mencakup entitas utama:

1. **`User`**: Data mahasiswa terdaftar dengan validasi email `.ac.id`, fakultas, program studi, angkatan, area kost, reputasi/rating bintang sejawat, dan status akun.
2. **`Product`**: Listing barang preloved dengan foto (maks 5), harga (0 untuk gratis), skema transaksi (`FOR_SALE`, `FOR_RENT`, `FREE`), kondisi barang, serta atribut khusus diktat kampus (`courseName`, `courseCode`, `lecturerName`).
3. **`Category`**: Pengelompokan barang (Buku & Diktat, Peralatan Kost, Alat Praktikum & Lab, Gadget Belajar, Fashion Thrift, Sepeda Kampus).
4. **`SafeMeetingPoint`**: Preset titik temu aman kampus yang ramai dan diawasi satpam/CCTV (contoh: Perpustakaan Pusat, Kantin Salman, Student Center).
5. **`CODAppointment`**: Modul penjadwal titik temu (Meeting Scheduler) yang mengunci status barang menjadi *Reserved*.
6. **`Transaction` & `Review`**: Riwayat transaksi selesai dan sistem ulasan 1-5 bintang antar mahasiswa.
7. **`Report`**: Sistem pelaporan penipuan atau barang terlarang untuk moderator.
8. **`Conversation` & `ChatMessage`**: Modul pesan instan (*in-app chat*) tanpa membagikan nomor telepon pribadi di awal.

---

## 🚀 Panduan Menjalankan di Komputer Lokal

Ikuti langkah-langkah ringkas berikut di terminal:

### 1. Instal Dependencies
Pastikan Node.js (v18+) telah terpasang, lalu jalankan:
```bash
npm install
```

### 2. Generate Prisma Client (Opsional jika ingin menggunakan DB)
Untuk menghasilkan types Prisma Client lokal:
```bash
npx prisma generate
```

*(Opsional: Jika Anda menyambungkan PostgreSQL di file `.env`, jalankan `npx prisma db push` dan `npx ts-node prisma/seed.ts`)*

### 3. Jalankan Development Server
Mulai server pengembang lokal:
```bash
npm run dev
```

Buka browser dan akses aplikasi di:
```text
http://localhost:3000
```

---

## 📱 Fitur Utama Sesuai SRS

| Modul | Halaman/Komponen | Kode SRS | Fitur & Implementasi |
| :--- | :--- | :--- | :--- |
| **Katalog & Filter** | `/catalog` | `FR-SEARCH-01`, `02`, `03` | Filter berbasis kampus, filter kategori, rentang harga, filter khusus barang "Gratis (Hibah)", dan pengurutan (Terbaru, Termurah, Termahal). |
| **Upload Barang** | `/sell` | `FR-LIST-01`, `02`, `03`, `NFR-USA-02` | Form 4 langkah selesai &lt; 3 menit. Mendukung opsi Dijual, Sewa (harian/bulanan), dan Gratis. Dilengkapi isian khusus Mata Kuliah & Kode Dosen untuk buku diktat. |
| **Detail Produk & COD** | `/products/[id]` | `FR-CHAT-01`, `02`, `03`, `FR-AUTH-03` | Galeri foto, lencana verifikasi mahasiswa .ac.id, modal usulan titik temu aman kampus, dan pengunci status ke *Reserved*. |
| **Landing Page** | `/` | `Mobile-First` | Hero interaktif, sorotan hibah maba, edukasi COD aman tanpa transfer uang muka (DP). |

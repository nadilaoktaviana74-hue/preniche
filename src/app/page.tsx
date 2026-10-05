import React from "react";
import Link from "next/link";
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  CAMPUS_OPTIONS,
} from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MapPin,
  GraduationCap,
  Users,
  Repeat,
  CheckCircle2,
  BookOpen,
  PlusCircle,
} from "lucide-react";

export default function HomePage() {
  const freeProducts = MOCK_PRODUCTS.filter((p) => p.transactionType === "FREE");
  const textbookProducts = MOCK_PRODUCTS.filter((p) => p.categoryId === "cat_buku");
  const kostProducts = MOCK_PRODUCTS.filter(
    (p) => p.categoryId === "cat_kost" || p.categoryId === "cat_gadget"
  );

  return (
    <div className="space-y-14 md:space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-12 bg-gradient-to-b from-brand-50/60 via-white to-white">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Campus verification pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs sm:text-sm font-semibold shadow-sm animate-pulse">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Campus Preloved Hub • Khusus Email .ac.id</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Thrift & Marketplace Mahasiswa{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-500">
                Aman Sekampus
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Jual-beli buku diktat, perlengkapan kost, dan alat praktikum preloved ke sesama mahasiswa. 
              Tanpa ongkir mahal, bayar di tempat (COD) di titik aman kampus.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Jelajahi Katalog Kampus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sell"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold text-sm shadow-sm transition-all hover:border-slate-300 flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-brand-600" />
                <span>Unggah Barang Bekasmu</span>
              </Link>
            </div>

            {/* Stat Counters */}
            <div className="pt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto border-t border-slate-200/60">
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">100%</p>
                <p className="text-xs text-slate-500">Mahasiswa .ac.id</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-600">Rp 0</p>
                <p className="text-xs text-slate-500">Biaya Admin Platform</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">50+</p>
                <p className="text-xs text-slate-500">Preset COD Kampus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAMPUS PILL SELECTOR (Hyper-local discovery) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <GraduationCap className="w-4 h-4 text-brand-600" />
              <span>Pilih Kampus untuk Pencarian Hyper-Local</span>
            </div>
            <Link
              href="/catalog"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              Lihat semua kampus <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {CAMPUS_OPTIONS.map((campus) => (
              <Link
                key={campus}
                href={
                  campus === "Semua Kampus"
                    ? "/catalog"
                    : `/catalog?campus=${encodeURIComponent(campus)}`
                }
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-xs font-medium text-slate-700 hover:text-brand-700 shadow-sm transition-all"
              >
                {campus}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold tracking-wider text-brand-600 uppercase">
              Kebutuhan Mahasiswa
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Jelajahi Berdasarkan Kategori
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.id}`}
              className="group p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-brand-500/50 shadow-sm hover:shadow-card transition-all flex flex-col items-center text-center space-y-2 hover:-translate-y-1 duration-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors flex items-center justify-center">
                <CategoryIcon iconName={cat.icon} className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {cat.count} barang
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FREE / HIBAH MABA SPOTLIGHT (FR-LIST-02) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-teal-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Program Solidaritas Kampus</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Barang Gratis (Hibah) untuk Maba & Teman Sejawat
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mt-1">
                Koleksi barang layak pakai yang dihibahkan cuma-cuma oleh senior/alumni yang sudah lulus atau pindah kost.
              </p>
            </div>

            <Link
              href="/catalog?type=FREE"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors self-start md:self-auto shrink-0"
            >
              Lihat Semua Barang Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {freeProducts.slice(0, 3).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEXTBOOKS & DIKTATS SPOTLIGHT (FR-LIST-03: Atribut Spesifik Kampus) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-brand-600 uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Diktat & Modul Kuliah</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Buku Referensi & Catatan Dosen
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cari buku berdasarkan kode mata kuliah dan dosen pengampu kampusmu
            </p>
          </div>

          <Link
            href="/catalog?category=cat_buku"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 self-start sm:self-auto"
          >
            Lihat semua buku <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {textbookProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. KOST & GADGET PICKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold tracking-wider text-brand-600 uppercase">
              Kost & Keperluan Belajar
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Elektronik & Perabot Kost Mahasiswa
            </h2>
          </div>

          <Link
            href="/catalog?category=cat_kost"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 self-start sm:self-auto"
          >
            Lihat semua perlengkapan <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kostProducts.slice(0, 4).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. WHY PRENICHE IS SAFER (Value Propositions based on SRS) */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Keamanan Transaksi Terjamin
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Mengapa Preniche Jauh Lebih Aman?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Kami merancang sistem khusus yang meniadakan modus penipuan online marketplace umum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Verifikasi Email Kampus .ac.id
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setiap anggota wajib mendaftar menggunakan email resmi universitas dengan OTP/Magic Link, memastikan seluruh penjual dan pembeli adalah mahasiswa nyata.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Preset Titik Temu COD Aman
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Janji temu COD diarahkan ke titik fasilitas umum kampus yang ramai dan diawasi CCTV (seperti Perpustakaan Pusat, Kantin Fakultas, dan Gerbang Utama).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Tanpa DP & Kunci Janji COD
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hindari risiko transfer uang ke rekening fiktif. Barang dapat dikunci statusnya menjadi <em>Reserved</em> dan dibayar langsung setelah cek fisik barang.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION - List in under 3 mins (NFR-USA-02) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-700 to-brand-900 rounded-3xl p-8 sm:p-12 text-center text-white relative shadow-2xl overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black">
              Punya Barang Tak Terpakai di Kost?
            </h2>
            <p className="text-xs sm:text-sm text-brand-100 leading-relaxed">
              Jadikan uang saku tambahan atau hibahkan untuk membantu adik tingkatmu. Upload hanya butuh waktu kurang dari 3 menit!
            </p>
            <div className="pt-2">
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-brand-800 font-bold text-sm hover:bg-brand-50 shadow-lg transition-transform hover:scale-105"
              >
                <PlusCircle className="w-4 h-4 text-brand-600" />
                Mulai Pasang Iklan Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

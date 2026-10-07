import React from "react";
import Link from "next/link";
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  UNTAG_AREAS,
  UNTAG_CAMPUS_NAME,
} from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MapPin,
  GraduationCap,
  Building,
  CheckCircle2,
  BookOpen,
  PlusCircle,
  Home,
} from "lucide-react";

export default function HomePage() {
  const freeProducts = MOCK_PRODUCTS.filter((p) => p.transactionType === "FREE");
  const praktikumProducts = MOCK_PRODUCTS.filter((p) => p.categoryId === "cat_praktikum");
  const kostProducts = MOCK_PRODUCTS.filter(
    (p) => p.categoryId === "cat_kost" || p.categoryId === "cat_gadget"
  );

  return (
    <div className="space-y-14 md:space-y-20 pb-16">
      {/* 1. HERO SECTION (Untag Surabaya Focused) */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-12 bg-gradient-to-b from-red-50/50 via-white to-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Untag verification pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/90 border border-red-200 text-red-900 text-xs sm:text-sm font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>Khusus Mahasiswa Untag Surabaya • Semolowaru 45</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Marketplace & Preloved{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
                Untag Surabaya
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Jual-beli kasur kos, jas lab praktikum, modul kuliah, dan gadget bekas sesama mahasiswa Universitas 17 Agustus 1945 Surabaya. COD aman di Graha Wiyata & Plaza Untag tanpa ongkir!
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Jelajahi Katalog Untag</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sell"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-bold text-sm shadow-sm transition-all hover:border-slate-300 flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-red-600" />
                <span>Jual Perlengkapan Kos/Kuliah</span>
              </Link>
            </div>

            {/* Stat Counters */}
            <div className="pt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto border-t border-slate-200/60">
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">Untag Sby</p>
                <p className="text-xs text-slate-500">Single-Campus Eksklusif</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-red-600">Rp 0</p>
                <p className="text-xs text-slate-500">Bebas Biaya Admin</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">Graha Wiyata</p>
                <p className="text-xs text-slate-500">Titik COD Aman Kampus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AREA SEKITAR UNTAG DISCOVERY (Replaces multi-campus selector) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Eksplorasi Berdasarkan Area Sekitar Kampus Untag</span>
            </div>
            <Link
              href="/catalog"
              className="text-xs font-semibold text-red-700 hover:text-red-800 flex items-center gap-1"
            >
              Lihat semua area <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {UNTAG_AREAS.map((area) => (
              <Link
                key={area}
                href={
                  area === "Semua Area Sekitar Untag"
                    ? "/catalog"
                    : `/catalog?area=${encodeURIComponent(area)}`
                }
                className="px-4 py-2 rounded-xl bg-white hover:bg-red-50 border border-slate-200 hover:border-red-300 text-xs font-medium text-slate-700 hover:text-red-800 shadow-2xs transition-all"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 5 KATEGORI SPESIFIK MAHASISWA UNTAG SURABAYA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold tracking-wider text-red-600 uppercase">
              Kebutuhan Mahasiswa Untag
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              5 Kategori Kebutuhan Kuliah & Kost
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1"
          >
            Semua kategori <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.id}`}
              className="group p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-red-400 shadow-sm hover:shadow-card transition-all flex flex-col items-center text-center space-y-2 hover:-translate-y-1 duration-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors flex items-center justify-center">
                <CategoryIcon iconName={cat.icon} className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-400 block mt-1 leading-snug line-clamp-2">
                  {cat.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. ALAT PRAKTIKUM & PERKULIAHAN UNTAG SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-red-600 uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>Lab & Rekayasa Teknik Untag</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Alat Praktikum & Gambar Teknik
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Jas lab, meja gambar A3, mistar T-Square, dan perlengkapan praktikum Fakultas Teknik Untag
            </p>
          </div>

          <Link
            href="/catalog?category=cat_praktikum"
            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 self-start sm:self-auto"
          >
            Lihat semua alat praktikum <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {praktikumProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. PERALATAN KOS & GADGET PICKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold tracking-wider text-red-600 uppercase">
              Anak Kost Semolowaru
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Peralatan Kos & Elektronik Praktis
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Kipas angin, kasur busa, rice cooker mini, dan setrika anak kost Untag
            </p>
          </div>

          <Link
            href="/catalog?category=cat_kost"
            className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 self-start sm:self-auto"
          >
            Lihat semua perlengkapan kos <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kostProducts.slice(0, 4).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. HIBAH MABA SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-red-900/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/40 text-red-200 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Solidaritas Mahasiswa Untag Surabaya</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Program Hibah Gratis untuk Maba Untag
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
                Barang layak pakai yang dihibahkan gratis (Rp 0) oleh senior Untag yang sudah lulus atau pindah kost.
              </p>
            </div>

            <Link
              href="/catalog?type=FREE"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors self-start md:self-auto shrink-0"
            >
              Lihat Barang Gratis
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

      {/* 7. TITIK COD AMAN KAMPUS UNTAG SURABAYA */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              COD Aman Tanpa Penipuan
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Kenapa Preniche Untag Lebih Terpercaya?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Sistem verifikasi mahasiswa Untag Surabaya dan titik temu resmi di lingkungan kampus Semolowaru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Verifikasi Email @student.untag-sby.ac.id
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penjual dengan badge &apos;Mahasiswa Untag Terverifikasi&apos; telah divalidasi menggunakan email resmi kampus Untag Surabaya.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Titik COD Resmi di Kampus Untag
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                COD dilakukan di lokasi fasilitas umum kampus Untag seperti Gedung Graha Wiyata, Perpustakaan R. Ing. Soekonjono, dan Plaza Untag.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Tanpa DP & Kunci Janji Temu
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bebas risiko transfer bodong. Cek fisik barang langsung saat COD di kampus sebelum melakukan pembayaran.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-8 sm:p-12 text-center text-white relative shadow-2xl overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black">
              Ada Barang Tak Terpakai di Kost Semolowaru?
            </h2>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
              Jadikan uang saku tambahan atau bantu sesama mahasiswa Untag Surabaya. Pasang iklan mudah hanya butuh waktu 2 menit!
            </p>
            <div className="pt-2">
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-red-700 font-bold text-sm hover:bg-red-50 shadow-lg transition-transform hover:scale-105"
              >
                <PlusCircle className="w-4 h-4 text-red-600" />
                Mulai Jual Barang Bekas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

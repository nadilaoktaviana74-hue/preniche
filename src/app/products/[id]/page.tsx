"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { MOCK_PRODUCTS, MOCK_SAFE_POINTS } from "@/data/mockData";
import {
  formatRupiah,
  getConditionLabel,
  getTransactionTypeBadge,
} from "@/lib/utils";
import { CampusBadge } from "@/components/CampusBadge";
import { VerifiedStudentBadge } from "@/components/VerifiedStudentBadge";
import { SafeCODModal } from "@/components/SafeCODModal";
import { ProductCard } from "@/components/ProductCard";
import {
  ShieldCheck,
  MapPin,
  Star,
  CheckCircle2,
  Calendar,
  BookMarked,
  MessageSquare,
  AlertTriangle,
  ArrowLeft,
  Share2,
  Heart,
  Eye,
  Lock,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCODModalOpen, setIsCODModalOpen] = useState(false);
  const [isReserved, setIsReserved] = useState(product?.status === "RESERVED");
  const [chatMessage, setChatMessage] = useState("");
  const [isChatSent, setIsChatSent] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Barang Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500">
          Iklan barang preloved ini mungkin sudah terjual atau telah dihapus oleh pemiliknya.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const condition = getConditionLabel(product.condition);
  const typeBadge = getTransactionTypeBadge(
    product.transactionType,
    product.rentalPeriod
  );

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.categoryId === product.categoryId || p.campusName === product.campusName)
  ).slice(0, 3);

  const handleQuickChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setIsChatSent(true);
      setTimeout(() => {
        setIsChatSent(false);
        setChatMessage("");
      }, 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Kampus</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Tautan iklan berhasil disalin ke clipboard!");
              }
            }}
            className="flex items-center gap-1 hover:text-slate-800"
            title="Bagikan Iklan"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Bagikan</span>
          </button>
          <button
            onClick={() => setIsReportOpen(true)}
            className="flex items-center gap-1 text-rose-500 hover:text-rose-700"
            title="Laporkan Penipuan / Barang Terlarang"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden sm:inline">Laporkan</span>
          </button>
        </div>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover"
            />
            {/* Status overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className={`text-xs px-3 py-1 rounded-full font-bold shadow-md ${typeBadge.color}`}>
                {typeBadge.label}
              </span>
              {isReserved && (
                <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-500 text-white shadow-md flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  Status: Reserved (Janji COD Terkunci)
                </span>
              )}
            </div>

            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>{product.viewCount} mahasiswa telah melihat</span>
            </div>
          </div>

          {/* Thumbnails list if multiple photos */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? "border-brand-600 ring-2 ring-brand-500/30 scale-105"
                      : "border-slate-200 hover:border-slate-300 opacity-70"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Safe COD Highlights Card */}
          <div className="p-5 bg-brand-50/70 border border-brand-200/80 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-brand-900 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span>Titik Temu COD Aman Rekomendasi Kampus</span>
            </div>
            <p className="text-xs text-brand-900/80 leading-relaxed">
              Penjual ini menyetujui transaksi COD tatap muka di area publik kampus:
            </p>
            <div className="bg-white p-3.5 rounded-2xl border border-brand-200 text-xs text-slate-800 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <span>{product.preferredMeetingPoint || "Perpustakaan Pusat Kampus"}</span>
              </div>
              <p className="text-slate-500 text-[11px] pl-6">
                Lokasi ramai dengan pengawasan satpam 24 jam & fasilitas CCTV. Sangat aman untuk cek kelayakan barang sebelum membayar.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Details & Action Box (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-card space-y-6">
            {/* Campus & Category Meta */}
            <div className="flex items-center justify-between gap-2">
              <CampusBadge campusName={product.campusName} />
              <span className="text-xs text-slate-500 font-medium">
                {product.categoryName}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Area Kost: <strong>{product.kostArea}</strong></span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {formatRupiah(product.price)}
                </span>
                {product.rentalPeriod && (
                  <span className="text-xs text-slate-500 font-medium ml-1">
                    /{product.rentalPeriod === "DAILY" ? "hari" : product.rentalPeriod === "MONTHLY" ? "bulan" : "semester"}
                  </span>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">
                    Baru: {formatRupiah(product.originalPrice)}
                  </span>
                  <span className="text-xs text-emerald-600 font-bold">
                    Hemat {formatRupiah(product.originalPrice - product.price)}
                  </span>
                </div>
              )}
            </div>

            {/* Academic Textbook Course Info (FR-LIST-03) */}
            {product.courseCode && (
              <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                  <BookMarked className="w-4 h-4 text-blue-600" />
                  <span>Spesifikasi Mata Kuliah Kampus</span>
                </div>
                <div className="text-blue-950 space-y-0.5">
                  <p><strong>Mata Kuliah:</strong> {product.courseName}</p>
                  <p><strong>Kode Matkul / Dosen:</strong> {product.courseCode}</p>
                  {product.lecturerName && (
                    <p><strong>Dosen Pengampu:</strong> {product.lecturerName}</p>
                  )}
                </div>
              </div>
            )}

            {/* Condition description */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Kondisi Fisik Barang
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${condition.color}`}>
                  {condition.label}
                </span>
                <span className="text-xs text-slate-600">{condition.desc}</span>
              </div>
            </div>

            {/* Full Description */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Deskripsi Penjual
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                disabled={isReserved}
                onClick={() => setIsCODModalOpen(true)}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  isReserved
                    ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                    : "bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/20 hover:scale-[1.01]"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {isReserved ? "Barang Sedang Reserved" : "Ajukan Janji Temu COD Kampus"}
                </span>
              </button>

              <p className="text-center text-[11px] text-slate-400">
                🔒 Tanpa transfer uang muka (DP). Bayar setelah bertemu & cek barang.
              </p>
            </div>

            {/* Verified Student Seller Profile Card (FR-AUTH-03) */}
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Profil Penjual Terverifikasi
              </span>
              <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={product.seller.avatarUrl}
                    alt={product.seller.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      {product.seller.name}
                    </h4>
                    {(product.seller.isVerifiedStudent ?? product.seller.isVerified) && (
                      <VerifiedStudentBadge size="sm" campusEmail={product.seller.campusEmail} />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {product.seller.faculty} {product.seller.batchYear ? `(${product.seller.batchYear})` : ""}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Kampus: <strong className="text-red-800">Untag Surabaya</strong>
                  </p>
                  
                  <div className="flex items-center gap-3 mt-2 text-xs font-medium text-slate-700">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{product.seller.rating.toFixed(1)}</span>
                    </div>
                    <span>•</span>
                    <span className="text-slate-500">
                      {product.seller.reviewCount} ulasan mahasiswa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick In-App Message (FR-CHAT-01: Pesan Instan) */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Kirim Pesan Cepat ke Penjual
              </span>
              {isChatSent ? (
                <div className="p-3 bg-brand-50 text-brand-800 rounded-xl text-xs font-medium text-center border border-brand-200 animate-in fade-in">
                  ✓ Pesan terkirim ke {product.seller.name}! Periksa tab Pesan.
                </div>
              ) : (
                <form onSubmit={handleQuickChat} className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Halo, apakah buku ini masih bisa nego tipis?"
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shrink-0 transition"
                  >
                    Kirim
                  </button>
                </form>
              )}
              <p className="text-[10px] text-slate-400">
                💬 Nomor WhatsApp/telepon pribadi disembunyikan sampai COD disepakati demi keamanan privasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase">
                Rekomendasi Lainnya
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Barang Serupa dari {product.campusName.split(" ")[0]}
              </h3>
            </div>
            <Link
              href="/catalog"
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              Lihat katalog lengkap →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Safe COD Appointment (FR-CHAT-02, FR-CHAT-03) */}
      <SafeCODModal
        product={product}
        isOpen={isCODModalOpen}
        onClose={() => setIsCODModalOpen(false)}
        onSuccess={() => {
          setIsReserved(true);
          setIsCODModalOpen(false);
        }}
      />

      {/* MODAL: Report Listing / User (FR-MOD-02) */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-slate-900 text-base">
                Laporkan Iklan / Pengguna
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Laporan akan diverifikasi langsung oleh Admin Moderator Preniche dalam waktu 1x24 jam.
            </p>
            <div className="space-y-2">
              {[
                "Indikasi Penipuan / Minta DP via Transfer",
                "Barang Terlarang / Melanggar Aturan Kampus",
                "Akun Palsu / Bukan Mahasiswa",
                "Informasi Barang Menyesatkan",
              ].map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer p-2 rounded-lg hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name="report"
                    value={r}
                    checked={reportReason === r}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="text-rose-600"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsReportOpen(false)}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert("Laporan berhasil dikirim ke moderator.");
                  setIsReportOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
              >
                Kirim Laporan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MOCK_CATEGORIES,
  MOCK_SAFE_POINTS,
  CAMPUS_OPTIONS,
} from "@/data/mockData";
import {
  UploadCloud,
  X,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Info,
  MapPin,
} from "lucide-react";
import { TransactionType, ItemCondition } from "@/types";

export default function SellPage() {
  const router = useRouter();

  // Step state (1 to 4)
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("cat_buku");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState<TransactionType>("FOR_SALE");
  const [rentalPeriod, setRentalPeriod] = useState<"DAILY" | "MONTHLY">("MONTHLY");
  const [price, setPrice] = useState<number | string>(50000);
  const [originalPrice, setOriginalPrice] = useState<number | string>(120000);
  const [condition, setCondition] = useState<ItemCondition>("LIKE_NEW");

  // Specific campus attributes for books (FR-LIST-03)
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [lecturerName, setLecturerName] = useState("");

  // Location attributes
  const [campusName, setCampusName] = useState(CAMPUS_OPTIONS[1]); // Default ITB
  const [kostArea, setKostArea] = useState("");
  const [preferredMeetingPoint, setPreferredMeetingPoint] = useState("");

  // Image uploads (up to 5 photos)
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddSampleImage = () => {
    if (images.length >= 5) {
      alert("Maksimal 5 foto per listing barang sesuai SRS FR-LIST-01.");
      return;
    }
    const sampleUrls = [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?auto=format&fit=crop&w=800&q=80",
    ];
    setImages([...images, sampleUrls[(images.length) % sampleUrls.length]]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/catalog");
      }, 2500);
    }, 1200);
  };

  const relevantSafePoints = MOCK_SAFE_POINTS.filter((p) =>
    campusName.toLowerCase().includes(p.campusName.split(" ")[0].toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Alur Cepat &lt; 3 Menit (NFR-USA-02)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Unggah Barang Preloved Mahasiswa
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Barang bekasmu bisa jadi penyelamat adik tingkat atau teman sekampus.
        </p>
      </div>

      {/* Wizard Step Progress (4 Steps) */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { num: 1, title: "Foto & Info" },
          { num: 2, title: "Tipe & Harga" },
          { num: 3, title: "Kondisi / Diktat" },
          { num: 4, title: "Titik COD Kampus" },
        ].map((s) => (
          <div
            key={s.num}
            onClick={() => setStep(s.num)}
            className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
              step === s.num
                ? "bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20"
                : step > s.num
                ? "bg-brand-50 text-brand-800 border-brand-200"
                : "bg-white text-slate-400 border-slate-200"
            }`}
          >
            <span className="text-xs font-bold block">Langkah {s.num}</span>
            <span className="text-[11px] truncate hidden sm:block font-medium">
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Barang Berhasil Dipublikasikan!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Listing barang kamu kini sudah tayang di katalog <strong>{campusName}</strong> dan dapat dilihat oleh ribuan mahasiswa.
            </p>
            <p className="text-xs text-brand-600 font-semibold">
              Mengalihkan kamu ke halaman katalog...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: FOTO & INFO DASAR */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                  Langkah 1: Foto & Informasi Dasar
                </h3>

                {/* Upload Foto (Maks. 5 Foto) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Foto Barang (Maksimal 5 Foto) *
                    </label>
                    <span className="text-xs text-slate-400">{images.length}/5 Foto</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group"
                      >
                        <img
                          src={img}
                          alt={`Upload ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-rose-600 text-white rounded-full transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-1 left-1 bg-brand-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Foto Utama
                          </span>
                        )}
                      </div>
                    ))}

                    {images.length < 5 && (
                      <button
                        type="button"
                        onClick={handleAddSampleImage}
                        className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50 hover:bg-brand-50/50 flex flex-col items-center justify-center p-3 text-slate-500 hover:text-brand-600 transition-colors"
                      >
                        <UploadCloud className="w-6 h-6 mb-1" />
                        <span className="text-[11px] font-semibold text-center">
                          + Tambah Foto
                        </span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Gunakan foto asli dengan pencahayaan jelas untuk mempercepat transaksi. Format didukung: JPG, PNG, WebP.
                  </p>
                </div>

                {/* Judul Barang */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Judul Barang Preloved *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Kalkulator Casio fx-991EX / Kulkas Mini Kost 50 Watt"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Kategori Barang *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {MOCK_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Deskripsi Lengkap *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan kondisi fisik, lama pemakaian, kelengkapan minus jika ada, dan alasan dijual..."
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (!title.trim()) {
                        alert("Silakan isi judul barang.");
                        return;
                      }
                      setStep(2);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-brand-700"
                  >
                    <span>Lanjut: Tipe & Harga</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: JENIS TRANSAKSI & HARGA (FR-LIST-02) */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                  Langkah 2: Opsi Jenis Transaksi & Harga
                </h3>

                {/* Opsi Jenis Transaksi */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Pilih Skema Transaksi (FR-LIST-02) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        transactionType === "FOR_SALE"
                          ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900 text-sm">Dijual</span>
                        <input
                          type="radio"
                          name="txType"
                          checked={transactionType === "FOR_SALE"}
                          onChange={() => setTransactionType("FOR_SALE")}
                          className="text-brand-600"
                        />
                      </div>
                      <p className="text-xs text-slate-500">
                        Jual putus barang preloved untuk sesama mahasiswa.
                      </p>
                    </label>

                    <label
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        transactionType === "FOR_RENT"
                          ? "border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900 text-sm">Disewakan</span>
                        <input
                          type="radio"
                          name="txType"
                          checked={transactionType === "FOR_RENT"}
                          onChange={() => setTransactionType("FOR_RENT")}
                          className="text-amber-500"
                        />
                      </div>
                      <p className="text-xs text-slate-500">
                        Cocok untuk sepeda kampus, jas praktikum, atau alat sementara.
                      </p>
                    </label>

                    <label
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        transactionType === "FREE"
                          ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-emerald-800 text-sm flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          Hibah Gratis
                        </span>
                        <input
                          type="radio"
                          name="txType"
                          checked={transactionType === "FREE"}
                          onChange={() => {
                            setTransactionType("FREE");
                            setPrice(0);
                          }}
                          className="text-emerald-600"
                        />
                      </div>
                      <p className="text-xs text-slate-500">
                        Rp 0 (Cuma-cuma) untuk maba atau teman yang membutuhkan.
                      </p>
                    </label>
                  </div>
                </div>

                {/* Rental period selector if FOR_RENT */}
                {transactionType === "FOR_RENT" && (
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
                    <label className="block text-xs font-bold text-amber-900">
                      Periode Satuan Sewa
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 text-xs text-amber-900 font-medium">
                        <input
                          type="radio"
                          name="rentalPeriod"
                          checked={rentalPeriod === "DAILY"}
                          onChange={() => setRentalPeriod("DAILY")}
                        />
                        <span>Per Hari</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-amber-900 font-medium">
                        <input
                          type="radio"
                          name="rentalPeriod"
                          checked={rentalPeriod === "MONTHLY"}
                          onChange={() => setRentalPeriod("MONTHLY")}
                        />
                        <span>Per Bulan</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Input Harga */}
                {transactionType !== "FREE" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Harga Penawaran (IDR) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          Rp
                        </span>
                        <input
                          type="number"
                          required
                          value={price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          placeholder="50000"
                          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Harga Beli Asli / Baru (Opsional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          Rp
                        </span>
                        <input
                          type="number"
                          value={originalPrice}
                          onChange={(e) => setOriginalPrice(Number(e.target.value))}
                          placeholder="120000"
                          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Untuk menghitung persentase hemat pembeli maba.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs">
                    💚 <strong>Kebaikanmu Sangat Berarti:</strong> Barang ini akan tampil dengan label &quot;Gratis / Hibah Mahasiswa&quot; (Rp 0). Pembeli tinggal membuat janji COD di kampus untuk mengambil barangmu.
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-4 h-4" /> Kembali
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-brand-700"
                  >
                    <span>Lanjut: Kondisi & Atribut</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: KONDISI & ATRIBUT SPESIFIK KAMPUS (FR-LIST-03) */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                  Langkah 3: Kondisi Barang & Atribut Akademik
                </h3>

                {/* Kondisi Barang */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Kondisi Fisik Barang (FR-LIST-01) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      {
                        val: "NEW",
                        label: "Baru (Belum pernah dipakai)",
                        desc: "Masih segel atau belum pernah digunakan",
                      },
                      {
                        val: "LIKE_NEW",
                        label: "Bekas - Sangat Baik",
                        desc: "Mulus 95%+, fungsi normal tanpa cacat fisik",
                      },
                      {
                        val: "LIGHTLY_USED",
                        label: "Bekas - Baik (Wajar)",
                        desc: "Pemakaian normal, fungsi 100% optimal",
                      },
                      {
                        val: "WELL_USED",
                        label: "Bekas - Layak",
                        desc: "Ada goresan/tanda pakai, fungsi utama aktif",
                      },
                    ].map((item) => (
                      <label
                        key={item.val}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                          condition === item.val
                            ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{item.label}</span>
                          <input
                            type="radio"
                            name="conditionOption"
                            checked={condition === item.val}
                            onChange={() => setCondition(item.val as ItemCondition)}
                            className="text-brand-600"
                          />
                        </div>
                        <span className="text-slate-500 block mt-1">{item.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Khusus Kategori Buku & Diktat (FR-LIST-03) */}
                {categoryId === "cat_buku" && (
                  <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-3xl space-y-4">
                    <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span>Atribut Khusus Buku & Diktat (FR-LIST-03)</span>
                    </div>
                    <p className="text-xs text-blue-800">
                      Wajib diisi agar mahasiswa yang mengambil mata kuliah yang sama dapat menemukan diktat ini dengan mudah.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-blue-950 mb-1">
                          Nama Mata Kuliah *
                        </label>
                        <input
                          type="text"
                          value={courseName}
                          onChange={(e) => setCourseName(e.target.value)}
                          placeholder="Misal: Kalkulus 1 / Aljabar Linear"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-blue-950 mb-1">
                          Kode Matkul / Dosen *
                        </label>
                        <input
                          type="text"
                          value={courseCode}
                          onChange={(e) => setCourseCode(e.target.value)}
                          placeholder="Misal: MA1101 / Tim Dosen TPB"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-4 h-4" /> Kembali
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-brand-700"
                  >
                    <span>Lanjut: Titik COD Kampus</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: LOKASI COD KAMPUS (FR-CHAT-02) */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                  Langkah 4: Lokasi Hyper-Local & Titik Temu COD Aman
                </h3>

                {/* Pilih Kampus & Kost Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Kampus Mahasiswa *
                    </label>
                    <select
                      value={campusName}
                      onChange={(e) => setCampusName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {CAMPUS_OPTIONS.filter((c) => c !== "Semua Kampus").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Area Sekitar Kost / Kampus *
                    </label>
                    <input
                      type="text"
                      required
                      value={kostArea}
                      onChange={(e) => setKostArea(e.target.value)}
                      placeholder="Misal: Dago Asri / Kutek UI / Pogung Baru"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                {/* Preset Titik Temu Aman (FR-CHAT-02) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Rekomendasi Titik Temu COD Aman (Fasilitas Kampus) *
                  </label>
                  <div className="space-y-2">
                    {relevantSafePoints.map((pt) => (
                      <label
                        key={pt.id}
                        className={`flex items-start gap-3 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                          preferredMeetingPoint === pt.name
                            ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="meetingSpot"
                          value={pt.name}
                          checked={preferredMeetingPoint === pt.name}
                          onChange={(e) => setPreferredMeetingPoint(e.target.value)}
                          className="mt-0.5 text-brand-600"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{pt.name}</span>
                          <span className="text-slate-500">{pt.landmark}</span>
                        </div>
                      </label>
                    ))}

                    <label
                      className={`flex items-start gap-3 p-3 rounded-2xl border text-xs cursor-pointer ${
                        preferredMeetingPoint === "Titik Publik Lainnya"
                          ? "border-brand-600 bg-brand-50/60"
                          : "border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="meetingSpot"
                        value="Titik Publik Lainnya"
                        checked={preferredMeetingPoint === "Titik Publik Lainnya"}
                        onChange={(e) => setPreferredMeetingPoint(e.target.value)}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-bold text-slate-900">
                          Titik Publik Lainnya di Lingkungan Kampus
                        </span>
                        <span className="text-slate-500">
                          Disepakati bersama pembeli lewat fitur chat.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Safety Guarantee */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <p>
                    Dengan menekan tombol publikasi, kamu menyetujui kode etik transaksi kampus Preniche: barang adalah milik pribadi yang sah dan bertransaksi secara jujur.
                  </p>
                </div>

                {/* Navigation and Submit */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-4 h-4" /> Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-600/20 transition-all flex items-center gap-2 hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <span>Mengunggah...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Publikasikan Listing Sekarang</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

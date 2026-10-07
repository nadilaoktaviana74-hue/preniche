"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth, UNTAG_CAMPUS_NAME } from "@/lib/auth-context";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import { CampusBadge } from "@/components/CampusBadge";
import { VerifiedStudentBadge } from "@/components/VerifiedStudentBadge";
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPin,
  Building,
  Star,
  PlusCircle,
  LogOut,
  Sparkles,
  Send,
  KeyRound,
  RefreshCw,
  Package,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, verifyCampusEmail, updateProfile } = useAuth();

  // Verification Form State
  const [campusEmailInput, setCampusEmailInput] = useState(user?.campusEmail || "");
  const [verificationStep, setVerificationStep] = useState<"input" | "otp" | "success">("input");
  const [otpCode, setOtpCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulatedOtp, setSimulatedOtp] = useState("892147");

  // If user is not logged in
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-sm">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Belum Masuk Akun</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Silakan masuk atau daftar untuk mengakses profil dan verifikasi mahasiswa Untag Surabaya.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/login"
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition"
          >
            Masuk Akun
          </Link>
          <Link
            href="/register"
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition"
          >
            Daftar Baru
          </Link>
        </div>
      </div>
    );
  }

  // User's listings
  const userProducts = MOCK_PRODUCTS.filter(
    (p) => p.sellerId === user.id || p.seller.email === user.email || p.seller.name === user.name
  );

  const displayProducts =
    userProducts.length > 0
      ? userProducts
      : MOCK_PRODUCTS.slice(0, 2).map((p) => ({
          ...p,
          sellerId: user.id,
          seller: user,
        }));

  // Handle Send OTP
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const emailTrimmed = campusEmailInput.trim().toLowerCase();
    if (!emailTrimmed) {
      setErrorMsg("Email kampus Untag wajib diisi.");
      return;
    }

    // Strict validation: domain must be @student.untag-sby.ac.id or @untag-sby.ac.id
    const isUntagStudent = emailTrimmed.endsWith("@student.untag-sby.ac.id");
    const isUntagOfficial = emailTrimmed.endsWith("@untag-sby.ac.id");

    if (!isUntagStudent && !isUntagOfficial) {
      setErrorMsg(
        "Format tidak valid! Email kampus wajib menggunakan domain resmi Untag Surabaya (@student.untag-sby.ac.id atau @untag-sby.ac.id). Contoh: 1462200045@student.untag-sby.ac.id"
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSimulatedOtp(generatedCode);
      setVerificationStep("otp");
      setSuccessMsg(`Kode OTP 6 digit telah dikirim ke ${emailTrimmed}. (Simulasi OTP: ${generatedCode})`);
    }, 600);
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      if (otpCode !== simulatedOtp && otpCode !== "123456") {
        setErrorMsg(`Kode OTP salah. Silakan masukkan kode ${simulatedOtp} atau 123456.`);
        setIsSubmitting(false);
        return;
      }

      const res = await verifyCampusEmail(campusEmailInput.trim().toLowerCase());
      if (res.success) {
        setVerificationStep("success");
        setSuccessMsg("Selamat! Email kampus Untag berhasil diverifikasi. Lencana 'Mahasiswa Untag Terverifikasi' telah aktif!");
      } else {
        setErrorMsg(res.error || "Gagal memverifikasi email kampus.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantVerify = async () => {
    setErrorMsg("");
    setIsSubmitting(true);
    const emailToUse =
      campusEmailInput.trim().toLowerCase().includes("untag-sby.ac.id")
        ? campusEmailInput.trim().toLowerCase()
        : "1462200045@student.untag-sby.ac.id";

    setCampusEmailInput(emailToUse);
    try {
      const res = await verifyCampusEmail(emailToUse);
      if (res.success) {
        setVerificationStep("success");
        setSuccessMsg("Selamat! Email kampus Untag Surabaya berhasil diverifikasi secara instan!");
      } else {
        setErrorMsg(res.error || "Gagal verifikasi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-red-100 border-2 border-red-200 shrink-0 shadow-md">
              <Image
                src={user.avatarUrl}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {user.name}
                </h1>
                {/* Badge Mahasiswa Untag Terverifikasi beside username */}
                {user.isVerifiedStudent ? (
                  <VerifiedStudentBadge
                    size="md"
                    campusEmail={user.campusEmail}
                  />
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Belum Verifikasi Mahasiswa Untag</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user.email}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-red-800">
                  <Building className="w-3.5 h-3.5 text-red-600" />
                  <span>{UNTAG_CAMPUS_NAME}</span>
                </span>
                {user.kostArea && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{user.kostArea}</span>
                    </span>
                  </>
                )}
              </div>

              {user.faculty && (
                <p className="text-xs text-slate-600">
                  {user.faculty} {user.major ? `— ${user.major}` : ""} {user.batchYear ? `(${user.batchYear})` : ""}
                </p>
              )}

              <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                <div className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{user.rating.toFixed(1)}</span>
                </div>
                <span>({user.reviewCount} ulasan mahasiswa Untag)</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <Link
              href="/sell"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Jual Barang</span>
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-semibold text-xs sm:text-sm transition"
              title="Keluar dari akun"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Campus Email Verification Section (Khusus Untag Surabaya) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap bg-gradient-to-r from-red-50/50 via-white to-slate-50/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-red-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Verifikasi Email Kampus Untag Surabaya
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Validasi status mahasiswa Untag Surabaya menggunakan domain <strong>@student.untag-sby.ac.id</strong> atau <strong>@untag-sby.ac.id</strong> untuk mengaktifkan lencana resmi <strong>Mahasiswa Untag Terverifikasi</strong>.
            </p>
          </div>

          {user.isVerifiedStudent && (
            <VerifiedStudentBadge size="lg" campusEmail={user.campusEmail} />
          )}
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {user.isVerifiedStudent ? (
            /* Already Verified State */
            <div className="p-6 rounded-2xl bg-red-50/50 border border-red-200 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Akun Anda Terverifikasi Sebagai Mahasiswa Untag Surabaya
                    </h3>
                    <VerifiedStudentBadge size="sm" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Email kampus Untag terdaftar:{" "}
                    <strong className="text-red-900 font-mono bg-white px-2 py-0.5 rounded border border-red-200">
                      {user.campusEmail || "1462200045@student.untag-sby.ac.id"}
                    </strong>
                  </p>
                  <p className="text-xs text-red-800 pt-1">
                    ✓ Badge <strong>'Mahasiswa Untag Terverifikasi'</strong> otomatis tampil di samping nama Anda dan di setiap kartu produk yang Anda jual.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-red-200/60 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
                <span>Ingin memperbarui email kampus Untag Anda?</span>
                <button
                  type="button"
                  onClick={() => {
                    setVerificationStep("input");
                    updateProfile({ isVerifiedStudent: false });
                  }}
                  className="text-xs font-bold text-red-800 hover:text-red-950 underline inline-flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Ganti atau Verifikasi Ulang Email Untag
                </button>
              </div>
            </div>
          ) : (
            /* Not Verified Yet - Verification Form */
            <div className="space-y-6">
              {/* Educational info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Kepercayaan Sesama Mahasiswa</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Pembeli sesama mahasiswa Untag Surabaya merasa aman bertransaksi dengan penjual yang terverifikasi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Lencana Resmi Untag</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Badge 'Mahasiswa Untag Terverifikasi' muncul di samping profil dan setiap kartu barang jualan Anda.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">COD Aman di Kampus Untag</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Akses lock janji COD di Graha Wiyata, Perpustakaan R. Ing. Soekonjono, dan Plaza Untag.
                  </p>
                </div>
              </div>

              {/* Status & Error Alerts */}
              {errorMsg && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{successMsg}</span>
                </div>
              )}

              {/* Step 1: Input Campus Email */}
              {verificationStep === "input" && (
                <form onSubmit={handleRequestOtp} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Masukkan Email Kampus Untag Surabaya (@student.untag-sby.ac.id / @untag-sby.ac.id)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={campusEmailInput}
                        onChange={(e) => {
                          setCampusEmailInput(e.target.value);
                          if (errorMsg) setErrorMsg("");
                        }}
                        placeholder="contoh: 1462200045@student.untag-sby.ac.id atau nama@untag-sby.ac.id"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition font-mono placeholder:font-sans"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>
                        Domain resmi: <strong>@student.untag-sby.ac.id</strong> atau <strong>@untag-sby.ac.id</strong>
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Mengirim OTP..." : "Kirim Kode Verifikasi"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleInstantVerify}
                      disabled={isSubmitting}
                      className="px-5 py-3 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-800 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
                      title="Simulasi verifikasi instan dengan email Untag untuk demo"
                    >
                      <CheckCircle2 className="w-4 h-4 text-red-600" />
                      <span>Verifikasi Cepat Untag (Demo)</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: OTP Code Input */}
              {verificationStep === "otp" && (
                <form onSubmit={handleVerifyOtp} className="space-y-4 max-w-md p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-red-600" />
                      Masukkan Kode OTP 6 Digit
                    </h3>
                    <p className="text-xs text-slate-500">
                      Kode telah dikirimkan ke <strong>{campusEmailInput}</strong>.
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Contoh: 892147"
                      className="w-full text-center tracking-[0.3em] font-mono text-lg py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    />
                    <div className="flex items-center justify-between mt-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setOtpCode(simulatedOtp)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Gunakan kode simulasi: {simulatedOtp}
                      </button>
                      <button
                        type="button"
                        onClick={() => setVerificationStep("input")}
                        className="text-slate-500 hover:text-slate-800"
                      >
                        Ubah email
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isSubmitting ? "Memverifikasi..." : "Konfirmasi & Aktifkan Badge Untag"}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User's Products Section (Tampilkan badge 'Mahasiswa Untag Terverifikasi' di setiap kartu produk yang mereka jual) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-red-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Barang Jualan Saya ({displayProducts.length})
            </h2>
          </div>
          <Link
            href="/sell"
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Pasang Iklan Baru</span>
          </Link>
        </div>

        <p className="text-xs text-slate-500">
          Badge <strong className="text-red-800 font-semibold">Mahasiswa Untag Terverifikasi</strong> otomatis disematkan pada setiap kartu produk jualan Anda ketika akun telah terverifikasi.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayProducts.map((product) => {
            const updatedProduct = {
              ...product,
              seller: {
                ...product.seller,
                isVerifiedStudent: user.isVerifiedStudent,
                isVerified: user.isVerifiedStudent,
                name: user.name,
                campusEmail: user.campusEmail,
              },
            };
            return <ProductCard key={product.id} product={updatedProduct} />;
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UNTAG_CAMPUS_NAME } from "@/lib/auth-context";
import { GraduationCap, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Silakan masukkan alamat email.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        router.push("/profile");
      } else {
        setError(res.error || "Gagal masuk. Silakan periksa kembali email Anda.");
      }
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan saat masuk.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await loginWithGoogle();
      if (res.success) {
        router.push("/profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setIsLoading(true);
    try {
      const res = await login(demoEmail, "password");
      if (res.success) {
        router.push("/profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-500/25">
              <GraduationCap className="w-6 h-6" />
            </div>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Masuk Preniche Untag
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Marketplace Mahasiswa {UNTAG_CAMPUS_NAME}
          </p>
        </div>

        {/* Info Box */}
        <div className="p-3.5 bg-red-50/80 border border-red-200/70 rounded-2xl text-xs text-red-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-red-900">
            <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
            <span>Login Menggunakan Email Biasa</span>
          </div>
          <p className="text-[11px] text-red-900/80 leading-relaxed">
            Daftar & login dengan Gmail pribadi Anda. Verifikasi akun mahasiswa Untag Surabaya dapat dilakukan di profil menggunakan email <strong>@student.untag-sby.ac.id</strong> untuk mendapatkan badge resmi <strong>Mahasiswa Untag Terverifikasi</strong>.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email / Gmail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Kata Sandi
              </label>
              <span className="text-[11px] text-slate-400 cursor-pointer hover:text-red-600">
                Lupa sandi?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isLoading ? "Memproses..." : "Masuk Akun"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase">
            <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
              Atau masuk dengan
            </span>
          </div>
        </div>

        {/* Google OAuth Simulation Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-3 shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Lanjutkan dengan Google (Gmail)</span>
        </button>

        {/* Quick Demo Accounts */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider text-center">
            Uji Coba Cepat (Akun Demo Mahasiswa Untag):
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin("dimas.pratama@gmail.com")}
              className="text-left p-2.5 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-50 text-xs flex items-center justify-between transition group"
            >
              <div>
                <span className="font-bold text-red-950 block">Dimas (Informatika Untag)</span>
                <span className="text-[10px] text-red-700">1462200045@student.untag-sby.ac.id</span>
              </div>
              <span className="text-[9.5px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-full">
                Untag Terverifikasi
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("nabila.aurelia@gmail.com")}
              className="text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-xs flex items-center justify-between transition"
            >
              <div>
                <span className="font-bold text-slate-800 block">Nabila (Psikologi Untag)</span>
                <span className="text-[10px] text-slate-500">Email Gmail (Belum Verifikasi Email Kampus)</span>
              </div>
              <span className="text-[9.5px] font-medium text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                Belum Verifikasi
              </span>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-500 pt-2">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-red-600 hover:text-red-700">
            Daftar sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}

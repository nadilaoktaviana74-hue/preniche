"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { PrenicheHeader } from "@/components/PrenicheHeader";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        setSuccessMessage("Login berhasil! Mengalihkan...");

        setTimeout(() => {
          router.push(redirectPath);
        }, 800);
      } else {
        setError(res.error || "Gagal masuk. Periksa kembali email Anda.");
      }
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan saat masuk.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Fitur Reset Password telah dikirim ke email terdaftar Anda jika akun tersedia.");
  };

  return (
    <div className="min-h-screen w-full bg-[#B67B8A] flex flex-col justify-between items-center py-6 px-4 sm:px-8 selection:bg-[#4A2B33] selection:text-white">
      <div className="w-full max-w-[1140px] flex flex-col flex-1">
        {/* HEADER NAVBAR */}
        <PrenicheHeader sellButtonText="Sell Product" />

        {/* CENTER CONTENT AREA - SPLIT OVERLAPPING CARDS */}
        <div className="flex-1 flex items-center justify-center py-10 w-full">
          <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-[820px]">
            {/* Left Card: Solid light grey rounded container */}
            <div className="bg-[#D9D9D9] rounded-[28px] w-[320px] sm:w-[360px] h-[380px] sm:h-[440px] z-10 shadow-xl shrink-0 overflow-hidden" />

            {/* Right Card: Glassmorphic translucent frosted panel overlapping left card */}
            <div className="bg-white/20 backdrop-blur-md rounded-[28px] border border-white/30 pt-8 pb-8 pr-8 sm:pr-10 pl-12 sm:pl-16 w-full max-w-[380px] sm:max-w-[440px] min-h-[360px] my-auto md:-ml-10 z-0 flex flex-col justify-center shadow-xl mt-[-40px] md:mt-auto">
              <h1 className="text-2xl font-bold text-[#1A0B10] text-center mb-8">
                Login
              </h1>

              {error && (
                <div className="mb-5 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-950 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-5 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-950 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-900" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="w-full">
                {/* Email Input */}
                <div className="border-b border-[#1A0B10] py-1.5 flex items-center justify-between">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="bg-transparent text-[#1A0B10] placeholder:text-[#1A0B10] text-sm w-full outline-none font-medium"
                  />
                  <Mail className="w-4 h-4 text-[#1A0B10] shrink-0 ml-2" />
                </div>

                {/* Password Input with Visibility Toggle */}
                <div className="border-b border-[#1A0B10] py-1.5 flex items-center justify-between mt-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="bg-transparent text-[#1A0B10] placeholder:text-[#1A0B10] text-sm w-full outline-none font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#1A0B10] shrink-0 ml-2 hover:opacity-80 transition-opacity cursor-pointer p-0.5 focus:outline-none"
                    title={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4 text-[#1A0B10]" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-[#1A0B10]" />
                    )}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#4A2B33] text-white px-10 py-2.5 rounded-full font-semibold shadow-md hover:bg-[#3A2127] active:scale-95 transition-all mx-auto block mt-8 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>

                {/* Footer Links */}
                <div className="flex justify-between items-center mt-8 text-sm font-semibold text-[#1A0B10]">
                  <Link
                    href={`/register${redirectPath !== "/" ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`}
                    className="hover:underline hover:opacity-80 transition-opacity"
                  >
                    Create an account
                  </Link>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="hover:underline hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0 text-inherit font-semibold"
                  >
                    Forgot Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

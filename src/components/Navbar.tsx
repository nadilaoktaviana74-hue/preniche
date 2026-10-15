"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  PlusCircle,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  if (
    pathname === "/" ||
    pathname === "/catalog" ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  const isLoggedIn = Boolean(user);

  const handleProtectedNavigation = (targetPath: string) => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push(targetPath);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Banner (Untag Surabaya Single-Campus Trust Banner) */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-white bg-red-600 px-2 py-0.5 rounded text-[11px] shadow-xs">
              <ShieldCheck className="w-3 h-3 text-white" />
              Untag Surabaya Hub
            </span>
            <span className="hidden sm:inline text-slate-300">
              Platform Marketplace & Preloved Mahasiswa Universitas 17 Agustus 1945 Surabaya
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-red-500" />
              Jl. Semolowaru No. 45 Surabaya
            </span>
            <span className="text-slate-700 hidden md:inline">|</span>
            <Link
              href="/catalog?type=FREE"
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Hibah Maba Untag
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Logo & Brand (Untag Surabaya Single-Campus) */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-red-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                Preniche
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 px-1.5 py-0.5 rounded border border-red-200">
                  Untag
                </span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wide block -mt-1">
                Untag Surabaya Marketplace
              </span>
            </div>
          </Link>

          {/* Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-md relative min-w-[160px]"
          >
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kasur kos, jas lab Untag, modul, kipas angin..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-red-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 text-slate-800 transition-all placeholder:text-slate-400"
              />
            </div>
          </form>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-700">
            <Link
              href="/catalog"
              className="px-2.5 py-2 rounded-lg hover:text-red-700 hover:bg-red-50/60 transition-colors"
            >
              Semua Katalog
            </Link>
            <Link
              href="/catalog?category=cat_kost"
              className="px-2.5 py-2 rounded-lg hover:text-red-700 hover:bg-red-50/60 transition-colors"
            >
              Peralatan Kos
            </Link>
            <Link
              href="/catalog?category=cat_praktikum"
              className="px-2.5 py-2 rounded-lg hover:text-red-700 hover:bg-red-50/60 transition-colors"
            >
              Alat Praktikum
            </Link>
            <Link
              href="/catalog?category=cat_buku"
              className="px-2.5 py-2 rounded-lg hover:text-red-700 hover:bg-red-50/60 transition-colors"
            >
              Buku & Modul
            </Link>
          </nav>

          {/* Action Button: Jual Barang */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleProtectedNavigation("/sell")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>Jual Barang</span>
            </button>

            {/* User Profile Mini Badge or Auth Links */}
            {user ? (
              <Link
                href="/profile"
                className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-90 transition group"
                title="Buka Profil Saya"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-red-100 text-red-800 border border-red-200 flex items-center justify-center font-bold text-xs shrink-0">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div className="text-left text-xs leading-tight">
                  <p className="font-semibold text-slate-800 group-hover:text-red-700 transition truncate max-w-[100px]">
                    {user.name.split(" ")[0]}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Profil Saya
                  </p>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200 text-xs font-semibold">
                <Link
                  href="/login"
                  className="px-2.5 py-1.5 text-slate-600 hover:text-red-700 transition"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

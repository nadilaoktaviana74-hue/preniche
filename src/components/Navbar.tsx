"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  PlusCircle,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Heart,
  ChevronDown,
} from "lucide-react";
import { CAMPUS_OPTIONS } from "@/data/mockData";

export const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("Semua Kampus");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  const handleCampusChange = (campus: string) => {
    setSelectedCampus(campus);
    if (campus === "Semua Kampus") {
      router.push("/catalog");
    } else {
      router.push(`/catalog?campus=${encodeURIComponent(campus)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Banner (Campus Student Trust & .ac.id badge) */}
      <div className="bg-brand-900 text-brand-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-white bg-brand-800/80 px-2 py-0.5 rounded text-[11px]">
              <ShieldCheck className="w-3 h-3 text-brand-300" />
              100% Khusus Mahasiswa
            </span>
            <span className="hidden sm:inline text-brand-200">
              Registrasi wajib email institusi (.ac.id) & COD aman di area kampus
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link
              href="/catalog?type=FREE"
              className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Barang Gratis untuk Maba
            </Link>
            <span className="text-brand-700 hidden md:inline">|</span>
            <span className="hidden md:inline text-brand-300">
              📍 Transaksi Bebas Biaya Admin
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                Preniche
                <span className="w-2 h-2 rounded-full bg-brand-500 inline-block"></span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wide block -mt-1">
                Campus Thrift & Hub
              </span>
            </div>
          </Link>

          {/* Campus Selector Dropdown (Desktop) */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <select
                aria-label="Pilih Kampus"
                value={selectedCampus}
                onChange={(e) => handleCampusChange(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
              >
                {CAMPUS_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-lg relative min-w-[160px]"
          >
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari buku, diktat, kalkulator, kulkas kost..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-brand-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all placeholder:text-slate-400"
              />
            </div>
          </form>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Link
              href="/catalog"
              className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors"
            >
              Semua Katalog
            </Link>
            <Link
              href="/catalog?category=cat_buku"
              className="px-3 py-2 rounded-lg hover:text-brand-600 hover:bg-slate-50 transition-colors"
            >
              Buku & Diktat
            </Link>
            <Link
              href="/catalog?type=FREE"
              className="px-3 py-2 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 transition-colors font-bold"
            >
              Hibah Maba
            </Link>
          </nav>

          {/* Action Button: Jual Barang Preloved */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/sell"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-brand-600/20 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>Jual Barang</span>
            </Link>

            {/* User Profile Mini Badge (Simulated authenticated student) */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 border border-brand-200 flex items-center justify-center font-bold text-xs">
                DA
              </div>
              <div className="text-left text-xs leading-tight">
                <p className="font-semibold text-slate-800">Dimas A.</p>
                <p className="text-[10px] text-brand-700 font-medium">itb.ac.id ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

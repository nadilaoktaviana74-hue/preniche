"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, ShieldCheck, Heart, MapPin } from "lucide-react";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">Preniche</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Platform jual-beli dan sewa barang preloved ramah kantong mahasiswa. 
              Berbasis komunitas kampus dan titik temu COD aman di lingkungan Semolowaru.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-brand-400 text-xs border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Titik Temu COD Aman Kampus</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Kategori Kebutuhan Untag</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/catalog?category=cat_kost" className="hover:text-white transition-colors">
                  Peralatan Kos
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=cat_praktikum" className="hover:text-white transition-colors">
                  Alat Praktikum & Perkuliahan
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=cat_buku" className="hover:text-white transition-colors">
                  Buku Kuliah & Modul
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=cat_fashion" className="hover:text-white transition-colors">
                  Thrift & Fashion
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=cat_gadget" className="hover:text-white transition-colors">
                  Elektronik & Gadget Kos
                </Link>
              </li>
            </ul>
          </div>

          {/* Kampus Untag Surabaya */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Untag Surabaya</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="text-slate-300 font-semibold">Universitas 17 Agustus 1945 Surabaya</li>
              <li>Jl. Semolowaru No. 45 Surabaya</li>
              <li>Gedung Graha Wiyata & Gedung Q</li>
              <li>Plaza & Kantin Kampus Untag</li>
              <li>Email: @student.untag-sby.ac.id</li>
            </ul>
          </div>

          {/* Panduan Aman COD */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Keamanan Transaksi</h4>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 text-xs space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  Selalu pilih titik temu di area publik kampus (Perpustakaan, Kantin, Gerbang Utama).
                </p>
              </div>
              <p className="text-[11px] text-slate-400">
                Penting: Jangan pernah mentransfer uang muka (DP) sebelum mengecek kondisi barang secara langsung.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Preniche — Campus Thrift & Marketplace. Mahasiswa Berdaya, Kampus Berkelanjutan.</p>
          <div className="flex items-center gap-4">
            <Link href="/#srs" className="hover:text-slate-300">Spesifikasi SRS</Link>
            <Link href="/#terms" className="hover:text-slate-300">Panduan Mahasiswa</Link>
            <Link href="/#privacy" className="hover:text-slate-300">Privasi Email</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

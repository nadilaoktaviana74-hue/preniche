"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, ShoppingBag } from "lucide-react";
import { PrenicheHeader } from "@/components/PrenicheHeader";
import { useAuth } from "@/lib/auth-context";

export default function CartPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-full bg-[#BD8094] flex flex-col items-center py-6 px-4 sm:px-8 selection:bg-[#7C515E] selection:text-white">
      <div className="w-full max-w-[1140px] flex flex-col gap-6 sm:gap-8 flex-1">
        <PrenicheHeader />

        <div className="bg-[#59313D] rounded-[32px] p-8 shadow-xl flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full my-8">
          <div className="w-20 h-20 rounded-full bg-[#7C515E] flex items-center justify-center text-white mb-6 shadow-inner">
            <ShoppingCart className="w-10 h-10 stroke-[2]" />
          </div>

          <h1 className="text-white text-2xl font-bold mb-2">Keranjang Belanja</h1>
          <p className="text-[#D8B2BC] text-sm max-w-md mb-8">
            {user
              ? `Halo ${user.name}, keranjang Anda masih kosong. Cari barang kos atau buku kuliah preloved impian Anda sekarang!`
              : "Keranjang Anda masih kosong."}
          </p>

          <Link
            href="/catalog"
            className="rounded-full bg-[#8C5663] hover:bg-[#7A4955] text-white px-8 py-3 text-sm font-semibold flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Jelajahi Katalog Barang</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

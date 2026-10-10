"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth, UNTAG_CAMPUS_NAME } from "@/lib/auth-context";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import {
  GraduationCap,
  Mail,
  MapPin,
  Building,
  Star,
  PlusCircle,
  LogOut,
  Package,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

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
            Silakan masuk atau daftar untuk mengakses profil dan kelola barang preloved Anda.
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
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {user.name}
              </h1>

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

      {/* User's Products Section */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayProducts.map((product) => {
            const updatedProduct = {
              ...product,
              seller: {
                ...product.seller,
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

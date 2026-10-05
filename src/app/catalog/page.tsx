"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  CAMPUS_OPTIONS,
} from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import { ProductItem, TransactionType, ItemCondition } from "@/types";
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpDown,
  GraduationCap,
  PackageOpen,
  RotateCcw,
} from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();

  // Initial states from URL params if present
  const initialQuery = searchParams.get("q") || "";
  const initialCampus = searchParams.get("campus") || "Semua Kampus";
  const initialCategory = searchParams.get("category") || "all";
  const initialType = (searchParams.get("type") as TransactionType) || "all";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCampus, setSelectedCampus] = useState(initialCampus);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">(
    "newest"
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((item) => {
      // 1. Text search (title, description, courseCode, courseName)
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCourse = item.courseName?.toLowerCase().includes(q);
        const matchCode = item.courseCode?.toLowerCase().includes(q);
        const matchSeller = item.seller.name.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCourse && !matchCode && !matchSeller) {
          return false;
        }
      }

      // 2. Campus filter
      if (selectedCampus !== "Semua Kampus") {
        if (
          !item.campusName.toLowerCase().includes(selectedCampus.toLowerCase())
        ) {
          return false;
        }
      }

      // 3. Category filter
      if (selectedCategory !== "all") {
        if (item.categoryId !== selectedCategory) {
          return false;
        }
      }

      // 4. Transaction type (FOR_SALE, FOR_RENT, FREE)
      if (selectedType !== "all") {
        if (item.transactionType !== selectedType) {
          return false;
        }
      }

      // 5. Condition filter
      if (selectedCondition !== "all") {
        if (item.condition !== selectedCondition) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      // Default: newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    query,
    selectedCampus,
    selectedCategory,
    selectedType,
    selectedCondition,
    sortBy,
  ]);

  const resetFilters = () => {
    setQuery("");
    setSelectedCampus("Semua Kampus");
    setSelectedCategory("all");
    setSelectedType("all");
    setSelectedCondition("all");
    setSortBy("newest");
  };

  const hasActiveFilters =
    query !== "" ||
    selectedCampus !== "Semua Kampus" ||
    selectedCategory !== "all" ||
    selectedType !== "all" ||
    selectedCondition !== "all";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Search Bar */}
      <div className="mb-8 space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Katalog Barang Preloved Kampus
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Temukan barang murah & layak pakai langsung dari sesama mahasiswa di sekitarmu
          </p>
        </div>

        {/* Search & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul barang, nama dosen, atau kode matkul (contoh: Kalkulus / MA1101)..."
              className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 shadow-sm shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-600" />
            <span>Filter</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
            )}
          </button>
        </div>

        {/* Quick Transaction Type Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedType === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Semua Tipe
          </button>
          <button
            onClick={() => setSelectedType("FOR_SALE")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedType === "FOR_SALE"
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Dijual Murah
          </button>
          <button
            onClick={() => setSelectedType("FOR_RENT")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedType === "FOR_RENT"
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            Disewakan
          </button>
          <button
            onClick={() => setSelectedType("FREE")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              selectedType === "FREE"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Hibah Gratis (Rp 0)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR FILTERS (Desktop & Mobile Drawer) */}
        <aside
          className={`${
            isMobileFilterOpen ? "block" : "hidden"
          } lg:block lg:col-span-1 space-y-6`}
        >
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-600" />
                <h3 className="font-bold text-slate-900 text-sm">Filter Katalog</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Campus Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Kampus Mahasiswa
              </label>
              <select
                aria-label="Pilih Kampus Mahasiswa"
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {CAMPUS_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Kategori Produk
              </label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-brand-50 text-brand-700 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>Semua Kategori</span>
                  <span className="text-[11px] text-slate-400">
                    {MOCK_PRODUCTS.length}
                  </span>
                </button>
                {MOCK_CATEGORIES.map((cat) => {
                  const count = MOCK_PRODUCTS.filter(
                    (p) => p.categoryId === cat.id
                  ).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? "bg-brand-50 text-brand-700 font-bold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[11px] text-slate-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Kondisi Barang
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: "all", label: "Semua Kondisi" },
                  { id: "NEW", label: "Baru (Belum dipakai)" },
                  { id: "LIKE_NEW", label: "Bekas - Sangat Baik" },
                  { id: "LIGHTLY_USED", label: "Bekas - Baik" },
                  { id: "WELL_USED", label: "Bekas - Layak" },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 text-slate-600 cursor-pointer hover:text-slate-900"
                  >
                    <input
                      type="radio"
                      name="condition"
                      checked={selectedCondition === item.id}
                      onChange={() => setSelectedCondition(item.id)}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS AREA */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Results Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-xs">
            <div className="text-slate-600 font-medium">
              Menampilkan{" "}
              <strong className="text-slate-900">
                {filteredProducts.length}
              </strong>{" "}
              barang preloved terverifikasi
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500">Urutkan:</span>
              <select
                aria-label="Urutkan Produk"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "newest" | "price-asc" | "price-desc")
                }
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="newest">Paling Baru Diunggah</option>
                <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                <option value="price-desc">Harga: Tertinggi ke Terendah</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Filter aktif:</span>
              {query && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                  Cari: &quot;{query}&quot;
                  <button onClick={() => setQuery("")}>
                    <X className="w-3 h-3 text-slate-500 hover:text-slate-800" />
                  </button>
                </span>
              )}
              {selectedCampus !== "Semua Kampus" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  Kampus: {selectedCampus}
                  <button onClick={() => setSelectedCampus("Semua Kampus")}>
                    <X className="w-3 h-3 text-blue-500 hover:text-blue-800" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
                  Kategori:{" "}
                  {MOCK_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X className="w-3 h-3 text-brand-600 hover:text-brand-900" />
                  </button>
                </span>
              )}
              {selectedType !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Tipe: {selectedType === "FREE" ? "Hibah Gratis" : selectedType === "FOR_RENT" ? "Sewa" : "Dijual"}
                  <button onClick={() => setSelectedType("all")}>
                    <X className="w-3 h-3 text-amber-600 hover:text-amber-900" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Cards Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <PackageOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Tidak ada barang yang cocok
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Coba sesuaikan kata kunci pencarian atau bersihkan filter kampus dan kategori untuk melihat opsi lainnya.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
          Memuat katalog kampus...
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}

"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  UNTAG_AREAS,
  UNTAG_CAMPUS_NAME,
} from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import { TransactionType } from "@/types";
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpDown,
  PackageOpen,
  RotateCcw,
  MapPin,
  Building,
} from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();

  // Initial states from URL params if present
  const initialQuery = searchParams.get("q") || "";
  const initialArea = searchParams.get("area") || "Semua Area Sekitar Untag";
  const initialCategory = searchParams.get("category") || "all";
  const initialType = (searchParams.get("type") as TransactionType) || "all";

  const [query, setQuery] = useState(initialQuery);
  const [selectedArea, setSelectedArea] = useState(initialArea);
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
      // 1. Text search
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

      // 2. Area Sekitar Untag filter
      if (selectedArea !== "Semua Area Sekitar Untag") {
        const cleanArea = selectedArea.split(" ")[0].toLowerCase();
        if (!item.kostArea.toLowerCase().includes(cleanArea)) {
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
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    query,
    selectedArea,
    selectedCategory,
    selectedType,
    selectedCondition,
    sortBy,
  ]);

  const resetFilters = () => {
    setQuery("");
    setSelectedArea("Semua Area Sekitar Untag");
    setSelectedCategory("all");
    setSelectedType("all");
    setSelectedCondition("all");
    setSortBy("newest");
  };

  const hasActiveFilters =
    query !== "" ||
    selectedArea !== "Semua Area Sekitar Untag" ||
    selectedCategory !== "all" ||
    selectedType !== "all" ||
    selectedCondition !== "all";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Search Bar */}
      <div className="mb-8 space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-800 border border-red-200 text-xs font-semibold mb-2">
            <Building className="w-3.5 h-3.5 text-red-600" />
            <span>Katalog Resmi {UNTAG_CAMPUS_NAME}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Katalog Preloved Mahasiswa Untag Surabaya
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Buku kuliah, perlengkapan kos, alat praktikum & pakaian langsung dari sesama mahasiswa Untag di Semolowaru
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
              placeholder="Cari kasur, jas lab Untag, modul, kipas angin, kalkulator..."
              className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-sm"
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
            <SlidersHorizontal className="w-4 h-4 text-red-600" />
            <span>Filter</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
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
                ? "bg-red-600 text-white shadow-sm"
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
            <span>Hibah Gratis Maba Untag</span>
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
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                <Filter className="w-4 h-4 text-red-600" />
                <span>Filter Pencarian</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Area Kost Sekitar Untag Filter (Single Campus Localized) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Area Sekitar Untag
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  aria-label="Pilih Area Sekitar Kampus Untag"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {UNTAG_AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 5 Kategori Kebutuhan Mahasiswa Untag Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Kategori Kebutuhan
              </label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-red-50 text-red-800 font-bold"
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
                          ? "bg-red-50 text-red-800 font-bold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] text-slate-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Kondisi Fisik
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: "all", label: "Semua Kondisi" },
                  { id: "NEW", label: "Baru (Belum dipakai)" },
                  { id: "LIKE_NEW", label: "Bekas - Sangat Baik" },
                  { id: "LIGHTLY_USED", label: "Bekas - Baik" },
                  { id: "WELL_USED", label: "Bekas - Layak Pakai" },
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
                      className="text-red-600 focus:ring-red-500"
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
              barang mahasiswa Untag Surabaya
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
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
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
              {selectedArea !== "Semua Area Sekitar Untag" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-800 border border-red-200">
                  Area: {selectedArea}
                  <button onClick={() => setSelectedArea("Semua Area Sekitar Untag")}>
                    <X className="w-3 h-3 text-red-500 hover:text-red-800" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-800 border border-red-200">
                  Kategori:{" "}
                  {MOCK_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X className="w-3 h-3 text-red-600 hover:text-red-900" />
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
                Coba sesuaikan kata kunci pencarian atau bersihkan filter kategori dan area untuk melihat pilihan barang mahasiswa Untag lainnya.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
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
          Memuat katalog Untag Surabaya...
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}

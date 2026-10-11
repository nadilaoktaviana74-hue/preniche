"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Heart,
  Grid,
  Package,
  FlaskConical,
  BookOpen,
  Shirt,
  Building2,
  Utensils,
  Library,
  Sparkles,
  Lightbulb,
  Handshake,
  Recycle,
} from "lucide-react";
import { PrenicheHeader } from "@/components/PrenicheHeader";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const sampleTrendingProducts = [
    {
      id: "prod-1",
      title: "Kipas Angin Mini",
      price: "Rp 55.000",
      location: "Kantin Untag",
      image: "/images/kipas-clean.png",
      likes: 7,
      href: "/catalog?q=Kipas+Angin",
      hasBakedHeart: true,
    },
    {
      id: "prod-2",
      title: "Jas Lab Teknik",
      price: "Rp 45.000",
      location: "Gedung Q Untag",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80",
      likes: 12,
      href: "/catalog?q=Jas+Lab",
      hasBakedHeart: false,
    },
    {
      id: "prod-3",
      title: "Helm Cargloss Hitam",
      price: "Rp 120.000",
      location: "Parkiran Timur",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
      likes: 9,
      href: "/catalog?q=Helm+Cargloss",
      hasBakedHeart: false,
    },
    {
      id: "prod-4",
      title: "Meja Lipat Kos",
      price: "Rp 35.000",
      location: "Graha Wiyata",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
      likes: 15,
      href: "/catalog?q=Meja+Lipat",
      hasBakedHeart: false,
    },
  ];

  const popularTags = [
    "#HelmBekas",
    "#LampuBelajar",
    "#SetrikaPakaian",
    "#MejaLipat",
    "#KipasAngin",
    "#AtasanWanita",
    "#GalonBekas",
    "#PeralatanKos",
    "#JasLabTeknik",
    "#KasurBusa",
    "#MagicCom",
    "#BukuKuliah",
    "#Stopkontak",
    "#GantunganBaju",
    "#RakSepatu",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  const handleCarouselScroll = () => {
    if (carouselRef.current && !isDragging) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
      } else {
        setScrollProgress(0);
      }
    }
  };

  const handleScrollToPosition = useCallback((clientX: number, smooth: boolean = false) => {
    if (!trackRef.current || !carouselRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    if (rect.width === 0) return;

    // Relative position across the track from 0 to 1
    const clickX = clientX - rect.left;
    const clickPercent = clickX / rect.width;

    // The thumb is 40% of the track. Thumb center runs from 20% to 80% (span of 60%).
    const thumbHalf = 0.2;
    const scrollRange = 0.6;
    const ratio = Math.max(0, Math.min(1, (clickPercent - thumbHalf) / scrollRange));

    const { scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const targetScroll = ratio * maxScroll;
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: smooth ? "smooth" : "auto",
      });
      setScrollProgress(ratio);
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    handleScrollToPosition(e.clientX, false);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      handleScrollToPosition(e.clientX, false);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging, handleScrollToPosition]);

  return (
    <div className="min-h-screen w-full bg-[#BD8094] flex flex-col justify-start md:justify-center items-center py-6 px-4 sm:px-8 selection:bg-[#7C515E] selection:text-white">
      <div className="w-full max-w-[1140px] flex flex-col gap-6 sm:gap-8">
        {/* HEADER NAVIGATION BAR */}
        <PrenicheHeader />

        {/* MAIN DASHBOARD GRID LAYOUT */}
        <div className="grid grid-cols-12 gap-5 items-stretch w-full">
          {/* A. LEFT CONTAINER ("Trending On") */}
          <section className="col-span-8 h-full flex flex-col justify-between bg-[#59313D] rounded-[32px] p-6 shadow-lg">
            <div>
              {/* Header Section */}
              <h2 className="text-white text-xl font-bold mb-3 tracking-wide">
                Trending On
              </h2>
              <div className="border-b border-[#7A4955] mb-6 w-full" />

              {/* Horizontal Scroll / Carousel Area */}
              <div
                ref={carouselRef}
                onScroll={handleCarouselScroll}
                className="flex gap-5 overflow-x-auto pb-4 scrollbar-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {sampleTrendingProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={product.href}
                    className="w-[220px] h-[340px] bg-[#7C515E] rounded-[24px] p-3.5 flex flex-col justify-between shadow-md shrink-0 hover:brightness-105 transition-all group cursor-pointer"
                  >
                    {/* Top Section */}
                    <div className="w-full flex flex-col items-center">
                      {/* Top Image Section */}
                      <div className="relative w-full h-[145px] bg-white rounded-[18px] overflow-hidden shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Top-left heart icon badge overlaid on the image */}
                        {!product.hasBakedHeart && (
                          <div className="absolute top-2.5 left-2.5 z-10 flex items-center justify-center">
                            <div className="relative flex items-center justify-center drop-shadow-sm">
                              <Heart className="w-5 h-5 text-white stroke-[2]" />
                              <span className="absolute text-[8px] font-bold text-white select-none">
                                {product.likes}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Product Title (Upper Section) */}
                      <h3 className="mt-3 mb-2 text-center text-white font-semibold text-base line-clamp-1">
                        {product.title}
                      </h3>
                    </div>

                    {/* Divider & Price Section (Bottom Section) */}
                    <div className="mt-auto w-full">
                      <div className="border-t border-white/20 w-full my-2.5" />
                      <p className="text-center text-white font-bold text-lg mb-1">
                        {product.price}
                      </p>
                      <div className="flex items-center justify-center gap-1 text-xs text-white/80 pb-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{product.location}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Scrollbar / Indicator (Interactive & Two-Way Synchronized) */}
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              className="bg-[#7A4955] h-2.5 rounded-full w-full mt-4 relative cursor-pointer select-none touch-none group/track overflow-hidden"
              title="Klik atau geser untuk navigasi produk"
            >
              <div
                className={`bg-white h-full rounded-full cursor-grab active:cursor-grabbing shadow-xs ${
                  isDragging
                    ? "transition-none brightness-95"
                    : "transition-transform duration-100 ease-out group-hover/track:brightness-95"
                }`}
                style={{
                  width: "40%",
                  transform: `translateX(${scrollProgress * 150}%)`,
                }}
              />
            </div>
          </section>

          {/* B. RIGHT SIDEBAR STACK (2 Cards) */}
          <aside className="col-span-4 h-full flex flex-col justify-between gap-4">
            {/* 1. TOP CARD ("Most Liked") */}
            <div className="bg-[#59313D] rounded-[28px] p-5 w-full flex-1 flex flex-col shadow-lg">
              <h2 className="text-white font-bold text-base mb-2">
                Most Liked
              </h2>
              <div className="border-b border-[#7A4955] mb-3 w-full" />
              <Link
                href="/catalog?q=Kipas+Angin"
                className="bg-white rounded-[20px] overflow-hidden relative flex-1 min-h-[140px] mt-1 group block cursor-pointer"
              >
                <img
                  src="/images/kipas-wide-clean.png"
                  alt="Most Liked Kipas Angin"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* 2. BOTTOM CARD ("Popular Searches") */}
            <div className="bg-[#59313D] rounded-[28px] p-5 w-full flex-1 flex flex-col shadow-lg overflow-hidden">
              <h2 className="text-white font-bold text-base mb-2">
                Popular Searches
              </h2>
              <div className="border-b border-[#7A4955] mb-3 w-full" />
              <div className="flex flex-wrap gap-x-2 gap-y-1.5 content-start overflow-hidden">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/catalog?q=${encodeURIComponent(tag.replace("#", ""))}`}
                    className="text-xs font-medium text-white/90 hover:text-white cursor-pointer transition-colors leading-relaxed"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* 3-CARD FEATURE SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6 w-full">
          {/* CARD 1: Kategori Favorit */}
          <div className="bg-[#59313D] rounded-[28px] p-6 shadow-lg text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <Grid className="w-5 h-5 text-[#D8B2BC] shrink-0" />
                <h3 className="font-bold text-lg text-white tracking-wide">
                  Kategori Favorit
                </h3>
              </div>
              <div className="border-b border-[#7A4955] mb-4 w-full" />
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/catalog?category=cat_kost"
                  className="bg-[#7C515E] hover:bg-[#8C5663] rounded-2xl p-3 flex items-center gap-3 cursor-pointer transition-all group"
                >
                  <Package className="w-5 h-5 text-[#D8B2BC] shrink-0 group-hover:scale-105 transition-transform" />
                  <span className="text-sm font-medium text-white">
                    Peralatan Kos (Kasur, Kipas, Meja)
                  </span>
                </Link>
                <Link
                  href="/catalog?category=cat_praktikum"
                  className="bg-[#7C515E] hover:bg-[#8C5663] rounded-2xl p-3 flex items-center gap-3 cursor-pointer transition-all group"
                >
                  <FlaskConical className="w-5 h-5 text-[#D8B2BC] shrink-0 group-hover:scale-105 transition-transform" />
                  <span className="text-sm font-medium text-white">
                    Alat Praktikum &amp; Lab
                  </span>
                </Link>
                <Link
                  href="/catalog?category=cat_buku"
                  className="bg-[#7C515E] hover:bg-[#8C5663] rounded-2xl p-3 flex items-center gap-3 cursor-pointer transition-all group"
                >
                  <BookOpen className="w-5 h-5 text-[#D8B2BC] shrink-0 group-hover:scale-105 transition-transform" />
                  <span className="text-sm font-medium text-white">
                    Buku &amp; Modul Kuliah
                  </span>
                </Link>
                <Link
                  href="/catalog?category=cat_fashion"
                  className="bg-[#7C515E] hover:bg-[#8C5663] rounded-2xl p-3 flex items-center gap-3 cursor-pointer transition-all group"
                >
                  <Shirt className="w-5 h-5 text-[#D8B2BC] shrink-0 group-hover:scale-105 transition-transform" />
                  <span className="text-sm font-medium text-white">
                    Thrift &amp; Fashion
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 2: Lokasi COD Aman */}
          <div className="bg-[#59313D] rounded-[28px] p-6 shadow-lg text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <MapPin className="w-5 h-5 text-[#D8B2BC] shrink-0" />
                <h3 className="font-bold text-lg text-white tracking-wide">
                  Lokasi COD Aman
                </h3>
              </div>
              <div className="border-b border-[#7A4955] mb-4 w-full" />
              <div className="flex flex-col gap-2.5">
                <div className="bg-[#7C515E] rounded-2xl p-3 flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-[#D8B2BC] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      Graha Wiyata
                    </p>
                    <p className="text-xs text-[#F7E7EB]/80 leading-tight mt-0.5">
                      Lantai 1 / Area Depan
                    </p>
                  </div>
                </div>
                <div className="bg-[#7C515E] rounded-2xl p-3 flex items-center gap-3">
                  <Utensils className="w-5 h-5 text-[#D8B2BC] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      Kantin Utama &amp; Plaza Kampus
                    </p>
                    <p className="text-xs text-[#F7E7EB]/80 leading-tight mt-0.5">
                      Area Publik &amp; Terbuka
                    </p>
                  </div>
                </div>
                <div className="bg-[#7C515E] rounded-2xl p-3 flex items-center gap-3">
                  <Library className="w-5 h-5 text-[#D8B2BC] shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      Perpustakaan Pusat
                    </p>
                    <p className="text-xs text-[#F7E7EB]/80 leading-tight mt-0.5">
                      Gedung R. Ing. Soekonjono
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/70 mt-4 pt-3 border-t border-[#7A4955]">
              Selalu pilih lokasi publik untuk transaksi tatap muka.
            </p>
          </div>

          {/* CARD 3: Kenapa Preloved? */}
          <div className="bg-[#59313D] rounded-[28px] p-6 shadow-lg text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <Sparkles className="w-5 h-5 text-[#D8B2BC] shrink-0" />
                <h3 className="font-bold text-lg text-white tracking-wide">
                  Kenapa Preloved?
                </h3>
              </div>
              <div className="border-b border-[#7A4955] mb-4 w-full" />
              <div className="flex flex-col gap-2.5">
                <div className="bg-[#7C515E] rounded-2xl p-3 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-[#D8B2BC] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      Hemat Sampai 70%
                    </p>
                    <p className="text-xs text-[#F7E7EB]/80 leading-tight mt-0.5">
                      Jauh lebih hemat dibanding beli baru di toko
                    </p>
                  </div>
                </div>
                <div className="bg-[#7C515E] rounded-2xl p-3 flex items-start gap-3">
                  <Handshake className="w-5 h-5 text-[#D8B2BC] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      Sesama Anak Untag
                    </p>
                    <p className="text-xs text-[#F7E7EB]/80 leading-tight mt-0.5">
                      Komunikasi &amp; janjian lebih mudah
                    </p>
                  </div>
                </div>
                <div className="bg-[#7C515E] rounded-2xl p-3 flex items-start gap-3">
                  <Recycle className="w-5 h-5 text-[#D8B2BC] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      Ramah Lingkungan
                    </p>
                    <p className="text-xs text-[#F7E7EB]/80 leading-tight mt-0.5">
                      Kurangi sampah barang kos saat lulus atau pindahan
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/catalog"
              className="bg-white/20 hover:bg-white/30 rounded-full py-2 px-4 text-xs font-semibold mt-4 text-center block text-white transition-colors cursor-pointer"
            >
              Pelajari Cara Kerja
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PrenicheHeader } from "@/components/PrenicheHeader";
import { Heart, MapPin } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mockData";

interface CatalogProduct {
  id: string;
  title: string;
  price: string;
  location: string;
  image?: string | null;
  href?: string;
}

// 10 DUMMY PRODUCTS FOR "ATASAN WANITA"
const ATASAN_WANITA_PRODUCTS: CatalogProduct[] = [
  {
    id: "atasan-1",
    title: "Longsleve-Unisex",
    price: "Rp. 65.000",
    location: "Location",
    image: "/images/longsleeve-unisex.jpg",
    href: "/products/prod-1",
  },
  {
    id: "atasan-2",
    title: "Knit Knitwear Stripe",
    price: "Rp. 75.000",
    location: "Location",
    image: "/images/knit-stripe-zip.jpg",
    href: "/products/prod-2",
  },
  {
    id: "atasan-3",
    title: "Crop Top Hoodie",
    price: "Rp. 55.000",
    location: "Location",
    image: null,
    href: "/products/prod-3",
  },
  {
    id: "atasan-4",
    title: "Blouse Casual",
    price: "Rp. 50.000",
    location: "Location",
    image: null,
    href: "/products/prod-4",
  },
  {
    id: "atasan-5",
    title: "Cardigan Oversize",
    price: "Rp. 68.000",
    location: "Location",
    image: null,
    href: "/products/prod-5",
  },
  {
    id: "atasan-6",
    title: "Sweater Crewneck Basic",
    price: "Rp. 60.000",
    location: "Location",
    image: null,
    href: "/products/prod-6",
  },
  {
    id: "atasan-7",
    title: "Kemeja Flanel Vintage",
    price: "Rp. 70.000",
    location: "Location",
    image: null,
    href: "/products/prod-7",
  },
  {
    id: "atasan-8",
    title: "Turtleneck Rib Knit",
    price: "Rp. 58.000",
    location: "Location",
    image: null,
    href: "/products/prod-8",
  },
  {
    id: "atasan-9",
    title: "Outer Blazer Semi Formal",
    price: "Rp. 85.000",
    location: "Location",
    image: null,
    href: "/products/prod-9",
  },
  {
    id: "atasan-10",
    title: "Vest Rajut Korea",
    price: "Rp. 45.000",
    location: "Location",
    image: null,
    href: "/products/prod-10",
  },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Active query text defaults to "Atasan Wanita" matching TV-5 mockup
  const queryParam = searchParams.get("q");
  const activeQuery = queryParam !== null ? queryParam : "Atasan Wanita";

  const [likedItems, setLikedItems] = useState<Set<string>>(new Set(["atasan-1"]));

  // SCROLLBAR STATE & REFS
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 100 %
  const [thumbHeightPercent, setThumbHeightPercent] = useState(38); // proportional thumb height
  const [isDragging, setIsDragging] = useState(false);

  const toggleLike = (id: string) => {
    setLikedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Filter or populate 10 products based on query
  const displayProducts = useMemo(() => {
    const qLower = activeQuery.trim().toLowerCase();

    // If matching Atasan Wanita or default view, return all 10 dummy items
    if (
      !qLower ||
      qLower === "atasan wanita" ||
      qLower.includes("atasan") ||
      qLower.includes("wanita")
    ) {
      return ATASAN_WANITA_PRODUCTS;
    }

    // Try filtering from ATASAN_WANITA_PRODUCTS first
    const matchedAtasan = ATASAN_WANITA_PRODUCTS.filter((item) =>
      item.title.toLowerCase().includes(qLower)
    );
    if (matchedAtasan.length > 0) {
      return matchedAtasan;
    }

    // Fall back to MOCK_PRODUCTS formatted as white cards
    const matchedMock = MOCK_PRODUCTS.filter((item) => {
      return (
        item.title.toLowerCase().includes(qLower) ||
        item.description.toLowerCase().includes(qLower)
      );
    }).map((item) => ({
      id: item.id,
      title: item.title,
      price: `Rp. ${item.price.toLocaleString("id-ID")}`,
      location: item.kostArea?.split(" ")[0] || "Untag",
      image: item.images[0] || null,
      href: `/products/${item.id}`,
    }));

    if (matchedMock.length > 0) {
      return matchedMock.slice(0, 10);
    }

    // Default to atasan products if nothing found
    return ATASAN_WANITA_PRODUCTS;
  }, [activeQuery]);

  // Update thumb height based on grid container metrics
  const updateThumbMetrics = useCallback(() => {
    if (!gridContainerRef.current) return;
    const { clientHeight, scrollHeight } = gridContainerRef.current;
    if (scrollHeight > clientHeight) {
      const ratio = (clientHeight / scrollHeight) * 100;
      setThumbHeightPercent(Math.max(25, Math.min(50, ratio)));
    } else {
      setThumbHeightPercent(40);
    }
  }, []);

  useEffect(() => {
    updateThumbMetrics();
    window.addEventListener("resize", updateThumbMetrics);
    return () => window.removeEventListener("resize", updateThumbMetrics);
  }, [displayProducts, updateThumbMetrics]);

  // 1. Grid Scroll ➔ Scrollbar Thumb Position
  const handleGridScroll = () => {
    if (!gridContainerRef.current) return;
    const container = gridContainerRef.current;
    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll > 0) {
      const progress = (container.scrollTop / maxScroll) * 100;
      setScrollProgress(Math.max(0, Math.min(100, progress)));
    } else {
      setScrollProgress(0);
    }
  };

  // 2. Scrollbar Track Click/Drag ➔ Grid Scroll
  const handleScrollFromPointer = useCallback(
    (clientY: number, smooth = false) => {
      if (!trackRef.current || !gridContainerRef.current) return;
      const trackRect = trackRef.current.getBoundingClientRect();
      const clickY = clientY - trackRect.top;
      const clickRatio = Math.max(0, Math.min(1, clickY / trackRect.height));

      const container = gridContainerRef.current;
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxScroll > 0) {
        const thumbFraction = thumbHeightPercent / 100;
        // Offset so thumb is centered around cursor
        const scrollRatio = Math.max(
          0,
          Math.min(1, (clickRatio - thumbFraction / 2) / (1 - thumbFraction))
        );
        const targetScroll = scrollRatio * maxScroll;

        container.scrollTo({
          top: targetScroll,
          behavior: smooth ? "smooth" : "auto",
        });
        setScrollProgress(scrollRatio * 100);
      }
    },
    [thumbHeightPercent]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    handleScrollFromPointer(e.clientY, false);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      handleScrollFromPointer(e.clientY, false);
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
  }, [isDragging, handleScrollFromPointer]);

  // Available space for the thumb's top offset
  const availableTrackSpace = 100 - thumbHeightPercent;
  const thumbTopOffset = (scrollProgress / 100) * availableTrackSpace;

  return (
    <div className="h-screen w-full bg-[#B67B8A] flex flex-col justify-start overflow-hidden selection:bg-[#7C515E] selection:text-white">
      {/* Top Header Navigation matching TV-5 */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 shrink-0">
        <PrenicheHeader initialQuery={activeQuery} />
      </div>

      {/* Main Container with Grid & Synchronized Vertical Scrollbar Track */}
      <main className="w-full max-w-7xl mx-auto px-8 py-4 sm:py-6 relative flex-1 flex items-stretch gap-4 min-h-0">
        {/* 1. SCROLLABLE PRODUCT GRID WRAPPER WITH HIDDEN NATIVE SCROLLBAR */}
        <div
          ref={gridContainerRef}
          onScroll={handleGridScroll}
          className="flex-1 max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-none relative pr-1.5 focus:outline-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          tabIndex={0}
        >
          {/* 5-Column Product Grid (2 columns on mobile, 5 columns on desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pb-6">
            {displayProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  if (product.href) router.push(product.href);
                }}
                className="bg-white rounded-[20px] p-3 shadow-md flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
              >
                {/* Image Area (Top) */}
                <div className="relative w-full h-[180px] bg-[#D9D9D9] rounded-[16px] overflow-hidden flex items-center justify-center">
                  {/* Floating Heart Badge */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(product.id);
                    }}
                    aria-label="Sukai produk"
                    className="absolute top-2.5 left-2.5 text-gray-700 bg-white/70 hover:bg-white/95 p-1 rounded-full text-xs shadow-xs transition-colors z-10"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        likedItems.has(product.id)
                          ? "fill-[#1A0B10] text-[#1A0B10]"
                          : "text-gray-700 hover:text-[#1A0B10]"
                      }`}
                    />
                  </button>

                  {/* Product Image or Clean Gray Placeholder */}
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#D9D9D9]" />
                  )}
                </div>

                {/* Product Details Section (Bottom) */}
                <div className="flex flex-col">
                  {/* Product Title */}
                  <h3 className="font-bold text-sm text-[#1A0B10] mt-2.5 line-clamp-1">
                    {product.title}
                  </h3>

                  {/* Price Text */}
                  <p className="font-extrabold text-sm text-[#1A0B10] mt-1 mb-1">
                    {product.price}
                  </p>

                  {/* Location Indicator */}
                  <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                    <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CUSTOM VERTICAL SCROLLBAR TRACK & SYNCHRONIZED WHITE THUMB */}
        <div className="hidden md:flex flex-col items-center shrink-0 select-none max-h-[calc(100vh-160px)] h-full py-1">
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            className="w-2 bg-black/10 rounded-full h-full relative cursor-pointer select-none touch-none group/track"
            title="Klik atau geser untuk scroll katalog"
          >
            {/* White Scrollbar Thumb */}
            <div
              style={{
                top: `${thumbTopOffset}%`,
                height: `${thumbHeightPercent}%`,
              }}
              className={`w-full bg-white rounded-full cursor-pointer hover:bg-white/90 shadow-xs absolute ${
                isDragging ? "transition-none" : "transition-all duration-75"
              }`}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full bg-[#B67B8A] flex items-center justify-center text-white/80 font-medium text-sm">
          Memuat hasil pencarian...
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}

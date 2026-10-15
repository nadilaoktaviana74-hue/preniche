"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, PlusCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface PrenicheHeaderProps {
  initialQuery?: string;
  onSearchChange?: (query: string) => void;
  sellButtonText?: string;
  className?: string;
}

export const PrenicheHeader: React.FC<PrenicheHeaderProps> = ({
  initialQuery = "",
  onSearchChange,
  sellButtonText = "Sell Product",
  className = "",
}) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  React.useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  // PROTECTED NAVIGATION HANDLER
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearchChange?.(val);
  };

  return (
    <header className={`flex items-center justify-between px-2 sm:px-6 py-2 w-full gap-4 ${className}`}>
      {/* Left: Preniche Logo */}
      <Link
        href="/"
        className="font-serif text-3xl font-bold text-[#1A0B10] tracking-tight hover:opacity-90 transition-opacity shrink-0 select-none"
      >
        Preniche
      </Link>

      {/* Center: Capsule search bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="rounded-full bg-[#BA8290]/40 border border-[#A26C7A] px-5 py-2.5 w-full max-w-[500px] flex items-center gap-3 backdrop-blur-xs shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)] focus-within:border-white/70 focus-within:bg-[#BA8290]/60 transition-all"
      >
        <Search className="w-5 h-5 text-[#2C151D] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Cari produk preloved..."
          className="bg-transparent text-[#1A0B10] placeholder:text-[#59313D]/70 text-sm w-full outline-none font-medium"
        />
      </form>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 sm:gap-5 shrink-0">
        {/* Action Button: [+] Sell Product */}
        <button
          type="button"
          onClick={() => handleProtectedNavigation("/sell")}
          className="rounded-full bg-[#7D4D5B] text-white px-5 py-2.5 flex items-center gap-2 text-sm font-semibold shadow-md hover:bg-[#6D3E4C] active:scale-95 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-white" />
          <span>{sellButtonText}</span>
        </button>

        {/* Shopping Cart Icon */}
        <button
          type="button"
          onClick={() => handleProtectedNavigation("/cart")}
          aria-label="Keranjang Belanja"
          className="text-[#1A0B10] hover:text-[#59313D] transition-colors p-1 cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6 stroke-[2]" />
        </button>

        {/* User Profile Icon */}
        <button
          type="button"
          onClick={() => handleProtectedNavigation("/profile")}
          aria-label="Profil Akun"
          className="text-[#1A0B10] hover:text-[#59313D] transition-colors p-1 cursor-pointer"
        >
          <User className="w-6 h-6 stroke-[2]" />
        </button>
      </div>
    </header>
  );
};

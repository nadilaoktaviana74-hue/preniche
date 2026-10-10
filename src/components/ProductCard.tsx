import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductItem } from "@/types";
import { formatRupiah, getConditionLabel, getTransactionTypeBadge } from "@/lib/utils";
import { CampusBadge } from "./CampusBadge";
import { Star, MapPin, CheckCircle2, Bookmark, BookMarked } from "lucide-react";

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const condition = getConditionLabel(product.condition);
  const typeBadge = getTransactionTypeBadge(product.transactionType, product.rentalPeriod);
  
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-brand-500/40 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Thumbnail Container */}
      <Link href={`/products/${product.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 block">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
            No image
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          <span className={`text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider ${typeBadge.color}`}>
            {typeBadge.label}
          </span>
          {product.status === "RESERVED" && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-sm">
              Janji COD (Reserved)
            </span>
          )}
        </div>

        {/* Condition Tag */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border backdrop-blur-md bg-white/90 ${condition.color}`}>
            {condition.label}
          </span>
        </div>

        {/* Discount badge if saving compared to new item */}
        {discountPercent && discountPercent > 0 && product.transactionType === "FOR_SALE" && (
          <div className="absolute bottom-2.5 right-2.5 z-10 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            Hemat {discountPercent}%
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Campus and Location */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <CampusBadge campusName={product.campusName} size="sm" />
            <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="truncate max-w-[100px]">{product.kostArea}</span>
            </span>
          </div>

          {/* Academic Course Badge (if textbook/diktat) */}
          {product.courseCode && (
            <div className="mb-2 inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
              <BookMarked className="w-3 h-3 shrink-0" />
              <span className="truncate">
                {product.courseCode} {product.courseName ? `• ${product.courseName}` : ""}
              </span>
            </div>
          )}

          {/* Title */}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 text-sm leading-snug mb-2">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price and Seller Info */}
        <div className="pt-3 border-t border-slate-100 mt-2">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-slate-900">
              {formatRupiah(product.price)}
            </span>
            {product.rentalPeriod && (
              <span className="text-xs text-slate-500 font-normal">
                /{product.rentalPeriod === "DAILY" ? "hari" : product.rentalPeriod === "MONTHLY" ? "bulan" : "sem"}
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Seller info */}
          <div className="flex items-center justify-between text-xs text-slate-500 gap-1.5 pt-1">
            <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
              <div className="relative w-5 h-5 rounded-full overflow-hidden bg-slate-200 shrink-0">
                <Image
                  src={product.seller.avatarUrl}
                  alt={product.seller.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="truncate text-slate-700 font-medium max-w-[85px]">
                {product.seller.name.split(" ")[0]}
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-700 font-medium shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{product.seller.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

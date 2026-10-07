import React from "react";
import { GraduationCap } from "lucide-react";

interface CampusBadgeProps {
  campusName?: string;
  size?: "sm" | "md";
  showIcon?: boolean;
}

export const CampusBadge: React.FC<CampusBadgeProps> = ({
  size = "md",
  showIcon = true,
}) => {
  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2 py-0.5"
      : "text-xs px-2.5 py-1 font-semibold";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border bg-red-50 text-red-800 border-red-200 font-medium shadow-2xs ${sizeClasses}`}
      title="Universitas 17 Agustus 1945 Surabaya"
    >
      {showIcon && <GraduationCap className="w-3.5 h-3.5 text-red-600 shrink-0" />}
      <span>Untag Surabaya</span>
    </span>
  );
};

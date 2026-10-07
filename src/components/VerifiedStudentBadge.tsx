import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface VerifiedStudentBadgeProps {
  size?: "xs" | "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
  campusEmail?: string;
}

export const VerifiedStudentBadge: React.FC<VerifiedStudentBadgeProps> = ({
  size = "sm",
  showIcon = true,
  className = "",
  campusEmail,
}) => {
  const badgeTitle = campusEmail
    ? `Mahasiswa Untag Terverifikasi (${campusEmail})`
    : "Mahasiswa Untag Terverifikasi (Email Resmi Untag Surabaya)";

  if (size === "xs") {
    return (
      <span
        title={badgeTitle}
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-red-50 text-red-800 border border-red-200 tracking-tight shrink-0 ${className}`}
      >
        {showIcon && <ShieldCheck className="w-2.5 h-2.5 text-red-600 shrink-0" />}
        <span>Untag Terverifikasi</span>
      </span>
    );
  }

  if (size === "sm") {
    return (
      <span
        title={badgeTitle}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-800 border border-red-200 shadow-xs shrink-0 ${className}`}
      >
        {showIcon && <ShieldCheck className="w-3 h-3 text-red-600 shrink-0" />}
        <span>Mahasiswa Untag Terverifikasi</span>
      </span>
    );
  }

  if (size === "lg") {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-50 via-rose-50 to-red-100/60 text-red-900 border border-red-200/90 font-bold text-xs sm:text-sm shadow-xs ${className}`}
      >
        {showIcon && <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />}
        <span>Mahasiswa Untag Terverifikasi</span>
        {campusEmail && (
          <span className="text-[11px] font-mono font-medium text-red-800 bg-white px-2 py-0.5 rounded-md border border-red-200">
            {campusEmail}
          </span>
        )}
      </div>
    );
  }

  // size === "md" (default)
  return (
    <span
      title={badgeTitle}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-800 border border-red-200 shadow-xs shrink-0 ${className}`}
    >
      {showIcon && <ShieldCheck className="w-3.5 h-3.5 text-red-600 shrink-0" />}
      <span>Mahasiswa Untag Terverifikasi</span>
    </span>
  );
};

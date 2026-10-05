import React from "react";
import { getCampusColor } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

interface CampusBadgeProps {
  campusName: string;
  size?: "sm" | "md";
  showIcon?: boolean;
}

export const CampusBadge: React.FC<CampusBadgeProps> = ({
  campusName,
  size = "md",
  showIcon = true,
}) => {
  const color = getCampusColor(campusName);
  
  // Format short name if lengthy
  let displayName = campusName;
  if (campusName.includes("(")) {
    const matches = campusName.match(/\(([^)]+)\)/);
    if (matches && matches[1]) {
      displayName = matches[1];
    }
  }

  const sizeClasses =
    size === "sm"
      ? "text-xs px-2 py-0.5"
      : "text-xs px-2.5 py-1 font-medium";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${color.bg} ${color.text} ${color.border} ${sizeClasses}`}
      title={campusName}
    >
      {showIcon && <GraduationCap className="w-3.5 h-3.5 shrink-0" />}
      <span className="truncate max-w-[130px]">{displayName}</span>
    </span>
  );
};

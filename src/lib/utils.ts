import { ItemCondition, TransactionType } from "@/types";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatRupiah(amount: number): string {
  if (amount === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getConditionLabel(condition: ItemCondition): { label: string; color: string; desc: string } {
  switch (condition) {
    case "NEW":
      return {
        label: "Baru",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        desc: "Belum pernah digunakan sama sekali",
      };
    case "LIKE_NEW":
      return {
        label: "Bekas - Sangat Baik",
        color: "bg-teal-50 text-teal-700 border-teal-200",
        desc: "Mulus 95%+, fungsi normal tanpa cacat",
      };
    case "LIGHTLY_USED":
      return {
        label: "Bekas - Baik",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        desc: "Pemakaian wajar, performa 100% normal",
      };
    case "WELL_USED":
      return {
        label: "Bekas - Layak",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        desc: "Ada goresan/tanda pakai, fungsi utama aktif",
      };
    default:
      return {
        label: condition,
        color: "bg-slate-50 text-slate-700 border-slate-200",
        desc: "",
      };
  }
}

export function getTransactionTypeBadge(type: TransactionType, rentalPeriod?: string) {
  switch (type) {
    case "FREE":
      return {
        label: "Hibah / Gratis",
        color: "bg-emerald-600 text-white font-semibold",
      };
    case "FOR_RENT":
      return {
        label: rentalPeriod ? `Sewa (${rentalPeriod === 'DAILY' ? 'Hari' : rentalPeriod === 'MONTHLY' ? 'Bulan' : 'Semester'})` : "Disewakan",
        color: "bg-amber-500 text-white font-semibold",
      };
    case "FOR_SALE":
    default:
      return {
        label: "Dijual",
        color: "bg-slate-900 text-white font-medium",
      };
  }
}

export function getCampusColor(campusName: string): { bg: string; text: string; border: string } {
  const normalized = campusName.toLowerCase();
  if (normalized.includes("itb")) {
    return { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" };
  }
  if (normalized.includes("ui") || normalized.includes("indonesia")) {
    return { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-300" };
  }
  if (normalized.includes("ugm") || normalized.includes("gadjah mada")) {
    return { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" };
  }
  if (normalized.includes("its") || normalized.includes("sepuluh")) {
    return { bg: "bg-cyan-50", text: "text-cyan-800", border: "border-cyan-200" };
  }
  if (normalized.includes("undip") || normalized.includes("diponegoro")) {
    return { bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-200" };
  }
  if (normalized.includes("unair") || normalized.includes("airlangga")) {
    return { bg: "bg-sky-50", text: "text-sky-800", border: "border-sky-200" };
  }
  return { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" };
}

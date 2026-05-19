import type { Category } from "@/types";

export const CAT_LABELS: Record<Category, string> = {
  drink: "🥤 เครื่องดื่ม",
  snack: "🍫 ขนม",
  food: "🍱 อาหาร",
  other: "📦 อื่นๆ",
};

export const CAT_COLORS: Record<Category, string> = {
  drink: "#4a6cf7",
  snack: "#f7a800",
  food: "#00c896",
  other: "#9b59b6",
};

export const CAT_BADGE_CLASS: Record<Category, string> = {
  drink: "bg-[#e6f4ff] text-[#1565c0]",
  snack: "bg-[#fff3e0] text-[#bf6c00]",
  food: "bg-[#e8f5e9] text-[#2e7d32]",
  other: "bg-[#f3e5f5] text-[#7b1fa2]",
};

export const MONTHS_TH = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

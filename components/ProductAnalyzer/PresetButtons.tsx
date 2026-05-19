"use client";

import { PRESETS, type PresetKey } from "@/constants/presets";
import type { Product } from "@/types";
import { makeProduct } from "@/lib/calculations";

interface Props {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
  onExportToROI: () => void;
}

const PRESET_DEFS: { key: PresetKey; label: string }[] = [
  { key: "snack", label: "🍫 ขนม/เครื่องดื่ม" },
  { key: "coffee", label: "☕ กาแฟ" },
  { key: "fresh", label: "🥗 อาหารสด" },
  { key: "mixed", label: "🛒 สินค้ารวม" },
];

export function PresetButtons({
  products,
  onProductsChange,
  onExportToROI,
}: Props) {
  function loadPreset(key: PresetKey) {
    const next = [...products];
    PRESETS[key].forEach((p) => {
      if (!next.find((ex) => ex.name === p.name)) {
        next.push(makeProduct(p.name, p.cat, p.price, p.cost, p.qty));
      }
    });
    onProductsChange(next);
  }

  function clearAll() {
    if (products.length === 0) return;
    if (confirm(`ลบสินค้าทั้งหมด ${products.length} รายการ?`)) {
      onProductsChange([]);
    }
  }

  return (
    <>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {PRESET_DEFS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => loadPreset(p.key)}
            className="flex items-center gap-1 rounded-full border-[1.5px] border-border bg-surface px-3 py-1 text-[11px] font-semibold transition-colors hover:border-accent hover:bg-[#e6faf4] hover:text-accent"
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={clearAll}
          className="rounded-lg border-[1.5px] border-border bg-surface px-3.5 py-1.5 text-[12px] font-semibold transition-colors hover:border-danger hover:text-danger"
        >
          🗑 ล้างทั้งหมด
        </button>
        <button
          type="button"
          onClick={onExportToROI}
          className="rounded-lg border-[1.5px] border-border bg-surface px-3.5 py-1.5 text-[12px] font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          🔄 ส่งข้อมูลไป ROI
        </button>
      </div>
    </>
  );
}

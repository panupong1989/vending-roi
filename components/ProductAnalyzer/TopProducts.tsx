"use client";

import { CAT_COLORS, CAT_LABELS } from "@/constants/categories";
import { fmtFull } from "@/lib/calculations";
import type { Product } from "@/types";

interface Props {
  products: Product[];
}

const RANK_COLOR = ["#f7a800", "#8590a2", "#cd7f32", "#8590a2", "#8590a2"];

export function TopProducts({ products }: Props) {
  const top = [...products]
    .sort((a, b) => b.monthlyRev - a.monthlyRev)
    .slice(0, 5);

  if (top.length === 0) {
    return (
      <div className="rounded-lg bg-surface px-5 py-5 text-center text-[12px] text-muted">
        เพิ่มสินค้าเพื่อดู Top 5
      </div>
    );
  }

  const maxRev = top[0].monthlyRev;

  return (
    <div className="flex flex-col gap-3">
      {top.map((p, i) => {
        const pct = maxRev > 0 ? (p.monthlyRev / maxRev) * 100 : 0;
        const mCls =
          p.margin >= 40
            ? "bg-[#e6faf4] text-[#00a07a]"
            : p.margin >= 20
              ? "bg-[#fff8e6] text-[#b86a00]"
              : "bg-[#fdecea] text-[#c0392b]";
        return (
          <div key={i}>
            <div className="mb-1 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="font-prompt text-[16px] font-bold leading-none"
                  style={{ color: RANK_COLOR[i] }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-muted">
                    {CAT_LABELS[p.cat]} · {p.qty} ชิ้น/วัน
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-bold text-accent">
                  ฿{fmtFull(p.monthlyRev)}
                </div>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${mCls}`}
                >
                  {p.margin.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="h-1.5 overflow-hidden rounded bg-border">
              <div
                className="h-full rounded transition-[width] duration-500"
                style={{
                  width: `${pct}%`,
                  background: CAT_COLORS[p.cat],
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

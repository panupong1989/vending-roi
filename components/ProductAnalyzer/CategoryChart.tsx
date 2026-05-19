"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CAT_COLORS, CAT_LABELS } from "@/constants/categories";
import { fmtFull } from "@/lib/calculations";
import type { Category, Product } from "@/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  products: Product[];
}

interface CatRow {
  key: Category;
  rev: number;
  count: number;
  avgMargin: number;
}

export function CategoryChart({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg bg-surface px-5 py-5 text-center text-[12px] text-muted">
        เพิ่มสินค้าเพื่อดูการวิเคราะห์
      </div>
    );
  }

  const map = new Map<Category, { rev: number; margin: number; count: number }>();
  products.forEach((p) => {
    const cur = map.get(p.cat) ?? { rev: 0, margin: 0, count: 0 };
    cur.rev += p.monthlyRev;
    cur.margin += p.margin;
    cur.count += 1;
    map.set(p.cat, cur);
  });
  const totalRev = products.reduce((s, p) => s + p.monthlyRev, 0);

  const rows: CatRow[] = Array.from(map.entries())
    .map(([key, v]) => ({
      key,
      rev: v.rev,
      count: v.count,
      avgMargin: v.margin / v.count,
    }))
    .sort((a, b) => b.rev - a.rev);

  const data = {
    labels: rows.map((r) => CAT_LABELS[r.key]),
    datasets: [
      {
        data: rows.map((r) => r.rev),
        backgroundColor: rows.map((r) => CAT_COLORS[r.key]),
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <div>
      <div className="relative mb-3 h-[190px]">
        <Doughnut
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  font: { size: 10, family: "Sarabun" },
                  boxWidth: 8,
                  padding: 5,
                  color: "#8590a2",
                },
              },
            },
            cutout: "60%",
          }}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        {rows.map((r) => {
          const pct = totalRev > 0 ? Math.round((r.rev / totalRev) * 100) : 0;
          const mCls =
            r.avgMargin >= 40
              ? "bg-[#e6faf4] text-[#00a07a]"
              : r.avgMargin >= 20
                ? "bg-[#fff8e6] text-[#b86a00]"
                : "bg-[#fdecea] text-[#c0392b]";
          return (
            <div
              key={r.key}
              className="flex items-center gap-2.5 rounded-lg bg-surface px-3 py-2"
            >
              <div
                className="h-8 w-1 rounded"
                style={{ background: CAT_COLORS[r.key] }}
              />
              <div className="flex-1">
                <div className="text-[12px] font-semibold">
                  {CAT_LABELS[r.key]}
                </div>
                <div className="text-[10px] text-muted">
                  {r.count} รายการ · {pct}% ของรายได้
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${mCls}`}
              >
                {r.avgMargin.toFixed(1)}%
              </span>
              <div className="text-[13px] font-bold text-accent">
                ฿{fmtFull(r.rev)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

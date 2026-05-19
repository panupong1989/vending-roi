"use client";

import { fmtFull } from "@/lib/calculations";
import {
  CAT_BADGE_CLASS,
  CAT_LABELS,
} from "@/constants/categories";
import type { Product } from "@/types";

interface Props {
  products: Product[];
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
}

function marginPill(m: number): string {
  if (m >= 40) return "bg-[#e6faf4] text-[#00a07a]";
  if (m >= 20) return "bg-[#fff8e6] text-[#b86a00]";
  return "bg-[#fdecea] text-[#c0392b]";
}

export function ProductList({ products, onEdit, onDelete }: Props) {
  if (products.length === 0) {
    return (
      <div className="px-5 py-10 text-center text-muted">
        <div className="mb-3 text-4xl opacity-40">📦</div>
        <p className="text-[13px]">
          ยังไม่มีสินค้า
          <br />
          เพิ่มสินค้าหรือโหลดตัวอย่าง
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            <Th>สินค้า</Th>
            <Th>หมวด</Th>
            <Th align="right">ราคาขาย</Th>
            <Th align="right">ต้นทุน</Th>
            <Th align="right">Margin</Th>
            <Th align="right">ขาย/วัน</Th>
            <Th align="right">รายได้/เดือน</Th>
            <Th>{""}</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="hover:bg-[#fafbfd]">
              <Td>
                <strong>{p.name}</strong>
              </Td>
              <Td>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${CAT_BADGE_CLASS[p.cat]}`}
                >
                  {CAT_LABELS[p.cat]}
                </span>
              </Td>
              <Td align="right">฿{p.price}</Td>
              <Td align="right">฿{p.cost}</Td>
              <Td align="right">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${marginPill(p.margin)}`}
                >
                  {p.margin.toFixed(1)}%
                </span>
              </Td>
              <Td align="right">{p.qty}</Td>
              <Td align="right" cls="text-accent">
                ฿{fmtFull(p.monthlyRev)}
              </Td>
              <Td>
                <div className="flex gap-1 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onEdit(i)}
                    aria-label="แก้ไข"
                    className="rounded-md px-1.5 py-1 text-muted hover:bg-[#e8eef9] hover:text-info"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(i)}
                    aria-label="ลบ"
                    className="rounded-md px-1.5 py-1 text-muted hover:bg-[#fdecea] hover:text-danger"
                  >
                    🗑
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`bg-surface px-3.5 py-2.5 text-${align} text-[10px] font-semibold uppercase tracking-wide text-muted`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "left",
  cls = "",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  cls?: string;
}) {
  return (
    <td
      className={`border-t border-border px-3.5 py-2.5 align-middle text-${align} ${align === "right" ? "font-medium" : ""} ${cls}`}
    >
      {children}
    </td>
  );
}

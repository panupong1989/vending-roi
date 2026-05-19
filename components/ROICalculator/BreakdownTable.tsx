"use client";

import { fmtFull } from "@/lib/calculations";
import type { MonthlyRow } from "@/types";

interface Props {
  rows: MonthlyRow[];
}

export function BreakdownTable({ rows }: Props) {
  const totals = rows.reduce(
    (acc, r) => ({
      revenue: acc.revenue + r.revenue,
      cogs: acc.cogs + r.cogs,
      expense: acc.expense + r.expense,
      ebt: acc.ebt + r.ebt,
      tax: acc.tax + r.tax,
      netProfit: acc.netProfit + r.netProfit,
    }),
    { revenue: 0, cogs: 0, expense: 0, ebt: 0, tax: 0, netProfit: 0 }
  );
  const finalCum = rows.length ? rows[rows.length - 1].cumCF : 0;

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr>
            <Th>เดือน</Th>
            <Th align="right">รายได้</Th>
            <Th align="right">COGS</Th>
            <Th align="right">ค่าใช้จ่าย</Th>
            <Th align="right">EBT</Th>
            <Th align="right">ภาษี</Th>
            <Th align="right">กำไรสุทธิ</Th>
            <Th align="right">CF สะสม</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-surface">
              <Td>
                <strong>{r.month}</strong>
              </Td>
              <Td align="right" cls="text-accent">
                ฿{fmtFull(r.revenue)}
              </Td>
              <Td align="right" cls="text-danger">
                ฿{fmtFull(r.cogs)}
              </Td>
              <Td align="right" cls="text-danger">
                ฿{fmtFull(r.expense)}
              </Td>
              <Td
                align="right"
                cls={r.ebt >= 0 ? "text-accent" : "text-danger"}
              >
                ฿{fmtFull(r.ebt)}
              </Td>
              <Td align="right" cls="text-danger">
                ฿{fmtFull(r.tax)}
              </Td>
              <Td
                align="right"
                cls={r.netProfit >= 0 ? "text-accent" : "text-danger"}
              >
                ฿{fmtFull(r.netProfit)}
              </Td>
              <Td
                align="right"
                cls={r.cumCF >= 0 ? "text-accent" : "text-danger"}
              >
                ฿{fmtFull(r.cumCF)}
              </Td>
            </tr>
          ))}
          <tr className="bg-primary font-bold text-white">
            <td className="px-3 py-2.5">รวม 12 เดือน</td>
            <td className="px-3 py-2.5 text-right">
              ฿{fmtFull(totals.revenue)}
            </td>
            <td className="px-3 py-2.5 text-right">฿{fmtFull(totals.cogs)}</td>
            <td className="px-3 py-2.5 text-right">
              ฿{fmtFull(totals.expense)}
            </td>
            <td className="px-3 py-2.5 text-right">฿{fmtFull(totals.ebt)}</td>
            <td className="px-3 py-2.5 text-right">฿{fmtFull(totals.tax)}</td>
            <td className="px-3 py-2.5 text-right">
              ฿{fmtFull(totals.netProfit)}
            </td>
            <td className="px-3 py-2.5 text-right">฿{fmtFull(finalCum)}</td>
          </tr>
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
      className={`bg-surface px-3 py-2.5 text-${align} text-[10px] font-semibold uppercase tracking-wide text-muted`}
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
      className={`border-t border-border px-3 py-2.5 text-${align} font-medium ${cls}`}
    >
      {children}
    </td>
  );
}

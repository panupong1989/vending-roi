"use client";

import { fmtFull } from "@/lib/calculations";
import type { ROIResult } from "@/types";

interface Props {
  result: ROIResult;
  taxRate: number;
}

export function ProfitRows({ result, taxRate }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <Row
        kind="income"
        label="📈 รายได้รวม"
        value={`฿${fmtFull(result.monthlyRevenue)}`}
      />
      <Row
        kind="expense"
        label="🛒 ต้นทุนสินค้า (COGS)"
        value={`-฿${fmtFull(result.cogs)}`}
      />
      <Row
        kind="expense"
        label="📄 ค่าใช้จ่ายดำเนินงาน"
        value={`-฿${fmtFull(result.monthlyExpense)}`}
      />
      <Row
        kind="expense"
        label={`🧾 ภาษี (${taxRate}%)`}
        value={`-฿${fmtFull(result.tax)}`}
      />
      <Row
        kind="net"
        label="💼 กำไรสุทธิ/เดือน"
        value={`฿${fmtFull(result.netProfit)}`}
      />
    </div>
  );
}

function Row({
  kind,
  label,
  value,
}: {
  kind: "income" | "expense" | "net";
  label: string;
  value: string;
}) {
  const styles: Record<string, { box: string; lbl: string; val: string }> = {
    income: {
      box: "bg-[#f0fdf8]",
      lbl: "text-muted",
      val: "text-accent",
    },
    expense: {
      box: "bg-[#fef9f0]",
      lbl: "text-muted",
      val: "text-accent2",
    },
    net: {
      box: "bg-primary",
      lbl: "text-white/60",
      val: "text-white",
    },
  };
  const s = styles[kind];
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-3 py-2 ${s.box}`}
    >
      <span className={`text-[12px] ${s.lbl}`}>{label}</span>
      <span className={`text-[13px] font-bold ${s.val}`}>{value}</span>
    </div>
  );
}

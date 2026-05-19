"use client";

import { fmt } from "@/lib/calculations";
import type { ROIResult } from "@/types";

interface Props {
  result: ROIResult;
}

function paybackText(months: number): { value: string; sub: string } {
  if (!isFinite(months)) {
    return { value: "∞", sub: "ขาดทุน" };
  }
  if (months < 12) {
    return {
      value: `${Math.ceil(months)} เดือน`,
      sub: "🚀 เร็วมาก",
    };
  }
  const y = Math.floor(months / 12);
  const m = Math.ceil(months % 12);
  return {
    value: `${y} ปี ${m} ด.`,
    sub: months < 24 ? "✅ อยู่ในเกณฑ์ดี" : "⚠️ นานกว่าเกณฑ์",
  };
}

function roiSub(roi: number): string {
  if (roi >= 15) return "🟢 ผลตอบแทนดีมาก";
  if (roi >= 8) return "🟡 ปานกลาง";
  return "🔴 ต่ำกว่าเกณฑ์";
}

export function KPICards({ result }: Props) {
  const pb = paybackText(result.paybackMonths);
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <KpiCard
        accent="bg-accent"
        valueColor="text-accent"
        label="ROI ต่อปี"
        value={`${result.annualROI.toFixed(1)}%`}
        sub={roiSub(result.annualROI)}
        icon="📈"
      />
      <KpiCard
        accent="bg-accent2"
        valueColor="text-accent2"
        label="คืนทุนภายใน"
        value={pb.value}
        sub={pb.sub}
        icon="📅"
      />
      <KpiCard
        accent="bg-info"
        valueColor="text-info"
        label="กำไรสุทธิ/เดือน"
        value={`${result.netProfit < 0 ? "- " : ""}฿${fmt(
          Math.abs(result.netProfit)
        )}`}
        sub={`ต่อปี ฿${fmt(result.netProfit * 12)}`}
        icon="💰"
      />
      <KpiCard
        accent="bg-danger"
        valueColor="text-danger"
        label="Break-even/วัน"
        value={`฿${fmt(result.beDaily)}`}
        sub="ยอดขายขั้นต่ำ/ตู้"
        icon="⚠️"
      />
    </div>
  );
}

interface KpiCardProps {
  accent: string;
  valueColor: string;
  label: string;
  value: string;
  sub: string;
  icon: string;
}

function KpiCard({ accent, valueColor, label, value, sub, icon }: KpiCardProps) {
  return (
    <div className="relative overflow-hidden rounded-card border border-border bg-card px-3.5 py-3.5 shadow-card">
      <div className={`absolute inset-x-0 top-0 h-[3px] ${accent}`} />
      <div className="text-[10px] font-medium text-muted">{label}</div>
      <div
        className={`mt-1 font-prompt text-[18px] font-bold leading-none md:text-[20px] ${valueColor}`}
      >
        {value}
      </div>
      <div className="mt-1 text-[10px] text-muted">{sub}</div>
      <div className="absolute right-3 top-3 text-xl opacity-10">{icon}</div>
    </div>
  );
}

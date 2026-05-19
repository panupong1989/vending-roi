"use client";

import { fmtFull } from "@/lib/calculations";
import type { ScenarioResult } from "@/types";

interface Props {
  scenarios: ScenarioResult[];
}

const BADGE_STYLE: Record<ScenarioResult["key"], string> = {
  best: "bg-[#e6faf4] text-[#00a07a]",
  base: "bg-[#e8eef9] text-[#3a5bd9]",
  worst: "bg-[#fdecea] text-[#c0392b]",
};

const BORDER_STYLE: Record<ScenarioResult["key"], string> = {
  best: "border-accent",
  base: "border-border",
  worst: "border-danger",
};

const ROI_COLOR: Record<ScenarioResult["key"], string> = {
  best: "text-accent",
  base: "text-info",
  worst: "text-danger",
};

export function ScenarioCards({ scenarios }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {scenarios.map((s) => {
        const pb = isFinite(s.paybackMonths)
          ? `${s.paybackMonths.toFixed(1)} เดือน`
          : "∞";
        return (
          <div
            key={s.key}
            className={`rounded-xl border-2 bg-surface p-3.5 text-center transition-all hover:-translate-y-0.5 hover:shadow-card ${BORDER_STYLE[s.key]}`}
          >
            <span
              className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${BADGE_STYLE[s.key]}`}
            >
              {s.label}
            </span>
            <div className="mb-2 text-[12px] font-semibold text-muted">
              {s.name}
            </div>
            <div
              className={`font-prompt text-[24px] font-bold leading-none md:text-[26px] ${ROI_COLOR[s.key]}`}
            >
              {s.roi.toFixed(1)}%
            </div>
            <div className="mt-2 text-[10px] leading-relaxed text-muted">
              รายได้/เดือน: ฿{fmtFull(s.revenue)}
              <br />
              กำไรสุทธิ: ฿{fmtFull(s.netProfit)}
              <br />
              คืนทุน: {pb}
            </div>
          </div>
        );
      })}
    </div>
  );
}

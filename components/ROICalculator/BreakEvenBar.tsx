"use client";

interface Props {
  paybackMonths: number;
}

export function BreakEvenBar({ paybackMonths }: Props) {
  const finite = isFinite(paybackMonths);
  const pct =
    finite && paybackMonths <= 36 ? Math.min(100, (1 / paybackMonths) * 100) : 5;
  const label = finite ? `${Math.ceil(paybackMonths)}ด.` : "";
  const endLabel = finite
    ? `${Math.ceil(paybackMonths)} เดือน`
    : "> 36 เดือน";

  return (
    <div>
      <div className="my-2 h-6 overflow-hidden rounded-full bg-border">
        <div
          className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-accent to-accent-dark pr-2 transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        >
          <span className="text-[10px] font-bold text-white">{label}</span>
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-muted">
        <span>เดือนที่ 1</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}

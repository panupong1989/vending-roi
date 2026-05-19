"use client";

import type { ROIInput } from "@/types";

interface Props {
  input: ROIInput;
  onChange: (patch: Partial<ROIInput>) => void;
}

interface NumFieldProps {
  label: string;
  value: number;
  unit: string;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
}

function NumField({ label, value, unit, min, max, onChange }: NumFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-medium text-muted">{label}</label>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          onChange={(e) => onChange(+e.target.value || 0)}
          className="w-full rounded-lg border-[1.5px] border-border bg-surface px-2.5 py-2 pr-9 text-[13px] text-primary outline-none transition-colors focus:border-accent focus:bg-white"
        />
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted">
          {unit}
        </span>
      </div>
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (n: number) => void;
}

function Slider({ label, value, min, max, step, unit, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-3">
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-[11px] font-medium text-muted">{label}</label>
        <span className="rounded-full bg-[#e6faf4] px-2 py-0.5 text-[12px] font-bold text-accent">
          {value.toLocaleString("th-TH")} {unit}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(+e.target.value)}
        style={{ ["--pct" as string]: `${pct}%` }}
      />
    </div>
  );
}

export function InputForm({ input, onChange }: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
        <span className="text-[5px]">●</span> ต้นทุนเริ่มต้น
      </div>
      <div className="mb-2 grid grid-cols-2 gap-2">
        <NumField
          label="ราคาตู้"
          value={input.machinePrice}
          unit="฿"
          onChange={(n) => onChange({ machinePrice: n })}
        />
        <NumField
          label="ค่าติดตั้ง"
          value={input.installCost}
          unit="฿"
          onChange={(n) => onChange({ installCost: n })}
        />
      </div>
      <div className="mb-2 grid grid-cols-2 gap-2">
        <NumField
          label="ค่าสินค้าเริ่มต้น"
          value={input.stockCost}
          unit="฿"
          onChange={(n) => onChange({ stockCost: n })}
        />
        <NumField
          label="จำนวนตู้"
          value={input.numMachines}
          unit="ตู้"
          min={1}
          max={50}
          onChange={(n) => onChange({ numMachines: Math.max(1, n) })}
        />
      </div>

      <div className="my-3.5 h-px bg-border" />

      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
        <span className="text-[5px]">●</span> รายได้
      </div>
      <Slider
        label="รายได้ต่อตู้/วัน"
        value={input.dailyRevenue}
        min={100}
        max={5000}
        step={50}
        unit="฿"
        onChange={(n) => onChange({ dailyRevenue: n })}
      />
      <Slider
        label="Gross Margin (%)"
        value={input.grossMargin}
        min={10}
        max={80}
        step={1}
        unit="%"
        onChange={(n) => onChange({ grossMargin: n })}
      />

      <div className="my-3.5 h-px bg-border" />

      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
        <span className="text-[5px]">●</span> ค่าใช้จ่าย/เดือน (ต่อตู้)
      </div>
      <div className="mb-2 grid grid-cols-2 gap-2">
        <NumField
          label="ค่าเช่าพื้นที่"
          value={input.rent}
          unit="฿"
          onChange={(n) => onChange({ rent: n })}
        />
        <NumField
          label="ค่าไฟฟ้า"
          value={input.electric}
          unit="฿"
          onChange={(n) => onChange({ electric: n })}
        />
      </div>
      <div className="mb-2 grid grid-cols-2 gap-2">
        <NumField
          label="ค่าน้ำประปา"
          value={input.waterCost}
          unit="฿"
          onChange={(n) => onChange({ waterCost: n })}
        />
        <NumField
          label="ค่าซ่อมบำรุง"
          value={input.maintenance}
          unit="฿"
          onChange={(n) => onChange({ maintenance: n })}
        />
      </div>
      <div className="mb-2 grid grid-cols-2 gap-2">
        <NumField
          label="ค่าขนส่ง"
          value={input.transport}
          unit="฿"
          onChange={(n) => onChange({ transport: n })}
        />
        <NumField
          label="อื่นๆ"
          value={input.other}
          unit="฿"
          onChange={(n) => onChange({ other: n })}
        />
      </div>
      <div className="mb-2 grid grid-cols-2 gap-2">
        <NumField
          label="ภาษี (%)"
          value={input.taxRate}
          unit="%"
          min={0}
          max={40}
          onChange={(n) => onChange({ taxRate: n })}
        />
        <div />
      </div>

      <div className="mt-2 flex items-start gap-2 rounded-lg border border-[#b3ecdc] bg-[#f0fdf8] px-3 py-2.5 text-[11px] text-[#005e45]">
        <span className="mt-0.5 flex-shrink-0">💡</span>
        <span>ทำเลดี (รพ./มหา&apos;ลัย/ออฟฟิศ) รายได้สูงกว่าค่าเฉลี่ย 2–3 เท่า</span>
      </div>
    </div>
  );
}

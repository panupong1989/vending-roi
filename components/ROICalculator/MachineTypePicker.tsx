"use client";

import { MACHINE_TYPES } from "@/constants/machineTypes";
import type { MachineType, ROIInput } from "@/types";
import { useState } from "react";

interface Props {
  onSelect: (input: Partial<ROIInput>) => void;
}

export function MachineTypePicker({ onSelect }: Props) {
  const [activeKey, setActiveKey] = useState<string>("snackDrink");

  function handlePick(mt: MachineType) {
    setActiveKey(mt.key);
    onSelect({
      machinePrice: mt.price,
      dailyRevenue: mt.dailyRevenue,
      stockCost: mt.stockCost,
      electric: mt.electric,
      rent: mt.rent,
      grossMargin: mt.grossMargin,
    });
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {MACHINE_TYPES.map((mt) => {
        const active = mt.key === activeKey;
        return (
          <button
            key={mt.key}
            type="button"
            onClick={() => handlePick(mt)}
            className={`rounded-[10px] border-2 px-2.5 py-2.5 text-center transition-colors ${
              active
                ? "border-accent bg-[#e6faf4]"
                : "border-border bg-surface hover:border-accent hover:bg-[#e6faf4]"
            }`}
          >
            <div className="mb-1 text-lg">{mt.icon}</div>
            <div className="text-[10px] font-semibold text-primary">
              {mt.name}
            </div>
            <div className="text-[9px] text-muted">{mt.priceLabel}</div>
          </button>
        );
      })}
    </div>
  );
}

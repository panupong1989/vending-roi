"use client";

import { getMachinesByCategory, getMachineById } from "@/constants/machineTypes";
import type { MachineType, ROIInput } from "@/types";
import { useMemo } from "react";

interface Props {
  selectedId: string;
  onSelect: (patch: Partial<ROIInput>) => void;
}

export function MachineTypePicker({ selectedId, onSelect }: Props) {
  const grouped = useMemo(() => getMachinesByCategory(), []);
  const selected = selectedId ? getMachineById(selectedId) : undefined;

  function handlePick(m: MachineType) {
    onSelect({
      machineId: m.id,
      machinePrice: m.price,
      waterCost: m.needsWater ? m.defaultWaterCost : 0,
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {Object.entries(grouped).map(([category, machines]) => (
        <div key={category} className="flex flex-col gap-1.5">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted">
            {category}
          </h4>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {machines.map((m) => {
              const isSelected = selectedId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handlePick(m)}
                  aria-pressed={isSelected}
                  className={`relative min-h-[64px] rounded-lg border-[1.5px] p-2.5 text-left transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                    isSelected
                      ? "border-accent bg-[#e6faf4] ring-2 ring-accent/20"
                      : "border-border bg-white hover:border-accent/50"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent">
                      <svg
                        className="h-2.5 w-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="flex flex-col gap-1 pr-4">
                    <p
                      className={`text-[12px] font-semibold leading-tight ${
                        isSelected ? "text-primary" : "text-gray-800"
                      }`}
                    >
                      {m.shortName}
                    </p>
                    <p className="text-[11px] font-bold text-accent">
                      {m.price.toLocaleString("th-TH")} ฿
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selected && (
        <div className="rounded-lg border border-border bg-surface px-3 py-2 text-[11px] leading-relaxed text-muted">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
            ที่เลือก
          </div>
          <div className="mt-0.5 font-semibold text-primary">{selected.name}</div>
          <div className="mt-0.5">
            ราคา ฿{selected.price.toLocaleString("th-TH")} · {selected.brand}
          </div>
        </div>
      )}
    </div>
  );
}

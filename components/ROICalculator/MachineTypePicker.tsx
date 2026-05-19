"use client";

import { getMachinesByCategory, getMachineById } from "@/constants/machineTypes";
import type { ROIInput } from "@/types";
import { useMemo, useState } from "react";

interface Props {
  onSelect: (input: Partial<ROIInput>) => void;
}

export function MachineTypePicker({ onSelect }: Props) {
  const [selectedId, setSelectedId] = useState<string>("");
  const grouped = useMemo(() => getMachinesByCategory(), []);
  const selected = selectedId ? getMachineById(selectedId) : undefined;

  function handleChange(id: string) {
    setSelectedId(id);
    const mt = getMachineById(id);
    if (!mt) return;
    onSelect({
      machinePrice: mt.price,
      waterCost: mt.needsWater ? mt.defaultWaterCost : 0,
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <select
        value={selectedId}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded-lg border-[1.5px] border-border bg-surface px-2.5 py-2 text-[13px] text-primary outline-none transition-colors focus:border-accent focus:bg-white"
      >
        <option value="">-- เลือกประเภทเครื่อง --</option>
        {Object.entries(grouped).map(([category, machines]) => (
          <optgroup key={category} label={category}>
            {machines.map((m) => (
              <option key={m.id} value={m.id}>
                {m.shortName} ({m.price.toLocaleString("th-TH")} ฿)
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {selected && (
        <div className="rounded-lg border border-border bg-surface px-3 py-2 text-[11px] leading-relaxed text-muted">
          <div className="font-semibold text-primary">{selected.name}</div>
          <div className="mt-0.5">
            ราคา ฿{selected.price.toLocaleString("th-TH")} · {selected.brand}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { Category, Product } from "@/types";
import { calcMargin, makeProduct } from "@/lib/calculations";

interface Props {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
  editIndex: number | null;
  onCancelEdit: () => void;
}

const DEFAULT_STATE = {
  name: "",
  cat: "drink" as Category,
  qty: 10,
  price: 25,
  cost: 14,
};

export function ProductForm({
  products,
  onProductsChange,
  editIndex,
  onCancelEdit,
}: Props) {
  const [form, setForm] = useState(DEFAULT_STATE);

  useEffect(() => {
    if (editIndex !== null && products[editIndex]) {
      const p = products[editIndex];
      setForm({
        name: p.name,
        cat: p.cat,
        qty: p.qty,
        price: p.price,
        cost: p.cost,
      });
    } else {
      setForm(DEFAULT_STATE);
    }
  }, [editIndex, products]);

  const margin = calcMargin(form.price, form.cost);
  const marginColor =
    margin >= 40 ? "text-accent" : margin >= 20 ? "text-accent2" : "text-danger";

  function save() {
    const name = form.name.trim();
    if (!name) {
      alert("กรุณาใส่ชื่อสินค้า");
      return;
    }
    const next = [...products];
    const newProd = makeProduct(name, form.cat, form.price, form.cost, form.qty);
    if (editIndex !== null) {
      next[editIndex] = newProd;
    } else {
      next.push(newProd);
    }
    onProductsChange(next);
    setForm(DEFAULT_STATE);
    onCancelEdit();
  }

  function cancel() {
    setForm(DEFAULT_STATE);
    onCancelEdit();
  }

  return (
    <div>
      <div className="mb-3 flex flex-col gap-1">
        <label className="text-[11px] font-medium text-muted">ชื่อสินค้า</label>
        <input
          type="text"
          placeholder="เช่น น้ำดื่มมิเนรัล 600ml"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border-[1.5px] border-border bg-surface px-3 py-2 text-[13px] outline-none transition-colors focus:border-accent focus:bg-white"
        />
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-muted">หมวดหมู่</label>
          <select
            value={form.cat}
            onChange={(e) =>
              setForm({ ...form, cat: e.target.value as Category })
            }
            className="w-full rounded-lg border-[1.5px] border-border bg-surface px-3 py-2 text-[13px] outline-none transition-colors focus:border-accent focus:bg-white"
          >
            <option value="drink">🥤 เครื่องดื่ม</option>
            <option value="snack">🍫 ขนม</option>
            <option value="food">🍱 อาหาร</option>
            <option value="other">📦 อื่นๆ</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-muted">
            ขายได้ (ชิ้น/วัน)
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={form.qty}
            onChange={(e) => setForm({ ...form, qty: +e.target.value || 0 })}
            className="w-full rounded-lg border-[1.5px] border-border bg-surface px-3 py-2 text-[13px] outline-none transition-colors focus:border-accent focus:bg-white"
          />
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-muted">
            ราคาขาย (฿)
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value || 0 })}
            className="w-full rounded-lg border-[1.5px] border-border bg-surface px-3 py-2 text-[13px] outline-none transition-colors focus:border-accent focus:bg-white"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-muted">
            ต้นทุน (฿)
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: +e.target.value || 0 })}
            className="w-full rounded-lg border-[1.5px] border-border bg-surface px-3 py-2 text-[13px] outline-none transition-colors focus:border-accent focus:bg-white"
          />
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between rounded-lg bg-surface px-3.5 py-2.5">
        <span className="text-[12px] text-muted">Margin ที่จะได้</span>
        <span className={`text-[16px] font-bold ${marginColor}`}>
          {margin.toFixed(1)}%
        </span>
      </div>

      <button
        type="button"
        onClick={save}
        className="w-full rounded-[10px] bg-accent py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        ✓ {editIndex !== null ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
      </button>
      {editIndex !== null && (
        <button
          type="button"
          onClick={cancel}
          className="mt-1.5 w-full rounded-[10px] border-[1.5px] border-border bg-surface py-2 text-[12px] font-semibold text-primary hover:border-muted"
        >
          ยกเลิก
        </button>
      )}
    </div>
  );
}

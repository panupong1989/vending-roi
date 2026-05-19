"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { fmt, productAggregates } from "@/lib/calculations";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { PresetButtons } from "./PresetButtons";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";
import { CategoryChart } from "./CategoryChart";
import { TopProducts } from "./TopProducts";

interface Props {
  products: Product[];
  onProductsChange: (p: Product[]) => void;
  onExportToROI: (dailyRevenue: number, avgMargin: number, count: number) => void;
}

export function ProductAnalyzer({
  products,
  onProductsChange,
  onExportToROI,
}: Props) {
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const agg = useMemo(() => productAggregates(products), [products]);

  function handleDelete(i: number) {
    const p = products[i];
    if (!p) return;
    if (confirm(`ลบ "${p.name}" ?`)) {
      const next = products.filter((_, idx) => idx !== i);
      onProductsChange(next);
      if (editIndex === i) setEditIndex(null);
    }
  }

  function handleExport() {
    if (products.length === 0) {
      alert("ยังไม่มีสินค้า กรุณาเพิ่มสินค้าก่อน");
      return;
    }
    onExportToROI(agg.dailyRev, agg.weightedAvgMargin, products.length);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* ANALYTICS ROW */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <AKpi value={products.length.toString()} label="รายการสินค้า" />
        <AKpi value={`฿${fmt(agg.totalRev)}`} label="รายได้/เดือน (คาดการณ์)" />
        <AKpi
          value={`${agg.avgMargin.toFixed(1)}%`}
          label="Margin เฉลี่ย"
          className="col-span-2 sm:col-span-1"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader
              icon="✨"
              iconBg="bg-[#f0edfe]"
              iconColor="text-[#7c3aed]"
              title="โหลดสินค้าตัวอย่าง"
              subtitle="คลิกเพื่อเพิ่มรายการสินค้าทั่วไป"
            />
            <CardBody>
              <PresetButtons
                products={products}
                onProductsChange={onProductsChange}
                onExportToROI={handleExport}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              icon="📋"
              iconBg="bg-[#e6faf4]"
              iconColor="text-accent"
              title="รายการสินค้า"
              subtitle={`${products.length} รายการ`}
            />
            <ProductList
              products={products}
              onEdit={(i) => setEditIndex(i)}
              onDelete={handleDelete}
            />
          </Card>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader
              icon="➕"
              iconBg="bg-[#fff8e6]"
              iconColor="text-accent2"
              title={editIndex !== null ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
            />
            <CardBody>
              <ProductForm
                products={products}
                onProductsChange={onProductsChange}
                editIndex={editIndex}
                onCancelEdit={() => setEditIndex(null)}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              icon="📊"
              iconBg="bg-[#fff8e6]"
              iconColor="text-accent2"
              title="วิเคราะห์ตามหมวดหมู่"
            />
            <CardBody>
              <CategoryChart products={products} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              icon="🏆"
              iconBg="bg-[#e6faf4]"
              iconColor="text-accent"
              title="Top 5 สินค้าทำเงินสูงสุด"
            />
            <CardBody>
              <TopProducts products={products} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AKpi({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface px-3.5 py-3 text-center ${className}`}
    >
      <div className="font-prompt text-[18px] font-bold text-primary">
        {value}
      </div>
      <div className="mt-0.5 text-[10px] text-muted">{label}</div>
    </div>
  );
}

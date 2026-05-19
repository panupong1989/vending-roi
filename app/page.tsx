"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ROICalculator } from "@/components/ROICalculator";
import { ProductAnalyzer } from "@/components/ProductAnalyzer";
import { useLiff } from "./providers";
import type { Product, ROIInput } from "@/types";
import { loadProducts, loadROIInput, saveProducts, saveROIInput } from "@/lib/storage";

const DEFAULT_INPUT: ROIInput = {
  machineId: "",
  machinePrice: 45000,
  installCost: 3000,
  stockCost: 8000,
  numMachines: 1,
  dailyRevenue: 800,
  grossMargin: 40,
  rent: 1500,
  electric: 600,
  waterCost: 300,
  maintenance: 500,
  transport: 400,
  other: 300,
  taxRate: 10,
};

export type Tab = "roi" | "products";

export default function Page() {
  const { userId, isReady } = useLiff();
  const [tab, setTab] = useState<Tab>("roi");
  const [input, setInput] = useState<ROIInput>(DEFAULT_INPUT);
  const [products, setProducts] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [productSummary, setProductSummary] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady) return;
    const saved = loadROIInput(userId);
    if (saved) setInput(saved);
    setProducts(loadProducts(userId));
    setHydrated(true);
  }, [isReady, userId]);

  useEffect(() => {
    if (!hydrated) return;
    saveROIInput(userId, input);
  }, [input, userId, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveProducts(userId, products);
  }, [products, userId, hydrated]);

  function handleExportToROI(daily: number, margin: number, count: number) {
    setInput((s) => ({
      ...s,
      dailyRevenue: Math.round(daily),
      grossMargin: Math.round(margin),
    }));
    setProductSummary(
      `ข้อมูลสินค้า ${count} รายการ → รายได้/วัน ฿${Math.round(
        daily
      ).toLocaleString("th-TH")} · Margin ${Math.round(margin)}%`
    );
    setTab("roi");
  }

  return (
    <>
      <Header tab={tab} onTabChange={setTab} />
      <main className="mx-auto w-full max-w-[1280px] px-4 py-5 md:px-6 md:py-7">
        {tab === "roi" ? (
          <ROICalculator
            input={input}
            onInputChange={setInput}
            productSummary={productSummary}
            onClearProductSummary={() => setProductSummary(null)}
          />
        ) : (
          <ProductAnalyzer
            products={products}
            onProductsChange={setProducts}
            onExportToROI={handleExportToROI}
          />
        )}
        <footer className="mt-4 border-t border-border py-5 text-center text-[11px] text-muted">
          VendingROI Pro • ข้อมูลนี้ใช้เพื่อประกอบการตัดสินใจเท่านั้น ผลตอบแทนจริงอาจแตกต่างตามสภาวะตลาด
        </footer>
      </main>
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import type { ROIInput } from "@/types";
import {
  calculateCashflowSeries,
  calculateMonthlyRows,
  calculateROI,
  calculateScaleROIs,
  calculateScenarios,
} from "@/lib/calculations";
import { useLiff } from "@/app/providers";
import { sendFlexMessage } from "@/lib/liff";
import { buildRoiFlexBubble } from "@/lib/flexMessage";
import { Card, CardBody, CardHeader, SectionLabel } from "@/components/ui/Card";
import { MachineTypePicker } from "./MachineTypePicker";
import { InputForm } from "./InputForm";
import { KPICards } from "./KPICards";
import { ScenarioCards } from "./ScenarioCards";
import { BreakdownTable } from "./BreakdownTable";
import { BreakEvenBar } from "./BreakEvenBar";
import { CashflowChart } from "./CashflowChart";
import { ExpensePie } from "./ExpensePie";
import { ScaleChart } from "./ScaleChart";
import { ProfitRows } from "./ProfitRows";

interface Props {
  input: ROIInput;
  onInputChange: (input: ROIInput) => void;
  productSummary: string | null;
  onClearProductSummary: () => void;
}

type ResultTab = "overview" | "monthly" | "scenario";

export function ROICalculator({
  input,
  onInputChange,
  productSummary,
  onClearProductSummary,
}: Props) {
  const [resultTab, setResultTab] = useState<ResultTab>("overview");
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<string | null>(null);
  const { profile, isInClient } = useLiff();

  const result = useMemo(() => calculateROI(input), [input]);
  const scenarios = useMemo(() => calculateScenarios(input), [input]);
  const monthlyRows = useMemo(() => calculateMonthlyRows(input), [input]);
  const cashflow = useMemo(() => calculateCashflowSeries(input), [input]);
  const scaleROIs = useMemo(() => calculateScaleROIs(input), [input]);

  function patch(p: Partial<ROIInput>) {
    onInputChange({ ...input, ...p });
  }

  async function handleSend() {
    setSending(true);
    setSendStatus(null);
    const bubble = buildRoiFlexBubble({
      displayName: profile?.displayName ?? "ผู้ใช้",
      result,
      scenarios,
      liffId: process.env.NEXT_PUBLIC_LIFF_ID,
    });
    const r = await sendFlexMessage(bubble);
    setSendStatus(r.ok ? "✅ ส่งสำเร็จ" : `⚠️ ${r.reason ?? "ส่งไม่สำเร็จ"}`);
    setSending(false);
    setTimeout(() => setSendStatus(null), 3500);
  }

  const alertKind =
    result.netProfit < 0
      ? { cls: "bg-[#fdecea] border-[#f4b8b3] text-[#8b1a14]", text: "⚠️ ขณะนี้ขาดทุน" }
      : result.annualROI >= 15
        ? { cls: "bg-[#e6faf4] border-[#b3ecdc] text-[#005e45]", text: "✅ ROI ดีเยี่ยม" }
        : { cls: "bg-[#fff8e6] border-[#ffe0a3] text-[#7a5000]", text: "ℹ️ ROI ปานกลาง" };

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[370px_1fr]">
      {/* LEFT */}
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader
            icon="📦"
            iconBg="bg-[#e8eef9]"
            title="เลือกประเภทตู้"
            subtitle="กดเพื่อโหลดค่าเริ่มต้น"
          />
          <CardBody>
            <MachineTypePicker onSelect={patch} />
            {productSummary && (
              <div className="mt-3 flex items-start gap-2 rounded-lg border border-[#b3ecdc] bg-[#f0fdf8] px-3 py-2 text-[11px] text-[#005e45]">
                <span className="mt-0.5">🔗</span>
                <span className="flex-1">{productSummary}</span>
                <button
                  type="button"
                  onClick={onClearProductSummary}
                  className="text-[#005e45]/60 hover:text-[#005e45]"
                  aria-label="ปิด"
                >
                  ✕
                </button>
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            icon="💰"
            iconBg="bg-[#e8eef9]"
            title="ต้นทุน & รายได้"
          />
          <CardBody>
            <InputForm input={input} onChange={patch} />
          </CardBody>
        </Card>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-4">
        <KPICards result={result} />

        {/* Send to LINE button */}
        <Card>
          <CardBody className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[12px] text-muted">
              ส่งสรุปผลการคำนวณกลับเข้าห้องแชท LINE ของคุณ
            </div>
            <div className="flex items-center gap-2">
              {sendStatus && (
                <span className="text-[11px] text-primary">{sendStatus}</span>
              )}
              <button
                type="button"
                onClick={handleSend}
                disabled={sending || !isInClient}
                className="rounded-[10px] bg-accent px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-muted"
              >
                {sending
                  ? "กำลังส่ง…"
                  : isInClient
                    ? "📨 ส่งผลให้ตัวเอง"
                    : "📨 เปิดผ่าน LINE เพื่อส่ง"}
              </button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="!pb-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1 rounded-[10px] border border-border bg-surface p-1">
                <TabBtn
                  active={resultTab === "overview"}
                  onClick={() => setResultTab("overview")}
                >
                  ภาพรวม
                </TabBtn>
                <TabBtn
                  active={resultTab === "monthly"}
                  onClick={() => setResultTab("monthly")}
                >
                  12 เดือน
                </TabBtn>
                <TabBtn
                  active={resultTab === "scenario"}
                  onClick={() => setResultTab("scenario")}
                >
                  สถานการณ์
                </TabBtn>
              </div>
              <span
                className={`rounded-lg border px-2.5 py-1 text-[11px] ${alertKind.cls}`}
              >
                {alertKind.text}
              </span>
            </div>
          </CardBody>

          {resultTab === "overview" && (
            <CardBody className="!pt-0">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <SectionLabel>สรุปรายได้/เดือน (ทุกตู้)</SectionLabel>
                  <ProfitRows result={result} taxRate={input.taxRate} />
                  <div className="mt-3.5">
                    <SectionLabel>ความคืบหน้าคืนทุน</SectionLabel>
                    <BreakEvenBar paybackMonths={result.paybackMonths} />
                  </div>
                </div>
                <div>
                  <SectionLabel>สัดส่วนค่าใช้จ่าย</SectionLabel>
                  <ExpensePie
                    rent={input.rent}
                    electric={input.electric}
                    maintenance={input.maintenance}
                    transport={input.transport}
                    other={input.other}
                    machines={input.numMachines}
                  />
                </div>
              </div>
              <div className="mt-4">
                <SectionLabel>กระแสเงินสดสะสม (12 เดือน)</SectionLabel>
                <CashflowChart
                  cashflow={cashflow}
                  monthlyNet={result.netProfit}
                />
              </div>
            </CardBody>
          )}

          {resultTab === "monthly" && (
            <CardBody className="!pt-0">
              <BreakdownTable rows={monthlyRows} />
            </CardBody>
          )}

          {resultTab === "scenario" && (
            <CardBody className="!pt-0">
              <ScenarioCards scenarios={scenarios} />
              <div className="mt-4">
                <SectionLabel>เปรียบเทียบ ROI ตามจำนวนตู้</SectionLabel>
                <ScaleChart rois={scaleROIs} />
              </div>
            </CardBody>
          )}
        </Card>
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
        active
          ? "bg-white text-primary shadow-[0_1px_5px_rgba(0,0,0,.08)]"
          : "text-muted hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

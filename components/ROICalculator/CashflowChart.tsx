"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { MONTHS_TH } from "@/constants/categories";
import { fmt } from "@/lib/calculations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Filler
);

interface Props {
  cashflow: number[];
  monthlyNet: number;
}

export function CashflowChart({ cashflow, monthlyNet }: Props) {
  const positive = monthlyNet >= 0;
  const data = {
    labels: MONTHS_TH,
    datasets: [
      {
        type: "line" as const,
        label: "CF สะสม",
        data: cashflow,
        borderColor: "#00c896",
        backgroundColor: "transparent",
        borderWidth: 2,
        pointBackgroundColor: cashflow.map((v) =>
          v >= 0 ? "#00c896" : "#e74c3c"
        ),
        pointRadius: 3,
        tension: 0.3,
      },
      {
        type: "bar" as const,
        label: "กำไร/เดือน",
        data: Array(12).fill(Math.round(monthlyNet)),
        backgroundColor: positive
          ? "rgba(0,200,150,.12)"
          : "rgba(231,76,60,.12)",
        borderColor: positive ? "#00c896" : "#e74c3c",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="relative h-[200px] w-full">
      <Chart
        type="bar"
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `${ctx.dataset.label}: ฿${(ctx.raw as number).toLocaleString("th-TH")}`,
              },
            },
          },
          scales: {
            y: {
              grid: { color: "rgba(0,0,0,.04)" },
              ticks: {
                font: { size: 10, family: "Sarabun" },
                color: "#8590a2",
                callback: (v) => "฿" + fmt(Number(v)),
              },
            },
            x: {
              grid: { display: false },
              ticks: {
                font: { size: 10, family: "Sarabun" },
                color: "#8590a2",
              },
            },
          },
        }}
      />
    </div>
  );
}

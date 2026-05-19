"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface Props {
  rois: number[];
}

export function ScaleChart({ rois }: Props) {
  const data = {
    labels: [1, 2, 3, 4, 5].map((n) => `${n} ตู้`),
    datasets: [
      {
        label: "ROI %",
        data: rois,
        backgroundColor: rois.map((v) =>
          v >= 15
            ? "rgba(0,200,150,.8)"
            : v >= 8
              ? "rgba(247,168,0,.8)"
              : "rgba(231,76,60,.8)"
        ),
        borderRadius: 7,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="relative h-[210px] w-full">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: { label: (ctx) => `ROI: ${ctx.raw}%` },
            },
          },
          scales: {
            y: {
              grid: { color: "rgba(0,0,0,.04)" },
              ticks: {
                font: { size: 10, family: "Sarabun" },
                color: "#8590a2",
                callback: (v) => v + "%",
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

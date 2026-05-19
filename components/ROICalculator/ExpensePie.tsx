"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  rent: number;
  electric: number;
  waterCost: number;
  maintenance: number;
  transport: number;
  other: number;
  machines: number;
}

export function ExpensePie({
  rent,
  electric,
  waterCost,
  maintenance,
  transport,
  other,
  machines,
}: Props) {
  const data = {
    labels: ["ค่าเช่า", "ค่าไฟ", "ค่าน้ำประปา", "ซ่อมบำรุง", "ขนส่ง", "อื่นๆ"],
    datasets: [
      {
        data: [rent, electric, waterCost, maintenance, transport, other].map(
          (v) => v * machines
        ),
        backgroundColor: [
          "#1a2744",
          "#00c896",
          "#3aa8ff",
          "#f7a800",
          "#4a6cf7",
          "#e74c3c",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <div className="relative h-[180px] w-full">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                font: { size: 10, family: "Sarabun" },
                boxWidth: 8,
                padding: 6,
                color: "#8590a2",
              },
            },
          },
          cutout: "65%",
        }}
      />
    </div>
  );
}

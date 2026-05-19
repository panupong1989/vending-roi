import type {
  MonthlyRow,
  Product,
  ROIInput,
  ROIResult,
  ScenarioResult,
} from "@/types";
import { MONTHS_TH } from "@/constants/categories";

export function calculateROI(input: ROIInput): ROIResult {
  const {
    machinePrice,
    installCost,
    stockCost,
    numMachines,
    dailyRevenue,
    grossMargin,
    rent,
    electric,
    maintenance,
    transport,
    other,
    taxRate,
  } = input;

  const machines = numMachines || 1;
  const totalInvest = (machinePrice + installCost + stockCost) * machines;
  const monthlyRevenue = dailyRevenue * 30 * machines;
  const cogs = monthlyRevenue * (1 - grossMargin / 100);
  const grossProfit = monthlyRevenue - cogs;
  const monthlyExpense =
    (rent + electric + maintenance + transport + other) * machines;
  const ebt = grossProfit - monthlyExpense;
  const tax = ebt > 0 ? (ebt * taxRate) / 100 : 0;
  const netProfit = ebt - tax;
  const annualROI = totalInvest > 0 ? ((netProfit * 12) / totalInvest) * 100 : 0;
  const paybackMonths = netProfit > 0 ? totalInvest / netProfit : Infinity;
  const beDaily =
    monthlyExpense > 0 && grossMargin > 0
      ? monthlyExpense / 30 / (grossMargin / 100) / machines
      : 0;

  return {
    totalInvest,
    monthlyRevenue,
    cogs,
    grossProfit,
    monthlyExpense,
    ebt,
    tax,
    netProfit,
    annualROI,
    paybackMonths,
    beDaily,
  };
}

export function calculateScenarios(input: ROIInput): ScenarioResult[] {
  const machines = input.numMachines || 1;
  const totalInvest =
    (input.machinePrice + input.installCost + input.stockCost) * machines;
  const monthlyExpense =
    (input.rent +
      input.electric +
      input.maintenance +
      input.transport +
      input.other) *
    machines;

  const defs: Array<{
    key: ScenarioResult["key"];
    name: string;
    badge: string;
    label: string;
    mul: number;
  }> = [
    {
      key: "best",
      name: "กรณีดีที่สุด",
      badge: "badge-best",
      label: "🚀 ดีมาก",
      mul: 1.3,
    },
    {
      key: "base",
      name: "กรณีปกติ",
      badge: "badge-base",
      label: "📊 ปกติ",
      mul: 1,
    },
    {
      key: "worst",
      name: "กรณีแย่ที่สุด",
      badge: "badge-worst",
      label: "⚠️ แย่",
      mul: 0.7,
    },
  ];

  return defs.map((s) => {
    const sR = input.dailyRevenue * 30 * machines * s.mul;
    const grossP = sR * (input.grossMargin / 100);
    const ebtS = grossP - monthlyExpense;
    const taxS = Math.max(0, ebtS) * (input.taxRate / 100);
    const sN = grossP - monthlyExpense - taxS;
    const sROI = totalInvest > 0 ? ((sN * 12) / totalInvest) * 100 : 0;
    const sPB = sN > 0 ? totalInvest / sN : Infinity;
    return {
      key: s.key,
      name: s.name,
      badge: s.badge,
      label: s.label,
      mul: s.mul,
      revenue: sR,
      netProfit: sN,
      roi: sROI,
      paybackMonths: sPB,
    };
  });
}

export function calculateMonthlyRows(input: ROIInput): MonthlyRow[] {
  const r = calculateROI(input);
  const rows: MonthlyRow[] = [];
  let cumCF = -r.totalInvest;
  for (let i = 0; i < 12; i++) {
    cumCF += r.netProfit;
    rows.push({
      month: MONTHS_TH[i],
      revenue: r.monthlyRevenue,
      cogs: r.cogs,
      expense: r.monthlyExpense,
      ebt: r.ebt,
      tax: r.tax,
      netProfit: r.netProfit,
      cumCF,
    });
  }
  return rows;
}

export function calculateCashflowSeries(input: ROIInput): number[] {
  const r = calculateROI(input);
  const series: number[] = [];
  let cum = -r.totalInvest;
  for (let i = 1; i <= 12; i++) {
    cum += r.netProfit;
    series.push(Math.round(cum));
  }
  return series;
}

export function calculateScaleROIs(input: ROIInput): number[] {
  const scaleM = [1, 2, 3, 4, 5];
  return scaleM.map((n) => {
    const sR = input.dailyRevenue * 30 * n;
    const sE =
      (input.rent +
        input.electric +
        input.maintenance +
        input.transport +
        input.other) *
      n;
    const grossP = sR * (input.grossMargin / 100);
    const ebt = grossP - sE;
    const taxS = Math.max(0, ebt) * (input.taxRate / 100);
    const sN = grossP - sE - taxS;
    const sInv = (input.machinePrice + input.installCost + input.stockCost) * n;
    return sInv > 0 ? +((sN * 12) / sInv * 100).toFixed(1) : 0;
  });
}

export function calcMargin(price: number, cost: number): number {
  return price > 0 ? ((price - cost) / price) * 100 : 0;
}

export function makeProduct(
  name: string,
  cat: Product["cat"],
  price: number,
  cost: number,
  qty: number
): Product {
  return {
    name,
    cat,
    price,
    cost,
    qty,
    margin: calcMargin(price, cost),
    monthlyRev: price * qty * 30,
  };
}

export function productAggregates(products: Product[]): {
  totalRev: number;
  avgMargin: number;
  dailyRev: number;
  weightedAvgMargin: number;
} {
  const totalRev = products.reduce((s, p) => s + p.monthlyRev, 0);
  const avgMargin =
    products.length > 0
      ? products.reduce((s, p) => s + p.margin, 0) / products.length
      : 0;
  const dailyRev = products.reduce((s, p) => s + p.price * p.qty, 0);
  const weightedAvgMargin =
    totalRev > 0
      ? products.reduce((s, p) => s + p.margin * p.monthlyRev, 0) / totalRev
      : 0;
  return { totalRev, avgMargin, dailyRev, weightedAvgMargin };
}

export function fmt(n: number): string {
  if (!isFinite(n)) return "∞";
  if (Math.abs(n) >= 1000000) return (n / 1000000).toFixed(1) + "M";
  return Math.round(n).toLocaleString("th-TH");
}

export function fmtFull(n: number): string {
  if (!isFinite(n)) return "∞";
  return Math.round(n).toLocaleString("th-TH");
}

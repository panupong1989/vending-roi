export type Category = "drink" | "snack" | "food" | "other";

export interface Product {
  name: string;
  cat: Category;
  price: number;
  cost: number;
  qty: number;
  margin: number;
  monthlyRev: number;
}

export interface ProductInput {
  name: string;
  cat: Category;
  price: number;
  cost: number;
  qty: number;
}

export interface MachineType {
  id: string;
  category: string;
  brand: string;
  name: string;
  shortName: string;
  price: number;
  needsWater: boolean;
  needsElectricity: boolean;
  defaultWaterCost: number;
  description?: string;
}

export interface ROIInput {
  machinePrice: number;
  installCost: number;
  stockCost: number;
  numMachines: number;
  dailyRevenue: number;
  grossMargin: number;
  rent: number;
  electric: number;
  waterCost: number;
  maintenance: number;
  transport: number;
  other: number;
  taxRate: number;
}

export interface ROIResult {
  totalInvest: number;
  monthlyRevenue: number;
  cogs: number;
  grossProfit: number;
  monthlyExpense: number;
  ebt: number;
  tax: number;
  netProfit: number;
  annualROI: number;
  paybackMonths: number;
  beDaily: number;
}

export interface ScenarioResult {
  key: "best" | "base" | "worst";
  name: string;
  badge: string;
  label: string;
  mul: number;
  revenue: number;
  netProfit: number;
  roi: number;
  paybackMonths: number;
}

export interface MonthlyRow {
  month: string;
  revenue: number;
  cogs: number;
  expense: number;
  ebt: number;
  tax: number;
  netProfit: number;
  cumCF: number;
}

export interface LiffProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export interface LiffState {
  isReady: boolean;
  isInClient: boolean;
  isLoggedIn: boolean;
  profile: LiffProfile | null;
  error: string | null;
}

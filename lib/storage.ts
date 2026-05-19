import type { Product, ROIInput } from "@/types";

const KEY_PREFIX = "vending_roi:";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function productsKey(userId: string): string {
  return `${KEY_PREFIX}${userId}:products`;
}

function roiKey(userId: string): string {
  return `${KEY_PREFIX}${userId}:roi`;
}

export function saveProducts(userId: string, products: Product[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(productsKey(userId), JSON.stringify(products));
  } catch {
    /* quota / private mode — ignore */
  }
}

export function loadProducts(userId: string): Product[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(productsKey(userId));
    if (!data) return [];
    const parsed = JSON.parse(data) as Product[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveROIInput(userId: string, input: ROIInput): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(roiKey(userId), JSON.stringify(input));
  } catch {
    /* ignore */
  }
}

export function loadROIInput(userId: string): ROIInput | null {
  if (!isBrowser()) return null;
  try {
    const data = localStorage.getItem(roiKey(userId));
    if (!data) return null;
    return JSON.parse(data) as ROIInput;
  } catch {
    return null;
  }
}

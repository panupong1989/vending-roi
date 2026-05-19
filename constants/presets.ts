import type { ProductInput } from "@/types";

export type PresetKey = "snack" | "coffee" | "fresh" | "mixed";

export const PRESETS: Record<PresetKey, ProductInput[]> = {
  snack: [
    { name: "น้ำดื่มมิเนรัล 600ml", cat: "drink", price: 12, cost: 6, qty: 30 },
    { name: "น้ำอัดลม 325ml", cat: "drink", price: 18, cost: 10, qty: 20 },
    { name: "ชาเขียวพร้อมดื่ม", cat: "drink", price: 22, cost: 12, qty: 15 },
    { name: "โอวัลติน UHT", cat: "drink", price: 16, cost: 9, qty: 12 },
    { name: "ขนมปังปิ้งกรอบ", cat: "snack", price: 15, cost: 8, qty: 18 },
    { name: "มันฝรั่งทอดกรอบ", cat: "snack", price: 25, cost: 14, qty: 14 },
    { name: "คุกกี้ช็อกโกแลต", cat: "snack", price: 20, cost: 11, qty: 10 },
    { name: "ลูกอม/หมากฝรั่ง", cat: "snack", price: 10, cost: 4, qty: 20 },
  ],
  coffee: [
    { name: "อเมริกาโน่ร้อน", cat: "drink", price: 45, cost: 15, qty: 20 },
    { name: "ลาเต้เย็น", cat: "drink", price: 55, cost: 18, qty: 18 },
    { name: "คาปูชิโน่", cat: "drink", price: 50, cost: 16, qty: 12 },
    { name: "ช็อคโกแลตร้อน", cat: "drink", price: 50, cost: 17, qty: 10 },
    { name: "ชาร้อน", cat: "drink", price: 35, cost: 10, qty: 15 },
    { name: "น้ำดื่มขวด", cat: "drink", price: 15, cost: 5, qty: 25 },
  ],
  fresh: [
    { name: "ข้าวกล่องไก่ผัดกระเพรา", cat: "food", price: 55, cost: 32, qty: 12 },
    { name: "ข้าวกล่องหมูทอด", cat: "food", price: 50, cost: 30, qty: 10 },
    { name: "สลัดโรล", cat: "food", price: 45, cost: 28, qty: 8 },
    { name: "แซนวิชไข่", cat: "food", price: 35, cost: 20, qty: 10 },
    { name: "โยเกิร์ต", cat: "food", price: 30, cost: 18, qty: 12 },
    { name: "น้ำผลไม้สด", cat: "drink", price: 40, cost: 20, qty: 15 },
    { name: "นมสด", cat: "drink", price: 22, cost: 12, qty: 20 },
  ],
  mixed: [
    { name: "น้ำดื่ม", cat: "drink", price: 12, cost: 5, qty: 25 },
    { name: "กาแฟกระป๋อง", cat: "drink", price: 22, cost: 13, qty: 18 },
    { name: "ขนมขบเคี้ยว", cat: "snack", price: 20, cost: 11, qty: 15 },
    { name: "ช็อคโกแลตแท่ง", cat: "snack", price: 25, cost: 14, qty: 10 },
    { name: "บะหมี่กึ่งสำเร็จรูป", cat: "food", price: 18, cost: 9, qty: 12 },
    { name: "ผ้าเย็น", cat: "other", price: 10, cost: 3, qty: 15 },
    { name: "หน้ากากอนามัย", cat: "other", price: 15, cost: 5, qty: 8 },
  ],
};

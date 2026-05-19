import type { MachineType } from "@/types";

export const MACHINE_TYPES: MachineType[] = [
  {
    id: "safe-water-v3",
    category: "ตู้น้ำลิตรหยอดเหรียญ",
    brand: "SAFE",
    name: "ตู้น้ำลิตร หยอดเหรียญ V3 + ชุดติดตั้ง (ไม่มีมิเตอร์น้ำ-ไฟ)",
    shortName: "SAFE V3",
    price: 45900,
    needsWater: true,
    needsElectricity: true,
    defaultWaterCost: 1500,
  },
  {
    id: "safe-water-v2",
    category: "ตู้น้ำลิตรหยอดเหรียญ",
    brand: "SAFE",
    name: "ตู้น้ำลิตร หยอดเหรียญ V2 + ชุดติดตั้ง (รวมมิเตอร์น้ำ-ไฟ ติดตั้งด้านในตู้)",
    shortName: "SAFE V2",
    price: 47900,
    needsWater: true,
    needsElectricity: true,
    defaultWaterCost: 1500,
  },
  {
    id: "safe-coffee-basic",
    category: "เครื่องขายกาแฟหยอดเหรียญ",
    brand: "Safe Coffee",
    name: "Safe Coffee เครื่องขายกาแฟหยอดเหรียญ + ชุดอุปกรณ์",
    shortName: "Safe Coffee",
    price: 55900,
    needsWater: true,
    needsElectricity: true,
    defaultWaterCost: 200,
  },
  {
    id: "safe-coffee-filter",
    category: "เครื่องขายกาแฟหยอดเหรียญ",
    brand: "Safe Coffee",
    name: "Safe Coffee เครื่องขายกาแฟหยอดเหรียญ + ชุดอุปกรณ์ + เครื่องกรองน้ำ",
    shortName: "Safe Coffee + Filter",
    price: 57900,
    needsWater: true,
    needsElectricity: true,
    defaultWaterCost: 200,
  },
  {
    id: "lg-stack-13-10",
    category: "เครื่องซักผ้าแบบซ้อน",
    brand: "LG",
    name: "LG เครื่องซักผ้าแบบซ้อน (ซักล่าง 13kg + อบบน 10kg) พร้อมชุดหยอดเหรียญ",
    shortName: "LG ซ้อน 13/10kg",
    price: 145900,
    needsWater: true,
    needsElectricity: true,
    defaultWaterCost: 800,
  },
  {
    id: "lg-stack-17-13",
    category: "เครื่องซักผ้าแบบซ้อน",
    brand: "LG",
    name: "LG เครื่องซักผ้าแบบซ้อน (ซักล่าง 17kg + อบบน 13kg) พร้อมชุดหยอดเหรียญ",
    shortName: "LG ซ้อน 17/13kg",
    price: 185900,
    needsWater: true,
    needsElectricity: true,
    defaultWaterCost: 800,
  },
  {
    id: "lg-top-17",
    category: "เครื่องซักผ้าฝาบน",
    brand: "LG",
    name: "LG เครื่องซักผ้าฝาบน รุ่น T2517VBTB 17kg พร้อมกล่องหยอดเหรียญ",
    shortName: "LG ฝาบน 17kg",
    price: 28900,
    needsWater: true,
    needsElectricity: true,
    defaultWaterCost: 500,
  },
  {
    id: "ice-fh-180",
    category: "เครื่องผลิตน้ำแข็งหยอดเหรียญ + QR Code",
    brand: "FH/FC",
    name: "เครื่องผลิตน้ำแข็งหยอดเหรียญ + QR Code แบบบาง รุ่น FH-180",
    shortName: "น้ำแข็ง FH-180",
    price: 186000,
    needsWater: true,
    needsElectricity: true,
    defaultWaterCost: 1000,
  },
  {
    id: "ice-fc-180",
    category: "เครื่องผลิตน้ำแข็งหยอดเหรียญ + QR Code",
    brand: "FH/FC",
    name: "เครื่องผลิตน้ำแข็งหยอดเหรียญ + QR Code แบบบาง รุ่น FC-180",
    shortName: "น้ำแข็ง FC-180",
    price: 186000,
    needsWater: true,
    needsElectricity: true,
    defaultWaterCost: 1000,
  },
];

export function getMachinesByCategory(): Record<string, MachineType[]> {
  return MACHINE_TYPES.reduce(
    (acc, m) => {
      if (!acc[m.category]) acc[m.category] = [];
      acc[m.category].push(m);
      return acc;
    },
    {} as Record<string, MachineType[]>
  );
}

export function getMachineById(id: string): MachineType | undefined {
  return MACHINE_TYPES.find((m) => m.id === id);
}

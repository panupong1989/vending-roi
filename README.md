# VendingROI Pro — LINE LIFF

แอปคำนวณ ROI ตู้อัตโนมัติ + วิเคราะห์สินค้า สำหรับใช้งานภายใน LINE ผ่าน LIFF
สร้างด้วย **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Chart.js + @line/liff**

---

## ฟีเจอร์

- **คำนวณ ROI**: เลือกประเภทตู้ → กรอกต้นทุน/รายได้/ค่าใช้จ่าย → เห็น KPI 4 ตัว
  (ROI/ปี, คืนทุน, กำไรสุทธิ/เดือน, Break-even/วัน)
- **3 มุมมองผลลัพธ์**: ภาพรวม + ตาราง 12 เดือน + เปรียบเทียบสถานการณ์ (Best / Base / Worst)
- **กราฟ Chart.js**: pie ค่าใช้จ่าย, line+bar cashflow สะสม, bar ROI vs จำนวนตู้
- **จัดการสินค้า**: เพิ่ม / แก้ไข / ลบ / โหลด preset (snack, coffee, fresh, mixed)
- **วิเคราะห์ตามหมวด** + **Top 5 สินค้าทำเงินสูงสุด**
- **ส่งข้อมูลสินค้าไปคำนวณ ROI** อัตโนมัติ (คำนวณ daily revenue + weighted margin)
- **ส่ง Flex Message สรุปผลกลับเข้า LINE** ตัวเองได้ (ผ่าน `liff.sendMessages`)
- **เก็บข้อมูลใน localStorage** แยกตาม `userId` ของ LIFF (anonymous เมื่อยังไม่ login)

---

## เริ่มใช้งานในเครื่อง

```bash
npm install
cp .env.local.example .env.local
# แก้ NEXT_PUBLIC_LIFF_ID ในไฟล์ .env.local
npm run dev
```

เปิด <http://localhost:3000>

> หมายเหตุ: หากเปิดผ่านเบราว์เซอร์ปกติ ปุ่ม "ส่งผลให้ตัวเอง" จะถูก disable เพราะ `liff.sendMessages`
> ใช้ได้เฉพาะภายในแอป LINE เท่านั้น

---

## ตั้งค่า LIFF (LINE Developers)

1. เข้า <https://developers.line.biz/console/>
2. สร้าง **Provider** (ถ้ายังไม่มี) → สร้าง **LINE Login channel**
3. ไปที่แท็บ **LIFF** → **Add**
   - Endpoint URL: `https://<your-vercel-domain>` (ตอน deploy แล้ว)
   - Size: **Full** (แนะนำ)
   - Scope: เปิด `profile`, `chat_message.write`
   - Bot link feature: เลือกตามที่ต้องการ
4. คัดลอก **LIFF ID** มาใส่ใน `.env.local` และ Vercel project env

---

## Deploy บน Vercel

1. Push โค้ดขึ้น GitHub
2. ไปที่ <https://vercel.com/new> → Import repo
3. Framework preset: **Next.js** (auto-detected)
4. เพิ่ม Environment Variable:
   - `NEXT_PUBLIC_LIFF_ID` = `<LIFF ID ของคุณ>`
5. Deploy → คัดลอก URL ที่ได้กลับไปใส่ใน LIFF Endpoint URL

---

## โครงสร้างโปรเจ็กต์

```
vending-roi-liff/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout + fonts (Sarabun, Prompt)
│   ├── providers.tsx          # LIFF context provider
│   ├── page.tsx               # Main page (tab: ROI / Products)
│   └── globals.css            # Tailwind + custom CSS vars
├── components/
│   ├── Header.tsx
│   ├── ui/Card.tsx
│   ├── ROICalculator/
│   │   ├── index.tsx          # Container + tab switcher
│   │   ├── MachineTypePicker.tsx
│   │   ├── InputForm.tsx
│   │   ├── KPICards.tsx
│   │   ├── ProfitRows.tsx
│   │   ├── ScenarioCards.tsx
│   │   ├── BreakdownTable.tsx
│   │   ├── BreakEvenBar.tsx
│   │   ├── CashflowChart.tsx
│   │   ├── ExpensePie.tsx
│   │   └── ScaleChart.tsx
│   └── ProductAnalyzer/
│       ├── index.tsx
│       ├── PresetButtons.tsx
│       ├── ProductForm.tsx
│       ├── ProductList.tsx
│       ├── CategoryChart.tsx
│       └── TopProducts.tsx
├── lib/
│   ├── calculations.ts        # สูตร ROI ทั้งหมด (1:1 จาก HTML เดิม)
│   ├── storage.ts             # localStorage namespaced per userId
│   ├── liff.ts                # LIFF wrapper (init / profile / sendFlex / close)
│   └── flexMessage.ts         # Flex bubble template สำหรับส่งสรุปผล
├── constants/
│   ├── machineTypes.ts
│   ├── presets.ts             # 4 preset (snack, coffee, fresh, mixed)
│   └── categories.ts
├── types/
│   └── index.ts
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── tsconfig.json
```

---

## สูตรการคำนวณ

ใช้สูตรเดียวกับ HTML ต้นฉบับทั้งหมด — ไม่มี NPV/IRR (ตาม spec ผู้ใช้)

```
totalInvest    = (machinePrice + installCost + stockCost) * numMachines
monthlyRevenue = dailyRevenue * 30 * numMachines
cogs           = monthlyRevenue * (1 - grossMargin/100)
grossProfit    = monthlyRevenue - cogs
monthlyExpense = (rent + electric + maintenance + transport + other) * numMachines
ebt            = grossProfit - monthlyExpense
tax            = ebt > 0 ? ebt * taxRate/100 : 0
netProfit      = ebt - tax
annualROI %    = (netProfit * 12 / totalInvest) * 100
paybackMonths  = totalInvest / netProfit                       (∞ ถ้า netProfit ≤ 0)
breakevenDaily = monthlyExpense / 30 / (grossMargin/100) / numMachines
```

**สถานการณ์** ใช้ตัวคูณรายได้: Best ×1.3, Base ×1.0, Worst ×0.7

---

## ทดสอบบนมือถือ

1. เปิด Vercel URL ในเบราว์เซอร์ → ปรับ DevTools เป็นโหมด mobile (380×800)
2. หรือเปิด LIFF URL `https://liff.line.me/<LIFF_ID>` ในมือถือที่ติดตั้ง LINE

---

## License

MIT

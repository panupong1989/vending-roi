import type { Metadata, Viewport } from "next";
import { Prompt, Sarabun } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sarabun",
  display: "swap",
});

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VendingROI Pro",
  description: "ระบบวิเคราะห์การลงทุนตู้อัตโนมัติ บน LINE LIFF",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1a2744",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${sarabun.variable} ${prompt.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

"use client";

import { useLiff } from "@/app/providers";
import type { Tab } from "@/app/page";

interface Props {
  tab: Tab;
  onTabChange: (t: Tab) => void;
}

export function Header({ tab, onTabChange }: Props) {
  const { profile, isInClient } = useLiff();

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-[0_2px_20px_rgba(0,0,0,0.2)]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-2 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-accent text-lg">
            🏧
          </div>
          <div className="min-w-0 leading-tight">
            <h1 className="truncate font-prompt text-[15px] font-semibold">
              VendingROI Pro
            </h1>
            <p className="truncate text-[10px] font-light opacity-60">
              ระบบวิเคราะห์การลงทุนตู้อัตโนมัติ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {profile?.pictureUrl ? (
            <img
              src={profile.pictureUrl}
              alt={profile.displayName}
              className="h-7 w-7 rounded-full border border-white/30 object-cover"
            />
          ) : (
            <div className="dot-live h-2 w-2 rounded-full bg-accent" aria-hidden />
          )}
        </div>
      </div>

      <nav className="mx-auto flex max-w-[1280px] gap-1 px-4 pb-3 md:px-6">
        <TabButton
          active={tab === "roi"}
          onClick={() => onTabChange("roi")}
          label="📈 คำนวณ ROI"
        />
        <TabButton
          active={tab === "products"}
          onClick={() => onTabChange("products")}
          label="📦 จัดการสินค้า"
        />
        {!isInClient && (
          <span className="ml-auto self-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px]">
            Preview
          </span>
        )}
      </nav>
    </header>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
        active
          ? "border-white/40 bg-white/15 text-white"
          : "border-white/20 bg-transparent text-white/70 hover:border-white/40 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

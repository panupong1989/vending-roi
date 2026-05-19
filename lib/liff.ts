import type { LiffProfile } from "@/types";

type LiffSdk = typeof import("@line/liff").default;

let liffInstance: LiffSdk | null = null;

export async function initLiff(liffId: string): Promise<LiffSdk> {
  if (liffInstance) return liffInstance;
  const liff = (await import("@line/liff")).default;
  await liff.init({ liffId });
  liffInstance = liff;
  return liff;
}

export function getLiff(): LiffSdk | null {
  return liffInstance;
}

export async function fetchProfile(): Promise<LiffProfile | null> {
  if (!liffInstance) return null;
  if (!liffInstance.isLoggedIn()) {
    liffInstance.login();
    return null;
  }
  const p = await liffInstance.getProfile();
  return {
    userId: p.userId,
    displayName: p.displayName,
    pictureUrl: p.pictureUrl,
    statusMessage: p.statusMessage,
  };
}

export async function sendFlexMessage(
  flexContent: object,
  altText = "ผลวิเคราะห์ ROI ตู้อัตโนมัติ"
): Promise<{ ok: boolean; reason?: string }> {
  if (!liffInstance) return { ok: false, reason: "LIFF ยังไม่พร้อม" };
  if (!liffInstance.isInClient()) {
    return { ok: false, reason: "กรุณาเปิดผ่านแอป LINE" };
  }
  try {
    await liffInstance.sendMessages([
      {
        type: "flex",
        altText,
        contents: flexContent,
      } as unknown as Parameters<LiffSdk["sendMessages"]>[0][number],
    ]);
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "ส่งไม่สำเร็จ";
    return { ok: false, reason: msg };
  }
}

export function closeLiff(): void {
  if (liffInstance?.isInClient()) liffInstance.closeWindow();
}

export function isInClient(): boolean {
  return !!liffInstance?.isInClient();
}

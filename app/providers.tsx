"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { LiffProfile, LiffState } from "@/types";
import { fetchProfile, initLiff, isInClient } from "@/lib/liff";

interface LiffContextValue extends LiffState {
  userId: string;
  refreshProfile: () => Promise<void>;
}

const defaultState: LiffContextValue = {
  isReady: false,
  isInClient: false,
  isLoggedIn: false,
  profile: null,
  error: null,
  userId: "anonymous",
  refreshProfile: async () => undefined,
};

const LiffContext = createContext<LiffContextValue>(defaultState);

export function useLiff(): LiffContextValue {
  return useContext(LiffContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LiffState>({
    isReady: false,
    isInClient: false,
    isLoggedIn: false,
    profile: null,
    error: null,
  });

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await fetchProfile();
      setState((s) => ({
        ...s,
        profile,
        isLoggedIn: !!profile,
      }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "โหลด profile ไม่สำเร็จ";
      setState((s) => ({ ...s, error: msg }));
    }
  }, []);

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    if (!liffId) {
      setState((s) => ({
        ...s,
        isReady: true,
        error: "ยังไม่ได้ตั้งค่า NEXT_PUBLIC_LIFF_ID",
      }));
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const liff = await initLiff(liffId);
        if (cancelled) return;
        const inClient = isInClient();
        let profile: LiffProfile | null = null;
        if (liff.isLoggedIn()) {
          const p = await liff.getProfile();
          profile = {
            userId: p.userId,
            displayName: p.displayName,
            pictureUrl: p.pictureUrl,
            statusMessage: p.statusMessage,
          };
        }
        if (cancelled) return;
        setState({
          isReady: true,
          isInClient: inClient,
          isLoggedIn: liff.isLoggedIn(),
          profile,
          error: null,
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "LIFF init ล้มเหลว";
        if (!cancelled) setState((s) => ({ ...s, isReady: true, error: msg }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<LiffContextValue>(
    () => ({
      ...state,
      userId: state.profile?.userId ?? "anonymous",
      refreshProfile,
    }),
    [state, refreshProfile]
  );

  return <LiffContext.Provider value={value}>{children}</LiffContext.Provider>;
}

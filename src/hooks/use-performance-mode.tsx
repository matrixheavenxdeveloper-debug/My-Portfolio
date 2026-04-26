import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

type PerformanceModeContextValue = {
  perfMode: boolean;
  togglePerfMode: () => void;
  setPerfMode: (v: boolean) => void;
};

const STORAGE_KEY = "heavenx:perf-mode";

const PerformanceModeContext = createContext<PerformanceModeContextValue | undefined>(undefined);

const detectInitial = (): boolean => {
  if (typeof window === "undefined") return false;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "1") return true;
  if (stored === "0") return false;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  const saveData = nav.connection?.saveData === true;
  const slowNetwork = ["slow-2g", "2g", "3g"].includes(nav.connection?.effectiveType ?? "");
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const smallScreen = window.matchMedia?.("(max-width: 767px)").matches;

  return Boolean(lowCpu || lowMemory || saveData || slowNetwork || reduced || smallScreen);
};

export const PerformanceModeProvider = ({ children }: { children: ReactNode }) => {
  const [perfMode, setPerfModeState] = useState<boolean>(false);

  useEffect(() => {
    setPerfModeState(detectInitial());
  }, []);

  const setPerfMode = useCallback((v: boolean) => {
    setPerfModeState(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const togglePerfMode = useCallback(() => setPerfMode(!perfMode), [perfMode, setPerfMode]);

  return (
    <PerformanceModeContext.Provider value={{ perfMode, togglePerfMode, setPerfMode }}>
      {children}
    </PerformanceModeContext.Provider>
  );
};

export const usePerformanceMode = (): PerformanceModeContextValue => {
  const ctx = useContext(PerformanceModeContext);
  if (!ctx) {
    return { perfMode: false, togglePerfMode: () => {}, setPerfMode: () => {} };
  }
  return ctx;
};

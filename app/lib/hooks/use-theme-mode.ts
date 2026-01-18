"use client";

import { useCallback, useSyncExternalStore } from "react";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "event-loop-theme";

const listeners = new Set<() => void>();
let currentTheme: ThemeMode = "light";
let hasHydrated = false;

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(
    STORAGE_KEY,
  ) as ThemeMode | null;
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  ).matches;
  return prefersDark ? "dark" : "light";
};

const applyTheme = (mode: ThemeMode) => {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = mode;
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }
};

const setThemeValue = (mode: ThemeMode) => {
  currentTheme = mode;
  applyTheme(mode);
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getClientSnapshot = (): ThemeMode => {
  if (!hasHydrated) {
    currentTheme = getPreferredTheme();
    applyTheme(currentTheme);
    hasHydrated = true;
  }
  return currentTheme;
};

const getServerSnapshot = (): ThemeMode => "light";

export function useThemeMode() {
  const theme = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const toggleTheme = useCallback(() => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setThemeValue(nextTheme);
  }, [theme]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeValue(mode);
  }, []);

  return {
    theme,
    isDarkMode: theme === "dark",
    toggleTheme,
    setTheme,
  };
}

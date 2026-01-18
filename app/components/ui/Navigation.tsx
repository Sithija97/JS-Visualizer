"use client";

import { Code2, Moon, Sun } from "lucide-react";

type NavigationProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export function Navigation({ isDarkMode, onToggleTheme }: NavigationProps) {
  return (
    <nav className="border-b border-[var(--color-card-border)] bg-[var(--color-surface)]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-13 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="text-[var(--color-text-primary)]" size={24} />
            <span className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
              UnderTheHood
            </span>
          </div>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg transition-colors bg-[var(--color-control-surface)] hover:opacity-80"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-[var(--color-text-primary)]" />
            ) : (
              <Moon size={20} className="text-[var(--color-text-primary)]" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

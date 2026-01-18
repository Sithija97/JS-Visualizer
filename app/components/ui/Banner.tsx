"use client";

import { X } from "lucide-react";

type BannerProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function Banner({ isVisible, onClose }: BannerProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-[var(--color-accent)] px-4 py-2 text-center text-sm font-medium tracking-wide text-[var(--color-banner-text)]">
      Interactive JavaScript Event Loop Visualizer • Learn async execution
      step-by-step →
      <button
        onClick={onClose}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 transition-colors hover:bg-black/10"
        aria-label="Close banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

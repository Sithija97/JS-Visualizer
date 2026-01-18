"use client";

import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";

type VisualizerControlsProps = {
  isPlaying: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
};

export function VisualizerControls({
  isPlaying,
  isFirstStep,
  isLastStep,
  onPlayPause,
  onPrevious,
  onNext,
  onReset,
}: VisualizerControlsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onPlayPause}
        className="flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 font-medium text-black transition-colors"
      >
        {isPlaying ? (
          <>
            <Pause size={18} /> Pause
          </>
        ) : (
          <>
            <Play size={18} /> Play demo
          </>
        )}
      </button>

      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className="flex items-center gap-2 rounded-lg border border-[var(--color-control-border)] bg-[var(--color-control-surface)] px-5 py-3 font-medium text-[var(--color-text-primary)] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} /> Previous
      </button>

      <button
        onClick={onNext}
        disabled={isLastStep}
        className="flex items-center gap-2 rounded-lg border border-[var(--color-control-border)] bg-[var(--color-control-surface)] px-5 py-3 font-medium text-[var(--color-text-primary)] transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next <ChevronRight size={18} />
      </button>

      <button
        onClick={onReset}
        className="flex items-center gap-2 rounded-lg border border-[var(--color-control-border)] bg-[var(--color-control-surface)] px-5 py-3 font-medium text-[var(--color-text-primary)] transition-colors"
      >
        <RotateCcw size={18} /> Reset
      </button>
    </div>
  );
}

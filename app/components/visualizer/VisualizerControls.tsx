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
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onPlayPause}
        className="flex items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-black transition-colors hover:opacity-90"
      >
        {isPlaying ? (
          <>
            <Pause size={14} /> Pause
          </>
        ) : (
          <>
            <Play size={14} /> Play
          </>
        )}
      </button>

      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className="flex items-center gap-1.5 rounded-md bg-[var(--color-control-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={14} /> Prev
      </button>

      <button
        onClick={onNext}
        disabled={isLastStep}
        className="flex items-center gap-1.5 rounded-md bg-[var(--color-control-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next <ChevronRight size={14} />
      </button>

      <button
        onClick={onReset}
        className="flex items-center gap-1.5 rounded-md bg-[var(--color-control-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:opacity-90"
      >
        <RotateCcw size={14} /> Reset
      </button>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

type VisualizerControlsProps = {
  isPlaying: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  maximizedContent?: ReactNode;
};

export function VisualizerControls({
  isPlaying,
  isFirstStep,
  isLastStep,
  onPlayPause,
  onPrevious,
  onNext,
  onReset,
  maximizedContent,
}: VisualizerControlsProps) {
  const showMaximize = Boolean(maximizedContent);

  return (
    <div className="flex flex-wrap gap-2 ">
      <button
        onClick={onPlayPause}
        className="flex items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-black transition-colors hover:opacity-90 cursor-pointer"
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
        className="flex items-center gap-1.5 rounded-md bg-[var(--color-control-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] cursor-pointer transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={14} /> Prev
      </button>

      <button
        onClick={onNext}
        disabled={isLastStep}
        className="flex items-center gap-1.5 rounded-md bg-[var(--color-control-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] cursor-pointer transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next <ChevronRight size={14} />
      </button>

      <button
        onClick={onReset}
        className="flex items-center gap-1.5 rounded-md bg-[var(--color-control-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] cursor-pointer transition-colors hover:opacity-90"
      >
        <RotateCcw size={14} /> Reset
      </button>
      {showMaximize ? (
        <Dialog>
          <DialogTrigger asChild>
            <button
              title="Maximize"
              className="ml-auto flex items-center gap-1.5 rounded-md bg-[var(--color-control-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:opacity-90"
            >
              <Maximize size={14} />
            </button>
          </DialogTrigger>
          <DialogContent className="h-[94vh] w-[98vw] max-w-[1900px] overflow-hidden">
            <div className="flex h-full flex-col gap-3 overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <DialogHeader>
                  <DialogTitle>Expanded Visualizer</DialogTitle>
                  <DialogDescription>
                    Full-size view of the event loop visualization.
                  </DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                  <button
                    aria-label="Close"
                    className="rounded-md border border-white/10 bg-white/5 p-2 text-[var(--color-text-primary)] transition-colors hover:bg-white/10"
                  >
                    <span className="text-lg leading-none">×</span>
                  </button>
                </DialogClose>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden">
                {maximizedContent}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}

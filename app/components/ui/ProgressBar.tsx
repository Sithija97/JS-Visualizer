"use client";

type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progressPercentage = ((current + 1) / total) * 100;

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs font-medium text-[var(--color-text-secondary)]">
        <span>
          Step {current + 1} of {total}
        </span>
      </div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
        <div
          className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={current + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label="Visualizer progress"
        />
      </div>
    </div>
  );
}

"use client";

type CurrentStepDisplayProps = {
  description: string;
  explanation: string;
  highlight: string;
};

export function CurrentStepDisplay({
  description,
  explanation,
  highlight,
}: CurrentStepDisplayProps) {
  return (
    <div className="rounded-xl bg-[var(--color-surface)] p-4">
      <h2 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">
        {description}
      </h2>
      <p className="mb-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {explanation}
      </p>
      <div className="rounded-lg bg-[var(--color-surface-muted)] p-3 font-mono text-xs text-[var(--color-text-primary)]">
        {highlight}
      </div>
    </div>
  );
}

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
    <div className="rounded-2xl bg-[var(--color-surface)] p-8">
      <h2 className="mb-3 text-2xl font-bold text-[var(--color-text-primary)]">
        {description}
      </h2>
      <p className="mb-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
        {explanation}
      </p>
      <div className="rounded-xl bg-[var(--color-surface-muted)] p-5 font-mono text-sm text-[var(--color-text-primary)]">
        {highlight}
      </div>
    </div>
  );
}

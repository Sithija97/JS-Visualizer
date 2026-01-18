"use client";

type ConsoleOutputProps = {
  output: string[];
};

export function ConsoleOutput({ output }: ConsoleOutputProps) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface)] p-6">
      <div className="mb-5 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[var(--color-console-text)]" />
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
          Console Output
        </h3>
      </div>
      <div className="min-h-[160px] rounded-xl border border-[var(--color-console-border)] bg-[var(--color-console-bg)] p-5 font-mono text-sm">
        {output.length === 0 ? (
          <div className="text-[var(--color-muted)]">No output yet...</div>
        ) : (
          output.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className="mb-1 text-[var(--color-console-text)]"
            >
              &gt; {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

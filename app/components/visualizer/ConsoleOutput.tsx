"use client";

type ConsoleOutputProps = {
  output: string[];
};

export function ConsoleOutput({ output }: ConsoleOutputProps) {
  return (
    <div className="flex h-full flex-col rounded-xl bg-[var(--color-surface)] p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[var(--color-console-text)]" />
        <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
          Console Output
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto rounded-lg border border-[var(--color-console-border)] bg-[var(--color-console-bg)] p-4 font-mono text-xs">
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

"use client";

type QueueType = "callstack" | "microtask" | "callback";

type QueueVisualizerProps = {
  title: string;
  subtitle?: string;
  items: string[];
  queueType: QueueType;
};

const queueStyles: Record<QueueType, { dotClass: string; itemClass: string }> =
  {
    callstack: {
      dotClass: "bg-[var(--color-queue-callstack-border)]",
      itemClass:
        "bg-[var(--color-queue-callstack-bg)] text-[var(--color-queue-callstack-text)]",
    },
    microtask: {
      dotClass: "bg-[var(--color-queue-microtask-border)]",
      itemClass:
        "bg-[var(--color-queue-microtask-bg)] text-[var(--color-queue-microtask-text)]",
    },
    callback: {
      dotClass: "bg-[var(--color-queue-callback-border)]",
      itemClass:
        "bg-[var(--color-queue-callback-bg)] text-[var(--color-queue-callback-text)]",
    },
  };

export function QueueVisualizer({
  title,
  subtitle,
  items,
  queueType,
}: QueueVisualizerProps) {
  const style = queueStyles[queueType];

  return (
    <div className="rounded-2xl bg-[var(--color-surface)] p-6">
      <div className="mb-2 flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${style.dotClass}`} />
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
          {title}
        </h3>
      </div>
      {subtitle ? (
        <p className="mb-5 text-xs text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      ) : null}

      <div className="min-h-[220px] space-y-2">
        {items.length === 0 ? (
          <div className="py-12 text-center text-sm text-[var(--color-muted)]">
            Empty
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className={`rounded-xl  p-4 font-mono text-sm ${style.itemClass}`}
            >
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

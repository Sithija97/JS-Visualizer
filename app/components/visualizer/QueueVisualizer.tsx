"use client";

import { cn } from "@/lib/utils";

type QueueType = "callstack" | "microtask" | "callback";

type QueueVisualizerProps = {
  title: string;
  subtitle?: string;
  items: string[];
  queueType: QueueType;
  disableScroll?: boolean;
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
  disableScroll = false,
}: QueueVisualizerProps) {
  const style = queueStyles[queueType];

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl bg-[var(--color-surface)] p-4",
        disableScroll ? "h-auto" : "h-full",
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${style.dotClass}`} />
        <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
          {title}
        </h3>
      </div>
      {subtitle ? (
        <p className="mb-3 text-xs text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      ) : null}

      <div
        className={cn(
          "space-y-1.5",
          disableScroll ? "" : "flex-1 overflow-y-auto",
        )}
      >
        {items.length === 0 ? (
          <div className="py-6 text-center text-xs text-[var(--color-muted)]">
            Empty
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className={`rounded-lg p-2.5 font-mono text-xs ${style.itemClass}`}
            >
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

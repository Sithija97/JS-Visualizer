"use client";

import { KEY_CONCEPTS } from "../../lib/constants/key-concepts";

export function KeyConcepts() {
  return (
    <div className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-surface)] p-8">
      <h3 className="mb-6 text-xl font-bold text-[var(--color-text-primary)]">
        Key Concepts
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {KEY_CONCEPTS.map((concept) => (
          <article key={concept.title} className="space-y-2">
            <h4 className="font-bold" style={{ color: concept.accent }}>
              {concept.title}
            </h4>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {concept.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

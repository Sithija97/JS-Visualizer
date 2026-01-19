"use client";

import { Play } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRunCode: () => void;
  isDarkMode?: boolean;
}

const DEFAULT_CODE = `console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');`;

export function CodeEditor({
  code,
  onChange,
  onRunCode,
  isDarkMode = false,
}: CodeEditorProps) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-[var(--color-card-bg)] shadow-md">
      {/* Header */}
      <div className="bg-[var(--color-surface)] px-3 py-2">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-1.5 text-xs font-medium text-[var(--color-text-primary)]">
            script.js
          </span>
        </div>
        <button
          onClick={onRunCode}
          className="flex items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-black transition-colors hover:opacity-90 cursor-pointer"
        >
          <Play className="h-3.5 w-3.5" />
          Visualize
        </button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-auto p-4">
        <TextareaAutosize
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-none bg-transparent font-mono text-sm text-[var(--color-text-primary)] outline-none"
          style={{
            lineHeight: "1.6",
            tabSize: 2,
          }}
          minRows={10}
          placeholder="// Write your JavaScript code here..."
        />
      </div>

      {/* Tips Footer */}
      <div className="bg-[var(--color-accent-light)] p-3">
        <h3 className="mb-2 text-xs font-semibold text-[var(--color-text-primary)]">
          💡 Quick Tips:
        </h3>
        <ul className="space-y-1 text-xs text-[var(--color-text-secondary)]">
          <li>
            •{" "}
            <code className="rounded bg-[var(--color-card-bg)] px-1 py-0.5">
              console.log()
            </code>{" "}
            for output
          </li>
          <li>
            •{" "}
            <code className="rounded bg-[var(--color-card-bg)] px-1 py-0.5">
              setTimeout()
            </code>{" "}
            for macrotasks
          </li>
          <li>
            •{" "}
            <code className="rounded bg-[var(--color-card-bg)] px-1 py-0.5">
              Promise
            </code>{" "}
            /{" "}
            <code className="rounded bg-[var(--color-card-bg)] px-1 py-0.5">
              async/await
            </code>{" "}
            for microtasks
          </li>
        </ul>
      </div>
    </div>
  );
}

export { DEFAULT_CODE };

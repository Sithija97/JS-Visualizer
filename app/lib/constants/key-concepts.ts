export type KeyConcept = {
  title: string;
  description: string;
  accent: string;
};

export const KEY_CONCEPTS: KeyConcept[] = [
  {
    title: "Call Stack",
    description:
      "Where code executes synchronously. Functions follow a strict Last In, First Out order as they are pushed and popped.",
    accent: "var(--color-queue-callstack-text)",
  },
  {
    title: "Microtask Queue",
    description:
      "High priority queue for Promises and async/await continuations. The event loop drains this queue before touching macrotasks.",
    accent: "var(--color-queue-microtask-text)",
  },
  {
    title: "Callback Queue",
    description:
      "Home of macrotasks such as setTimeout, setInterval, and DOM events. Processed when the call stack is clear and microtasks are done.",
    accent: "var(--color-queue-callback-text)",
  },
  {
    title: "Event Loop",
    description:
      "The conductor that keeps JavaScript responsive by checking the call stack, flushing microtasks, then promoting macrotasks.",
    accent: "var(--color-console-text)",
  },
];

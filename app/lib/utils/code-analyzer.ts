import { EventLoopStep } from "../constants/event-loop-steps";

type AnalyzerEvent =
  | { type: "start" }
  | { type: "sync-complete" }
  | { type: "log"; message: string; task?: string }
  | { type: "microtask-queued"; label: string }
  | { type: "macrotask-queued"; label: string }
  | { type: "microtask-start"; label: string }
  | { type: "microtask-end"; label: string }
  | { type: "macrotask-start"; label: string }
  | { type: "macrotask-end"; label: string }
  | { type: "error"; message: string };

type AnalyzerResult = {
  events: AnalyzerEvent[];
};

const DEFAULT_STEP: EventLoopStep = {
  step: 0,
  description: "Click 'Visualize' to analyze your code",
  callStack: [],
  microtaskQueue: [],
  callbackQueue: [],
  output: [],
  highlight: "Ready",
  explanation:
    "Write your JavaScript code above and click the Visualize button to see how the event loop processes it step by step.",
};

const ERROR_STEP: EventLoopStep = {
  step: 0,
  description: "Error: Unable to analyze code",
  callStack: [],
  microtaskQueue: [],
  callbackQueue: [],
  output: ["Error: Please check your code syntax"],
  highlight: "ERROR",
  explanation:
    "There was an error analyzing your code. Please ensure it's valid JavaScript.",
};

export async function analyzeCode(code: string): Promise<EventLoopStep[]> {
  if (typeof window === "undefined" || typeof Worker === "undefined") {
    return [ERROR_STEP];
  }

  const result = await runInWorker(code);
  return buildSteps(result);
}

async function runInWorker(code: string): Promise<AnalyzerResult> {
  const workerScript = createWorkerScript();
  const blob = new Blob([workerScript], { type: "application/javascript" });
  const workerUrl = URL.createObjectURL(blob);
  const worker = new Worker(workerUrl);

  return new Promise((resolve) => {
    const cleanup = () => {
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
    };

    worker.onmessage = (event) => {
      if (event.data?.type === "done") {
        cleanup();
        resolve({ events: event.data.events as AnalyzerEvent[] });
      }

      if (event.data?.type === "error") {
        cleanup();
        resolve({
          events: [{ type: "error", message: event.data.message || "Error" }],
        });
      }
    };

    worker.postMessage({ code });
  });
}

function createWorkerScript(): string {
  return `
self.onmessage = (event) => {
  const code = event.data.code || "";
  const events = [];
  let currentTask = null;
  let pendingMicro = 0;
  let pendingMacro = 0;
  let microId = 0;
  let macroId = 0;

  const record = (payload) => events.push(payload);

  const baseSetTimeout = self.setTimeout.bind(self);
  const baseQueueMicrotask = self.queueMicrotask
    ? self.queueMicrotask.bind(self)
    : (cb) => Promise.resolve().then(cb);

  const checkDone = () => {
    if (pendingMicro === 0 && pendingMacro === 0) {
      baseSetTimeout(() => {
        if (pendingMicro === 0 && pendingMacro === 0) {
          self.postMessage({ type: "done", events });
        }
      }, 0);
    }
  };

  console.log = (...args) => {
    const message = args.map(String).join(" ");
    record({ type: "log", message, task: currentTask || undefined });
  };

  const scheduleMicrotask = (label, callback) => {
    pendingMicro += 1;
    record({ type: "microtask-queued", label });

    baseQueueMicrotask(() => {
      currentTask = label;
      record({ type: "microtask-start", label });
      try {
        callback();
      } catch (err) {
        record({ type: "error", message: String(err) });
      }
      record({ type: "microtask-end", label });
      currentTask = null;
      pendingMicro -= 1;
      checkDone();
    });
  };

  self.queueMicrotask = (callback) => {
    const label = "queueMicrotask #" + (++microId);
    scheduleMicrotask(label, callback);
  };

  self.setTimeout = (callback, delay, ...args) => {
    const label = "setTimeout callback #" + (++macroId);
    pendingMacro += 1;
    record({ type: "macrotask-queued", label });

    baseSetTimeout(() => {
      currentTask = label;
      record({ type: "macrotask-start", label });
      try {
        if (typeof callback === "function") {
          callback(...args);
        }
      } catch (err) {
        record({ type: "error", message: String(err) });
      }
      record({ type: "macrotask-end", label });
      currentTask = null;
      pendingMacro -= 1;
      checkDone();
    }, 0);

    return macroId;
  };

  const originalThen = Promise.prototype.then;
  Promise.prototype.then = function (onFulfilled, onRejected) {
    const label = "promise.then() #" + (++microId);
    pendingMicro += 1;
    record({ type: "microtask-queued", label });

    const wrap = (handler, isRejection) => (value) => {
      currentTask = label;
      record({ type: "microtask-start", label });
      try {
        if (typeof handler === "function") {
          return handler(value);
        }
        if (isRejection) {
          throw value;
        }
        return value;
      } finally {
        record({ type: "microtask-end", label });
        currentTask = null;
        pendingMicro -= 1;
        checkDone();
      }
    };

    return originalThen.call(this, wrap(onFulfilled, false), wrap(onRejected, true));
  };

  try {
    record({ type: "start" });
    const runner = new Function(code);
    runner();
    record({ type: "sync-complete" });
  } catch (err) {
    record({ type: "error", message: String(err) });
  } finally {
    checkDone();
  }
};
  `;
}

function buildSteps(result: AnalyzerResult): EventLoopStep[] {
  const steps: EventLoopStep[] = [DEFAULT_STEP];
  const state = {
    callStack: [] as string[],
    microtaskQueue: [] as string[],
    callbackQueue: [] as string[],
    output: [] as string[],
  };

  const addStep = (
    description: string,
    highlight: string,
    explanation: string,
  ) => {
    steps.push({
      step: steps.length,
      description,
      callStack: [...state.callStack],
      microtaskQueue: [...state.microtaskQueue],
      callbackQueue: [...state.callbackQueue],
      output: [...state.output],
      highlight,
      explanation,
    });
  };

  let eventLoopStarted = false;

  for (const event of result.events) {
    if (event.type === "error") {
      return [ERROR_STEP];
    }

    if (event.type === "microtask-queued") {
      state.microtaskQueue.push(event.label);
      addStep(
        `Microtask queued: ${event.label}`,
        event.label,
        "Microtask added to the Microtask Queue",
      );
      continue;
    }

    if (event.type === "macrotask-queued") {
      state.callbackQueue.push(event.label);
      addStep(
        `Macrotask queued: ${event.label}`,
        event.label,
        "Macrotask added to the Callback Queue",
      );
      continue;
    }

    if (event.type === "microtask-start") {
      if (!eventLoopStarted) {
        eventLoopStarted = true;
        addStep(
          "Call Stack EMPTY! Event Loop starts",
          "EVENT LOOP STARTS",
          "Call stack is empty. Event loop will process ALL microtasks first, then macrotasks",
        );
      }

      state.microtaskQueue = state.microtaskQueue.filter(
        (item) => item !== event.label,
      );
      state.callStack = [event.label];
      addStep(
        `Process Microtask: ${event.label}`,
        event.label,
        "Microtask executes - promises have priority over macrotasks",
      );
      continue;
    }

    if (event.type === "microtask-end") {
      state.callStack = [];
      addStep(
        `Complete Microtask: ${event.label}`,
        event.label,
        "Microtask finished. Call stack is now empty.",
      );
      continue;
    }

    if (event.type === "macrotask-start") {
      if (!eventLoopStarted) {
        eventLoopStarted = true;
        addStep(
          "Call Stack EMPTY! Event Loop starts",
          "EVENT LOOP STARTS",
          "Call stack is empty. Event loop will process ALL microtasks first, then macrotasks",
        );
      }

      state.callbackQueue = state.callbackQueue.filter(
        (item) => item !== event.label,
      );
      state.callStack = [event.label];
      addStep(
        `Process Macrotask: ${event.label}`,
        event.label,
        "Macrotask executes from the Callback Queue",
      );
      continue;
    }

    if (event.type === "macrotask-end") {
      state.callStack = [];
      addStep(
        `Complete Macrotask: ${event.label}`,
        event.label,
        "Macrotask finished. Call stack is now empty.",
      );
      continue;
    }

    if (event.type === "log") {
      const logLabel = `console.log('${event.message}')`;
      if (event.task) {
        state.callStack = [event.task, logLabel];
      } else {
        state.callStack = [logLabel];
      }

      addStep(
        `Execute: ${logLabel}`,
        logLabel,
        "console.log executes in the current task context",
      );

      state.output.push(event.message);
      state.callStack = event.task ? [event.task] : [];
    }
  }

  addStep(
    "COMPLETE! All queues empty",
    "DONE ✓",
    "Execution complete. All tasks have been processed by the event loop.",
  );

  return steps;
}

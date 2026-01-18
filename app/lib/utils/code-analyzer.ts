import { EventLoopStep } from "../constants/event-loop-steps";

interface ExecutionState {
  callStack: string[];
  microtaskQueue: string[];
  callbackQueue: string[];
  output: string[];
}

export class CodeAnalyzer {
  private code: string;

  constructor(code: string) {
    this.code = code;
  }

  analyze(): EventLoopStep[] {
    try {
      return this.simpleAnalyze();
    } catch (error) {
      console.error("Error analyzing code:", error);
      return this.getErrorSteps();
    }
  }

  private simpleAnalyze(): EventLoopStep[] {
    const steps: EventLoopStep[] = [];
    const state: ExecutionState = {
      callStack: [],
      microtaskQueue: [],
      callbackQueue: [],
      output: [],
    };

    const lines = this.code
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("//"));

    // Initial state
    steps.push({
      step: 0,
      description: "Initial state - Code starts executing",
      callStack: [],
      microtaskQueue: [],
      callbackQueue: [],
      output: [],
      highlight: "Ready to execute",
      explanation:
        "The JavaScript engine is ready to execute your code synchronously first",
    });

    let stepNumber = 1;
    let asyncFunctionName = "";
    let inAsyncFunction = false;
    let afterAwait = false;
    let timeoutCount = 0;
    let promiseCount = 0;
    let asyncCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip function declarations (we'll handle calls)
      if (line.startsWith("async function") || line.startsWith("function")) {
        const match = line.match(/function\s+(\w+)/);
        if (match && line.startsWith("async")) {
          asyncFunctionName = match[1];
        }
        continue;
      }

      // Async function call
      if (line.includes(`${asyncFunctionName}()`) && asyncFunctionName) {
        state.callStack.push(`${asyncFunctionName}()`);
        steps.push({
          step: stepNumber++,
          description: `Call async function: ${asyncFunctionName}()`,
          callStack: [...state.callStack],
          microtaskQueue: [...state.microtaskQueue],
          callbackQueue: [...state.callbackQueue],
          output: [...state.output],
          highlight: line,
          explanation: `${asyncFunctionName} is an async function, it starts executing synchronously`,
        });
        inAsyncFunction = true;
        continue;
      }

      // console.log
      if (line.includes("console.log")) {
        const match = line.match(/console\.log\(['"](.+?)['"]\)/);
        if (match) {
          const logMessage = match[1];

          state.callStack.push(`console.log('${logMessage}')`);
          steps.push({
            step: stepNumber++,
            description: `Execute: console.log('${logMessage}')`,
            callStack: [...state.callStack],
            microtaskQueue: [...state.microtaskQueue],
            callbackQueue: [...state.callbackQueue],
            output: [...state.output],
            highlight: line,
            explanation: afterAwait
              ? "This runs after await completes, as part of a microtask"
              : "Synchronous console.log executes immediately",
          });

          state.output.push(logMessage);
          state.callStack.pop();

          if (afterAwait) {
            afterAwait = false;
          }
        }
      }

      // setTimeout
      if (line.includes("setTimeout")) {
        timeoutCount++;
        state.callStack.push("setTimeout()");
        steps.push({
          step: stepNumber++,
          description: "setTimeout() is called",
          callStack: [...state.callStack],
          microtaskQueue: [...state.microtaskQueue],
          callbackQueue: [...state.callbackQueue],
          output: [...state.output],
          highlight: line,
          explanation: "setTimeout sends callback to Web API timer",
        });

        state.callStack.pop();
        state.callbackQueue.push(`setTimeout callback #${timeoutCount}`);

        steps.push({
          step: stepNumber++,
          description: "setTimeout callback registered in Callback Queue",
          callStack: [...state.callStack],
          microtaskQueue: [...state.microtaskQueue],
          callbackQueue: [...state.callbackQueue],
          output: [...state.output],
          highlight: line,
          explanation:
            "After timer expires, callback waits in the Callback Queue (Macrotask Queue)",
        });
      }

      // await
      if (line.includes("await")) {
        asyncCount++;
        const funcMatch = line.match(/await\s+(\w+)\(/);
        const funcName = funcMatch ? funcMatch[1] : "async operation";

        state.callStack.push(`${funcName}()`);
        steps.push({
          step: stepNumber++,
          description: `Execute: await ${funcName}()`,
          callStack: [...state.callStack],
          microtaskQueue: [...state.microtaskQueue],
          callbackQueue: [...state.callbackQueue],
          output: [...state.output],
          highlight: line,
          explanation: `${funcName}() executes synchronously first`,
        });

        state.callStack.pop();
        state.microtaskQueue.push(`async continuation #${asyncCount}`);

        steps.push({
          step: stepNumber++,
          description:
            "Await pauses execution, continuation queued as microtask",
          callStack: [...state.callStack],
          microtaskQueue: [...state.microtaskQueue],
          callbackQueue: [...state.callbackQueue],
          output: [...state.output],
          highlight: line,
          explanation:
            "Everything after 'await' becomes a microtask. Function pauses here.",
        });

        afterAwait = true;
      }

      // new Promise
      if (line.includes("new Promise")) {
        promiseCount++;
        state.callStack.push("Promise executor");
        steps.push({
          step: stepNumber++,
          description: "new Promise - executor runs synchronously",
          callStack: [...state.callStack],
          microtaskQueue: [...state.microtaskQueue],
          callbackQueue: [...state.callbackQueue],
          output: [...state.output],
          highlight: line,
          explanation:
            "Promise executor function runs immediately and synchronously",
        });
        state.callStack.pop();
      }

      // .then()
      if (line.includes(".then(")) {
        state.microtaskQueue.push(`promise.then() #${promiseCount}`);
        steps.push({
          step: stepNumber++,
          description: ".then() callback added to Microtask Queue",
          callStack: [...state.callStack],
          microtaskQueue: [...state.microtaskQueue],
          callbackQueue: [...state.callbackQueue],
          output: [...state.output],
          highlight: line,
          explanation: ".then() registers callback in the Microtask Queue",
        });
      }
    }

    // Event loop processing
    if (
      state.callStack.length === 0 &&
      (state.microtaskQueue.length > 0 || state.callbackQueue.length > 0)
    ) {
      steps.push({
        step: stepNumber++,
        description: "Call Stack EMPTY! Event Loop starts",
        callStack: [],
        microtaskQueue: [...state.microtaskQueue],
        callbackQueue: [...state.callbackQueue],
        output: [...state.output],
        highlight: "EVENT LOOP STARTS",
        explanation:
          "Call stack is empty. Event loop will process ALL microtasks first, then macrotasks",
      });

      // Process all microtasks
      while (state.microtaskQueue.length > 0) {
        const microtask = state.microtaskQueue.shift()!;
        steps.push({
          step: stepNumber++,
          description: `Process Microtask: ${microtask}`,
          callStack: [microtask],
          microtaskQueue: [...state.microtaskQueue],
          callbackQueue: [...state.callbackQueue],
          output: [...state.output],
          highlight: microtask,
          explanation:
            "Microtask executes - promises have priority over macrotasks",
        });
      }

      // Check for macrotasks only after all microtasks are done
      if (state.callbackQueue.length > 0) {
        steps.push({
          step: stepNumber++,
          description: "All Microtasks complete! Moving to Macrotasks",
          callStack: [],
          microtaskQueue: [],
          callbackQueue: [...state.callbackQueue],
          output: [...state.output],
          highlight: "MACROTASK PHASE",
          explanation:
            "Microtask queue is empty. Event loop now processes one macrotask",
        });
      }

      // Process macrotasks
      while (state.callbackQueue.length > 0) {
        const macrotask = state.callbackQueue.shift()!;
        steps.push({
          step: stepNumber++,
          description: `Process Macrotask: ${macrotask}`,
          callStack: [macrotask],
          microtaskQueue: [],
          callbackQueue: [...state.callbackQueue],
          output: [...state.output],
          highlight: macrotask,
          explanation: "Macrotask executes from the Callback Queue",
        });
      }
    }

    // Final state
    steps.push({
      step: stepNumber,
      description: "COMPLETE! All queues empty",
      callStack: [],
      microtaskQueue: [],
      callbackQueue: [],
      output: [...state.output],
      highlight: "DONE ✓",
      explanation:
        "Execution complete. All tasks have been processed by the event loop.",
    });

    return steps;
  }

  private getErrorSteps(): EventLoopStep[] {
    return [
      {
        step: 0,
        description: "Error: Unable to parse code",
        callStack: [],
        microtaskQueue: [],
        callbackQueue: [],
        output: ["Error: Please check your code syntax"],
        highlight: "ERROR",
        explanation:
          "There was an error analyzing your code. Please ensure it's valid JavaScript.",
      },
    ];
  }
}

export function analyzeCode(code: string): EventLoopStep[] {
  const analyzer = new CodeAnalyzer(code);
  return analyzer.analyze();
}

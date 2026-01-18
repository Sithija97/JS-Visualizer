"use client";

import { useEffect, useState } from "react";
import { Banner } from "../ui/Banner";
import { Navigation } from "../ui/Navigation";
import { ProgressBar } from "../ui/ProgressBar";
import { VisualizerControls } from "./VisualizerControls";
import { CurrentStepDisplay } from "./CurrentStepDisplay";
import { QueueVisualizer } from "./QueueVisualizer";
import { ConsoleOutput } from "./ConsoleOutput";
import { KeyConcepts } from "./KeyConcepts";
import { CodeEditor, DEFAULT_CODE } from "./CodeEditor";
import { useEventLoopVisualizer } from "../../lib/hooks/use-event-loop-visualizer";
import { useThemeMode } from "../../lib/hooks/use-theme-mode";
import { analyzeCode } from "../../lib/utils/code-analyzer";
import { EventLoopStep } from "../../lib/constants/event-loop-steps";

export function VisualizerExperience() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [hasVisualized, setHasVisualized] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const initialStep: EventLoopStep = {
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

  const errorStep: EventLoopStep = {
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

  const [steps, setSteps] = useState<EventLoopStep[]>([initialStep]);

  useEffect(() => {
    if (!hasVisualized) {
      setSteps([initialStep]);
      return;
    }

    let cancelled = false;

    analyzeCode(code)
      .then((result) => {
        if (!cancelled) {
          setSteps(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSteps([errorStep]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [code, hasVisualized]);

  const {
    currentStepData,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    isPlaying,
    handlePlayPause,
    handlePrevious,
    handleNext,
    handleReset,
  } = useEventLoopVisualizer(steps);

  const { isDarkMode, toggleTheme } = useThemeMode();

  const handleRunCode = () => {
    setHasVisualized(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)] transition-colors duration-300">
      <Banner
        isVisible={isBannerVisible}
        onClose={() => setIsBannerVisible(false)}
      />
      <Navigation isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-[1920px] px-4 py-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-4">
          <h1 className="mb-1 text-xl font-bold text-[var(--color-text-primary)]">
            JavaScript Event Loop Visualizer
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Write your own JavaScript code and visualize how the event loop
            handles async operations, microtasks, and macrotasks in real-time.
          </p>
        </section>

        {/* Main Layout: Code Editor (1/3) + Visualizer (2/3) */}
        <div
          className="flex flex-col gap-6 lg:flex-row"
          style={{
            height: isBannerVisible
              ? "calc(100vh - 220px)"
              : "calc(100vh - 180px)",
          }}
        >
          {/* Left Side - Code Editor (1/3) */}
          <div className="w-full lg:w-1/3 lg:min-w-[400px]">
            <CodeEditor
              code={code}
              onChange={setCode}
              onRunCode={handleRunCode}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Right Side - Visualizer (2/3) */}
          <div className="flex-1">
            {!hasVisualized ? (
              <div className="flex h-full items-center justify-center rounded-2xl bg-[var(--color-surface)] p-12">
                <div className="text-center">
                  <div className="mb-4">
                    <img
                      src="/js.png"
                      alt="JavaScript"
                      className="mx-auto h-24 w-24 rounded-lg"
                    />
                  </div>
                  <h2 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">
                    Ready to Visualize
                  </h2>
                  {/* <Button variant="outline" size="sm">
                    <IconGitBranch /> New Branch
                  </Button> */}
                  <p className="text-[var(--color-text-secondary)]">
                    Edit the code on the left and click "Visualize Code" to see
                    the event loop in action
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col gap-2">
                {/* Controls - Fixed Height */}
                <div className="flex-shrink-0">
                  <VisualizerControls
                    isPlaying={isPlaying}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onPlayPause={handlePlayPause}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onReset={handleReset}
                  />
                  <ProgressBar current={currentStep} total={totalSteps} />
                </div>

                {/* Current Step Display - Compact */}
                <div className="flex-shrink-0">
                  <CurrentStepDisplay
                    description={currentStepData.description}
                    explanation={currentStepData.explanation}
                    highlight={currentStepData.highlight}
                  />
                </div>

                {/* Queues and Console - Flexible Grid */}
                <div className="grid flex-1 grid-cols-1 gap-2 overflow-hidden 2xl:grid-cols-2">
                  {/* Left Column: 3 Queues Stacked - Hidden on xl and below, visible from 2xl */}
                  <div className="hidden flex-col gap-2 overflow-hidden 2xl:flex">
                    <div className="flex-1 overflow-hidden">
                      <QueueVisualizer
                        title="Call Stack"
                        items={currentStepData.callStack}
                        queueType="callstack"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <QueueVisualizer
                        title="Microtask Queue"
                        subtitle="Promises, async/await"
                        items={currentStepData.microtaskQueue}
                        queueType="microtask"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <QueueVisualizer
                        title="Callback Queue"
                        subtitle="setTimeout, setInterval"
                        items={currentStepData.callbackQueue}
                        queueType="callback"
                      />
                    </div>
                  </div>

                  {/* Right Column: Console Output */}
                  <div className="overflow-hidden">
                    <ConsoleOutput output={currentStepData.output} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Key Concepts - Full Width Below */}
        {/* <section className="mt-8">
          <KeyConcepts />
        </section> */}
      </main>
    </div>
  );
}

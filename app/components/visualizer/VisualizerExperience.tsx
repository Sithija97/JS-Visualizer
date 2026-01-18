"use client";

import { useState, useMemo } from "react";
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

export function VisualizerExperience() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [hasVisualized, setHasVisualized] = useState(false);

  const steps = useMemo(() => {
    if (!hasVisualized) {
      return [
        {
          step: 0,
          description: "Click 'Visualize' to analyze your code",
          callStack: [],
          microtaskQueue: [],
          callbackQueue: [],
          output: [],
          highlight: "Ready",
          explanation:
            "Write your JavaScript code above and click the Visualize button to see how the event loop processes it step by step.",
        },
      ];
    }
    return analyzeCode(code);
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
      <Banner />
      <Navigation isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-[1920px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-8">
          <h1 className="mb-3 text-2xl font-bold text-[var(--color-text-primary)]">
            JavaScript Event Loop Visualizer
          </h1>
          <p className="text-md text-[var(--color-text-secondary)]">
            Write your own JavaScript code and visualize how the event loop
            handles async operations, microtasks, and macrotasks in real-time.
          </p>
        </section>

        {/* Main Layout: Code Editor (1/3) + Visualizer (2/3) */}
        <div className="flex gap-6">
          {/* Left Side - Code Editor (1/3) */}
          <div className="w-1/3 min-w-[400px]">
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
                      className="mx-auto h-24 w-24"
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
              <div className="space-y-6">
                {/* Controls */}
                <div>
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

                {/* Current Step Display */}
                <CurrentStepDisplay
                  description={currentStepData.description}
                  explanation={currentStepData.explanation}
                  highlight={currentStepData.highlight}
                />

                {/* Queues */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <QueueVisualizer
                    title="Call Stack"
                    items={currentStepData.callStack}
                    queueType="callstack"
                  />
                  <QueueVisualizer
                    title="Microtask Queue"
                    subtitle="Promises, async/await"
                    items={currentStepData.microtaskQueue}
                    queueType="microtask"
                  />
                  <QueueVisualizer
                    title="Callback Queue"
                    subtitle="setTimeout, setInterval"
                    items={currentStepData.callbackQueue}
                    queueType="callback"
                  />
                </div>

                {/* Console Output */}
                <ConsoleOutput output={currentStepData.output} />
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

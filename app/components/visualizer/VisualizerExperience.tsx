"use client";

import { Banner } from "../ui/Banner";
import { Navigation } from "../ui/Navigation";
import { ProgressBar } from "../ui/ProgressBar";
import { VisualizerControls } from "./VisualizerControls";
import { CurrentStepDisplay } from "./CurrentStepDisplay";
import { QueueVisualizer } from "./QueueVisualizer";
import { ConsoleOutput } from "./ConsoleOutput";
import { KeyConcepts } from "./KeyConcepts";
import { useEventLoopVisualizer } from "../../lib/hooks/use-event-loop-visualizer";
import { useThemeMode } from "../../lib/hooks/use-theme-mode";

export function VisualizerExperience() {
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
  } = useEventLoopVisualizer();

  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)] transition-colors duration-300">
      <Banner />
      <Navigation isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h1 className="mb-4 text-5xl font-bold text-[var(--color-text-primary)]">
            JavaScript Event Loop
          </h1>
          <p className="mb-8 text-xl text-[var(--color-text-secondary)]">
            Visualize how JavaScript handles async operations with the event
            loop, microtasks, and macrotasks. Watch code execution flow through
            the call stack and task queues.
          </p>

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
        </section>

        <section className="mb-8">
          <CurrentStepDisplay
            description={currentStepData.description}
            explanation={currentStepData.explanation}
            highlight={currentStepData.highlight}
          />
        </section>

        <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
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
        </section>

        <section className="mb-8">
          <ConsoleOutput output={currentStepData.output} />
        </section>

        <section>
          <KeyConcepts />
        </section>
      </main>
    </div>
  );
}

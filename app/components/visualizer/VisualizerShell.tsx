"use client";

import type { ReactNode } from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { VisualizerControls } from "./VisualizerControls";
import { CurrentStepDisplay } from "./CurrentStepDisplay";
import { QueueVisualizer } from "./QueueVisualizer";
import { ConsoleOutput } from "./ConsoleOutput";
import { EventLoopStep } from "@/app/lib/constants/event-loop-steps";

type VisualizerShellProps = {
  isPlaying: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStep: number;
  totalSteps: number;
  currentStepData: EventLoopStep;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  maximizedContent?: ReactNode;
};

export function VisualizerShell({
  isPlaying,
  isFirstStep,
  isLastStep,
  currentStep,
  totalSteps,
  currentStepData,
  onPlayPause,
  onPrevious,
  onNext,
  onReset,
  maximizedContent,
}: VisualizerShellProps) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex-shrink-0">
        <VisualizerControls
          isPlaying={isPlaying}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onPlayPause={onPlayPause}
          onPrevious={onPrevious}
          onNext={onNext}
          onReset={onReset}
          maximizedContent={maximizedContent}
        />
        <ProgressBar current={currentStep} total={totalSteps} />
      </div>

      <div className="flex-shrink-0">
        <CurrentStepDisplay
          description={currentStepData.description}
          explanation={currentStepData.explanation}
          highlight={currentStepData.highlight}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="hidden grid-cols-1 gap-3 2xl:grid 2xl:grid-cols-3">
          <QueueVisualizer
            title="Call Stack"
            items={currentStepData.callStack}
            queueType="callstack"
            disableScroll
          />
          <QueueVisualizer
            title="Microtask Queue"
            subtitle="Promises, async/await"
            items={currentStepData.microtaskQueue}
            queueType="microtask"
            disableScroll
          />
          <QueueVisualizer
            title="Callback Queue"
            subtitle="setTimeout, setInterval"
            items={currentStepData.callbackQueue}
            queueType="callback"
            disableScroll
          />
        </div>

        <div className="min-h-0 flex-1">
          <ConsoleOutput output={currentStepData.output} />
        </div>
      </div>
    </div>
  );
}

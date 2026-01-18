"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EVENT_LOOP_STEPS } from "../constants/event-loop-steps";

const AUTO_PLAY_INTERVAL = 2000;

export function useEventLoopVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number>();

  const totalSteps = EVENT_LOOP_STEPS.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const currentStepData = useMemo(
    () => EVENT_LOOP_STEPS[currentStep],
    [currentStep],
  );

  useEffect(() => {
    if (!isPlaying || isLastStep) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, isLastStep, totalSteps]);

  const handlePlayPause = useCallback(() => {
    setCurrentStep((prev) => {
      if (!isPlaying && prev >= totalSteps - 1) {
        return 0;
      }
      return prev;
    });
    setIsPlaying((prev) => !prev);
  }, [isPlaying, totalSteps]);

  const handlePrevious = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
  }, []);

  return {
    currentStepData,
    currentStep,
    totalSteps,
    isPlaying,
    isFirstStep,
    isLastStep,
    handlePlayPause,
    handlePrevious,
    handleNext,
    handleReset,
  };
}

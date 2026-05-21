"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAssessment } from "@/hooks/useAssessment";
import { getRandomisedQuestions } from "@/lib/questions";
import { calculateResults, encodeResults } from "@/lib/scoring";
import { recordCompletion } from "@/lib/completions-counter";
import { ProgressBar } from "./ProgressBar";
import { ScenarioCards } from "./ScenarioCards";
import { VisualSlider } from "./VisualSlider";
import { AnimatedChartReaction } from "./AnimatedChartReaction";
import { WouldYouRather } from "./WouldYouRather";
import { DragAllocate } from "./DragAllocate";
import { IconScaleSelector } from "./IconScaleSelector";
import { Button } from "../ui/Button";

export function AssessmentShell() {
  const router = useRouter();
  const { currentQuestion, answers, isComplete, setAnswer, nextQuestion, prevQuestion } =
    useAssessment();

  // Randomise questions once per mount (i.e. per assessment session)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => getRandomisedQuestions(), []);

  const q = questions[currentQuestion];
  const hasAnswer = answers[q.id] !== undefined;

  // Handle completion
  useEffect(() => {
    if (isComplete) {
      void recordCompletion();
      const result = calculateResults(answers, questions);
      const encoded = encodeResults(result);
      router.push(`/results?r=${encoded}`);
    }
  }, [isComplete, answers, router, questions]);

  const handleSelect = useCallback(
    (value: number) => {
      setAnswer(q.id, value);
    },
    [q.id, setAnswer]
  );

  const handleNext = useCallback(() => {
    if (hasAnswer) {
      nextQuestion();
    }
  }, [hasAnswer, nextQuestion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && hasAnswer) {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasAnswer, handleNext]);

  const renderInteraction = () => {
    switch (q.interaction) {
      case "scenario-cards":
        return (
          <ScenarioCards
            options={q.options!}
            selected={answers[q.id]}
            onSelect={handleSelect}
          />
        );
      case "visual-slider":
        return (
          <VisualSlider
            config={q.sliderConfig!}
            selected={answers[q.id]}
            onSelect={handleSelect}
          />
        );
      case "animated-chart":
        return (
          <AnimatedChartReaction
            chartData={q.chartData!}
            options={q.options!}
            selected={answers[q.id]}
            onSelect={handleSelect}
          />
        );
      case "would-you-rather":
        return (
          <WouldYouRather
            options={q.options!}
            selected={answers[q.id]}
            onSelect={handleSelect}
          />
        );
      case "drag-allocate":
        return (
          <DragAllocate
            config={q.allocateConfig!}
            selected={answers[q.id]}
            onSelect={handleSelect}
          />
        );
      case "icon-scale":
        return (
          <IconScaleSelector
            config={q.iconScaleConfig!}
            selected={answers[q.id]}
            onSelect={handleSelect}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-grid">
      {/* Progress */}
      <div className="pt-6 pb-4">
        <ProgressBar current={currentQuestion} answers={answers} questions={questions} />
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${q.id}-${q.name}`}
            className="w-full max-w-2xl text-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question name badge */}
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-medium px-3 py-1 rounded-full border border-[var(--brand-border)]">
                {q.name}
              </span>
            </motion.div>

            {/* Question prompt */}
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-[var(--brand-text-primary)] mb-2 leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {q.prompt}
            </motion.h2>

            {q.subtitle && (
              <motion.p
                className="text-[var(--brand-text-secondary)] mb-8 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {q.subtitle}
              </motion.p>
            )}

            {!q.subtitle && <div className="mb-8" />}

            {/* Interaction */}
            {renderInteraction()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--brand-bg-primary)] via-[var(--brand-bg-primary)] to-transparent pt-8 pb-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            <span className="inline-flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" aria-hidden />
              Back
            </span>
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!hasAnswer}
            size="lg"
          >
            {currentQuestion === questions.length - 1 ? (
              "See My Results"
            ) : (
              <span className="inline-flex items-center gap-1.5">
                Continue
                <ArrowRight className="w-4 h-4" aria-hidden />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { Question } from "@/lib/types";

interface ProgressBarProps {
  current: number;
  answers: Record<number, number>;
  questions: Question[];
}

export function ProgressBar({ current, answers, questions }: ProgressBarProps) {
  const total = questions.length;
  const answered = Object.keys(answers).length;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[var(--brand-text-muted)]">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm text-[var(--brand-text-muted)]">
          {answered} answered
        </span>
      </div>
      <div className="flex gap-1.5">
        {questions.map((q, i) => (
          <div key={q.id} className="flex-1 h-1.5 rounded-full overflow-hidden bg-[var(--brand-bg-card)]">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: answers[q.id] !== undefined ? "100%" : i === current ? "50%" : "0%",
                backgroundColor:
                  answers[q.id] !== undefined
                    ? "var(--brand-accent)"
                    : i === current
                      ? "var(--brand-accent-dim)"
                      : "transparent",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

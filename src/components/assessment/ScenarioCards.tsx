"use client";

import { motion } from "motion/react";
import { QuestionOption } from "@/lib/types";

interface ScenarioCardsProps {
  options: QuestionOption[];
  selected: number | undefined;
  onSelect: (value: number) => void;
}

export function ScenarioCards({ options, selected, onSelect }: ScenarioCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
      {options.map((opt, i) => {
        const isSelected = selected === opt.value;
        return (
          <motion.button
            key={opt.id}
            onClick={() => onSelect(opt.value)}
            className={`
              text-left p-5 rounded-2xl border transition-colors
              ${isSelected
                ? "border-[var(--brand-accent)] bg-[var(--brand-accent-dim)]"
                : "border-[var(--brand-border)] bg-[var(--brand-bg-card)] hover:border-[var(--brand-accent)] hover:bg-[rgba(212,175,55,0.05)]"
              }
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{opt.icon}</span>
              <div>
                <p className={`font-semibold mb-1 ${isSelected ? "text-[var(--brand-accent)]" : "text-[var(--brand-text-primary)]"}`}>
                  {opt.label}
                </p>
                <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">
                  {opt.description}
                </p>
              </div>
            </div>
            {isSelected && (
              <motion.div
                className="mt-3 flex justify-end"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="w-6 h-6 rounded-full bg-[var(--brand-accent)] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B0F1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

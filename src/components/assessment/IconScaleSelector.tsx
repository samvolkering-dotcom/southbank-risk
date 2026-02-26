"use client";

import { motion } from "motion/react";
import { IconScaleConfig } from "@/lib/types";

interface IconScaleSelectorProps {
  config: IconScaleConfig;
  selected: number | undefined;
  onSelect: (value: number) => void;
}

export function IconScaleSelector({
  config,
  selected,
  onSelect,
}: IconScaleSelectorProps) {
  return (
    <motion.div
      className="w-full max-w-lg mx-auto space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {config.labels.map((label, i) => {
        const score = config.indexToScore(i);
        const isSelected = selected === score;

        return (
          <motion.button
            key={i}
            onClick={() => onSelect(score)}
            className={`
              w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-colors
              ${isSelected
                ? "border-[var(--brand-accent)] bg-[var(--brand-accent-dim)]"
                : "border-[var(--brand-border)] bg-[var(--brand-bg-card)] hover:border-[var(--brand-accent)]"
              }
            `}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Frequency indicator — more icons for more frequent checking */}
            <div className="flex gap-0.5 shrink-0">
              {Array.from({ length: config.icons.length - i }).map((_, j) => (
                <span
                  key={j}
                  className={`text-lg ${isSelected ? "opacity-100" : "opacity-50"}`}
                >
                  {config.icons[i]}
                </span>
              ))}
            </div>

            <span
              className={`text-sm font-medium flex-1 ${
                isSelected
                  ? "text-[var(--brand-accent)]"
                  : "text-[var(--brand-text-primary)]"
              }`}
            >
              {label}
            </span>

            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="w-6 h-6 rounded-full bg-[var(--brand-accent)] flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0B0F1A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

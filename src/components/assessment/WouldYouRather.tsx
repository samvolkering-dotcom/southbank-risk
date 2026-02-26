"use client";

import { motion } from "motion/react";
import { QuestionOption } from "@/lib/types";

interface WouldYouRatherProps {
  options: QuestionOption[];
  selected: number | undefined;
  onSelect: (value: number) => void;
}

export function WouldYouRather({ options, selected, onSelect }: WouldYouRatherProps) {
  const [optA, optB] = options;

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto items-stretch">
      {[optA, optB].map((opt, i) => {
        const isSelected = selected === opt.value;
        return (
          <motion.button
            key={opt.id}
            onClick={() => onSelect(opt.value)}
            className={`
              flex-1 p-6 rounded-2xl border text-left transition-colors relative overflow-hidden
              ${isSelected
                ? "border-[var(--brand-accent)] bg-[var(--brand-accent-dim)]"
                : "border-[var(--brand-border)] bg-[var(--brand-bg-card)] hover:border-[var(--brand-accent)] hover:bg-[rgba(212,175,55,0.05)]"
              }
            `}
            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{
              scale: 1.03,
              rotateY: i === 0 ? 2 : -2,
            }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Background icon */}
            <span className="absolute top-3 right-3 text-4xl opacity-20">
              {opt.icon}
            </span>

            <div className="relative z-10">
              <span className="text-3xl mb-3 block">{opt.icon}</span>
              <p
                className={`font-bold text-lg mb-2 ${
                  isSelected
                    ? "text-[var(--brand-accent)]"
                    : "text-[var(--brand-text-primary)]"
                }`}
              >
                {opt.label}
              </p>
              <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">
                {opt.description}
              </p>
            </div>

            {isSelected && (
              <motion.div
                className="absolute bottom-3 right-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="w-7 h-7 rounded-full bg-[var(--brand-accent)] flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
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

      {/* VS badge */}
      <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Positioned by parent if needed */}
      </div>
    </div>
  );
}

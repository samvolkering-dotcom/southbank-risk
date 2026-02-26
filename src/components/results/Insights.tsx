"use client";

import { motion } from "motion/react";
import { ArchetypeResult } from "@/lib/types";

interface InsightsProps {
  archetype: ArchetypeResult;
}

export function Insights({ archetype }: InsightsProps) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <motion.div
        className="glass-card rounded-3xl p-6 sm:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-[var(--brand-text-secondary)] leading-relaxed text-base sm:text-lg">
          {archetype.description}
        </p>
      </motion.div>

      {/* Strengths & Watch-Outs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          className="glass-card rounded-3xl p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
            <span>✅</span> Your Strengths
          </h4>
          <ul className="space-y-2">
            {archetype.strengths.map((s, i) => (
              <li
                key={i}
                className="text-sm text-[var(--brand-text-secondary)] flex items-start gap-2"
              >
                <span className="text-green-400 mt-1 shrink-0">•</span>
                {s}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="glass-card rounded-3xl p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
            <span>⚠️</span> Watch Out For
          </h4>
          <ul className="space-y-2">
            {archetype.watchOuts.map((w, i) => (
              <li
                key={i}
                className="text-sm text-[var(--brand-text-secondary)] flex items-start gap-2"
              >
                <span className="text-amber-400 mt-1 shrink-0">•</span>
                {w}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Portfolio Hint */}
      <motion.div
        className="glass-card rounded-3xl p-6 sm:p-8 border-l-4"
        style={{ borderLeftColor: archetype.color }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h4 className="font-semibold text-[var(--brand-text-primary)] mb-2 flex items-center gap-2">
          <span>💡</span> Portfolio Considerations
        </h4>
        <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">
          {archetype.portfolioHint}
        </p>
        <p className="text-xs text-[var(--brand-text-muted)] mt-3 italic">
          This is general information only, not a personal recommendation. Your
          actual investment strategy should consider your complete financial
          circumstances.
        </p>
      </motion.div>
    </div>
  );
}

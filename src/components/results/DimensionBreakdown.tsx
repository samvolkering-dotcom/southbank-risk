"use client";

import { motion } from "motion/react";
import { DimensionScore } from "@/lib/types";

interface DimensionBreakdownProps {
  dimensions: DimensionScore[];
}

const dimensionColors: Record<string, string> = {
  capacity: "#4682B4",
  attitude: "#DAA520",
  composure: "#2BBAB4",
  need: "#E6960C",
};

const dimensionIcons: Record<string, string> = {
  capacity: "💰",
  attitude: "🧠",
  composure: "🧘",
  need: "🎯",
};

export function DimensionBreakdown({ dimensions }: DimensionBreakdownProps) {
  return (
    <motion.div
      className="glass-card rounded-3xl p-6 sm:p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <h3 className="text-lg font-semibold text-[var(--brand-text-primary)] mb-6">
        Dimension Breakdown
      </h3>

      <div className="space-y-6">
        {dimensions.map((d, i) => {
          const color = dimensionColors[d.dimension];
          const icon = dimensionIcons[d.dimension];
          const percentage = ((d.score - 1) / 3) * 100;

          return (
            <motion.div
              key={d.dimension}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{icon}</span>
                  <span className="font-medium text-[var(--brand-text-primary)]">
                    {d.label}
                  </span>
                </div>
                <span className="font-bold" style={{ color }}>
                  {d.score.toFixed(1)}
                </span>
              </div>

              {/* Bar */}
              <div className="h-2.5 rounded-full bg-[var(--brand-bg-secondary)] overflow-hidden mb-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    delay: 1 + i * 0.15,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />
              </div>

              {/* Insight */}
              <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">
                {d.insight}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

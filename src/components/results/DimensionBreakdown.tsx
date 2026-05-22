"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Wallet, Brain, Anchor, Target, Info } from "lucide-react";
import { Dimension, DimensionScore } from "@/lib/types";
import { getDimensionBand, getDimensionDefinition } from "@/lib/scoring";

interface DimensionBreakdownProps {
  dimensions: DimensionScore[];
}

const dimensionColors: Record<string, string> = {
  capacity: "#4682B4",
  attitude: "#DAA520",
  composure: "#2BBAB4",
  need: "#E6960C",
};

const dimensionIcons: Record<string, LucideIcon> = {
  capacity: Wallet,
  attitude: Brain,
  composure: Anchor,
  need: Target,
};

export function DimensionBreakdown({ dimensions }: DimensionBreakdownProps) {
  const [openInfo, setOpenInfo] = useState<Dimension | null>(null);

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
          const Icon = dimensionIcons[d.dimension];
          const percentage = ((d.score - 1) / 9) * 100;

          return (
            <motion.div
              key={d.dimension}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              <div className="flex items-center justify-between mb-2 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-5 h-5 shrink-0" style={{ color }} aria-hidden />
                  <span className="font-medium text-[var(--brand-text-primary)] truncate">
                    {d.label}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenInfo((cur) => (cur === d.dimension ? null : d.dimension))
                    }
                    aria-expanded={openInfo === d.dimension}
                    aria-label={`What does ${d.label} measure?`}
                    className="text-[var(--brand-text-muted)] hover:text-[var(--brand-accent)] transition-colors shrink-0"
                  >
                    <Info className="w-4 h-4" aria-hidden />
                  </button>
                </div>
                <div className="flex items-baseline gap-2 shrink-0">
                  <span className="font-bold" style={{ color }}>
                    {d.score.toFixed(1)}{" "}
                    <span className="text-xs font-normal text-[var(--brand-text-muted)]">
                      / 10
                    </span>
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[var(--brand-text-secondary)] font-semibold">
                    {getDimensionBand(d.dimension, d.score)}
                  </span>
                </div>
              </div>

              {/* What this measures */}
              <AnimatePresence initial={false}>
                {openInfo === d.dimension && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="text-sm text-[var(--brand-text-secondary)] leading-relaxed py-2 px-3 rounded-lg bg-[var(--brand-bg-card)] border border-[var(--brand-border)] mb-3">
                      <span className="text-xs uppercase tracking-widest text-[var(--brand-accent)] font-bold block mb-1">
                        What this measures
                      </span>
                      {getDimensionDefinition(d.dimension)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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

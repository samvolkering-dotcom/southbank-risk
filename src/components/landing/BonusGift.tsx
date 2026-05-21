"use client";

import { motion } from "motion/react";
import { Check, Gift } from "lucide-react";

export function BonusGift() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="glass-card rounded-3xl p-6 sm:p-10 border border-[var(--brand-accent)] relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--brand-accent)] opacity-[0.04] blur-3xl" />

          <div className="relative grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-8 items-center">
            <div className="mx-auto sm:mx-0">
              <img
                src="/road-to-financial-freedom.png"
                alt="The Road to Financial Freedom — Southbank Special Report"
                className="w-40 sm:w-48 h-auto drop-shadow-2xl"
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-bold mb-3">
                <Gift className="w-4 h-4" aria-hidden />
                Free Bonus Report
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-text-primary)] mb-3 leading-tight">
                Get <span className="italic">The Road to Financial Freedom</span> — free with your results
              </h3>
              <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed mb-4">
                Complete the assessment and we&apos;ll send you our brand-new
                special report — a practical guide to building real wealth on
                your own terms. No charge, no catch.
              </p>
              <ul className="space-y-2 text-sm text-[var(--brand-text-secondary)]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--brand-accent)] mt-0.5 shrink-0" aria-hidden />
                  <span>The five pillars every independent investor needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--brand-accent)] mt-0.5 shrink-0" aria-hidden />
                  <span>How to think about risk, time, and asymmetric upside</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--brand-accent)] mt-0.5 shrink-0" aria-hidden />
                  <span>A blueprint you can act on this week</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

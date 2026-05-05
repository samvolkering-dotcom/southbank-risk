"use client";

import { motion } from "motion/react";

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
            {/* Mock book cover */}
            <div className="mx-auto sm:mx-0">
              <div className="w-32 sm:w-40 aspect-[3/4] rounded-lg shadow-2xl bg-gradient-to-br from-[#1a1f2e] via-[#0B0F1A] to-[#000] border border-[var(--brand-accent)] p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="relative">
                  <div className="text-[8px] uppercase tracking-widest text-[var(--brand-accent)] font-bold mb-2">
                    Southbank Special Report
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-[var(--brand-text-primary)] leading-tight">
                    The Road to Financial Freedom
                  </div>
                </div>
                <div className="relative">
                  <div className="h-px bg-[var(--brand-accent)] opacity-40 mb-2" />
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="40" height="40" rx="8" stroke="#D4AF37" strokeWidth="2" fill="none" />
                    <path d="M14 32V20l10-8 10 8v12" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-bold mb-3">
                🎁 Free Bonus Report
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
                  <span className="text-[var(--brand-accent)] mt-0.5">✓</span>
                  <span>The five pillars every independent investor needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--brand-accent)] mt-0.5">✓</span>
                  <span>How to think about risk, time, and asymmetric upside</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--brand-accent)] mt-0.5">✓</span>
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

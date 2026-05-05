"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--brand-accent)] opacity-[0.03] blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--brand-accent)] opacity-[0.02] blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="inline-flex flex-col items-center gap-1">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="40" height="40" rx="8" stroke="#D4AF37" strokeWidth="2" fill="none" />
              <path d="M14 32V20l10-8 10 8v12" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M20 32v-8h8v8" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="text-sm font-semibold tracking-wide text-[var(--brand-accent)]">
              Southbank Investment Research
            </span>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-medium px-4 py-1.5 rounded-full border border-[var(--brand-border)] mb-6">
            Free Risk Assessment + Bonus Gift
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          What Kind of{" "}
          <span className="gradient-text">Investor</span>{" "}
          Are You?
        </motion.h1>

        {/* Subhead */}
        <motion.p
          className="text-lg sm:text-xl text-[var(--brand-text-secondary)] mb-8 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          Discover your true risk profile in under 3 minutes. Not a boring
          questionnaire — an interactive experience that reveals how you
          really think about money.
        </motion.p>

        {/* Bonus gift tease */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-[var(--brand-accent)] bg-[var(--brand-accent-dim)]">
            <span className="text-2xl">🎁</span>
            <div className="text-left">
              <div className="text-xs uppercase tracking-widest text-[var(--brand-accent)] font-bold">
                Free Bonus on Completion
              </div>
              <div className="text-sm font-semibold text-[var(--brand-text-primary)]">
                Your copy of <span className="italic">The Road to Financial Freedom</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="/assess">
            <Button variant="primary" size="lg" className="gold-glow text-lg px-10 py-4">
              Start My Assessment →
            </Button>
          </Link>
          <p className="text-xs text-[var(--brand-text-muted)] mt-3">
            12 interactive questions • Takes 3 minutes • Completely free
          </p>
        </motion.div>
      </div>
    </section>
  );
}

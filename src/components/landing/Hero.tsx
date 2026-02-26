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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-medium px-4 py-1.5 rounded-full border border-[var(--brand-border)] mb-6">
            Free Risk Assessment Tool
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
            12 interactive questions • No sign-up required • Completely free
          </p>
        </motion.div>
      </div>
    </section>
  );
}

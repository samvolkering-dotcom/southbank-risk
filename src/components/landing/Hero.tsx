"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-start pt-8 sm:pt-10 pb-8 sm:pb-12 px-4 text-center overflow-hidden">
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
            <Gift className="w-6 h-6 text-[var(--brand-accent)] shrink-0" aria-hidden />
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

        {/* Educational notice — clicking the CTA below acknowledges it */}
        <motion.div
          className="mb-5 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <p className="text-xs sm:text-sm text-[var(--brand-text-muted)] leading-relaxed">
            This tool is <strong className="text-[var(--brand-text-secondary)]">educational and illustrative only</strong>.
            It is not personal financial advice and should not be relied upon
            to make investment decisions. By starting the assessment you
            acknowledge this.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <Link href="/assess">
            <Button variant="primary" size="lg" className="gold-glow text-lg px-10 py-4">
              <span className="inline-flex items-center gap-2">
                I Understand — Let&apos;s Go!
                <ArrowRight className="w-5 h-5" aria-hidden />
              </span>
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

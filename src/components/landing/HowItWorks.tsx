"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Answer 12 Interactive Questions",
    description:
      "Not boring tick-boxes. Scenario-based, visual questions that measure how you actually think and feel about investment risk.",
    icon: "🎯",
  },
  {
    number: "02",
    title: "Get Your 4-Dimension Profile",
    description:
      "We measure four distinct risk dimensions: financial capacity, psychological attitude, behavioural composure, and growth need. Because risk isn't one-dimensional.",
    icon: "📊",
  },
  {
    number: "03",
    title: "Discover Your Investor Archetype",
    description:
      "From Guardian to Maverick, find out which of six investor archetypes matches your unique risk profile — with personalised insights and actionable next steps.",
    icon: "🔮",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center mb-12 text-[var(--brand-text-primary)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="glass-card rounded-2xl p-6 flex items-start gap-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--brand-accent-dim)] flex items-center justify-center text-2xl">
                {step.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[var(--brand-accent)] font-bold tracking-widest">
                    STEP {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--brand-text-primary)] mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

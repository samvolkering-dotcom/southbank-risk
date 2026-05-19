"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getCompletionCount } from "@/lib/completions-counter";

// Show the counter only once we've genuinely crossed this threshold —
// real social proof, not a placeholder.
const VISIBILITY_THRESHOLD = 100;

export function SocialProof() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    getCompletionCount().then((target) => {
      if (cancelled || target === null || target < VISIBILITY_THRESHOLD) {
        // Below threshold — leave count null so the block stays hidden.
        return;
      }
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          if (timer) clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    });

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, []);

  if (count === null) {
    // Hidden until we have real numbers worth showing.
    return null;
  }

  return (
    <motion.section
      className="py-12 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-md mx-auto text-center glass-card rounded-2xl p-6">
        <p className="text-3xl font-bold gradient-text mb-1">
          {count.toLocaleString()}+
        </p>
        <p className="text-sm text-[var(--brand-text-secondary)]">
          investors have discovered their risk profile
        </p>
      </div>
    </motion.section>
  );
}

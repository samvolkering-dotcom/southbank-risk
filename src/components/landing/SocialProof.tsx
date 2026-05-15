"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getCompletionCount } from "@/lib/completions-counter";

export function SocialProof() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    getCompletionCount().then((target) => {
      if (cancelled || target === null || target <= 0) return;
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

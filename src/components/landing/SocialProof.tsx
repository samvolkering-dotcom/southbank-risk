"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function SocialProof() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulated counter — in production this would be a real count
    const target = 12847;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
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

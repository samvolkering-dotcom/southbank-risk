"use client";

import { motion } from "motion/react";
import { AssessmentResult } from "@/lib/types";
import { DataIcon } from "@/lib/icons";

interface ProfileCardHeadlineProps {
  result: AssessmentResult;
}

export function ProfileCardHeadline({ result }: ProfileCardHeadlineProps) {
  const { archetype } = result;

  return (
    <motion.div
      className="glass-card rounded-3xl p-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <motion.div
        className="mb-4 flex justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
      >
        <DataIcon
          name={archetype.icon}
          className="w-16 h-16"
          style={{ color: archetype.color }}
          aria-hidden
        />
      </motion.div>

      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold mb-2"
        style={{
          background: `linear-gradient(135deg, ${archetype.color}, #F5D680)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {archetype.name}
      </motion.h1>

      <motion.p
        className="text-[var(--brand-text-secondary)] text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {archetype.headline}
      </motion.p>
    </motion.div>
  );
}

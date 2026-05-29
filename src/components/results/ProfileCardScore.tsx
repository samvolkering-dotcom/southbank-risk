"use client";

import { motion } from "motion/react";
import { AssessmentResult } from "@/lib/types";
import { AnimatedNumber } from "../ui/AnimatedNumber";

interface ProfileCardScoreProps {
  result: AssessmentResult;
}

export function ProfileCardScore({ result }: ProfileCardScoreProps) {
  const { archetype, overall } = result;

  // Gauge angle: map 1-10 to 0-180 degrees
  const angle = ((overall - 1) / 9) * 180;

  return (
    <motion.div
      className="glass-card rounded-3xl p-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative w-48 h-28 mx-auto mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <svg viewBox="0 0 200 110" className="w-full h-full">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="var(--brand-bg-card)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <motion.path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={archetype.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{
              strokeDashoffset: 251.2 - (angle / 180) * 251.2,
            }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          />
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="var(--brand-text-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transformOrigin: "100px 100px" }}
            initial={{ rotate: -90 }}
            animate={{ rotate: angle - 90 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          />
          <circle cx="100" cy="100" r="5" fill={archetype.color} />
          <text x="15" y="108" className="text-[8px] fill-[var(--brand-text-muted)]">
            Conservative
          </text>
          <text x="145" y="108" className="text-[8px] fill-[var(--brand-text-muted)]">
            Aggressive
          </text>
        </svg>
      </motion.div>

      <div className="text-center">
        <AnimatedNumber
          value={overall}
          className="text-4xl font-bold"
          prefix=""
          suffix=" / 10"
        />
        <p className="text-xs text-[var(--brand-text-muted)] mt-1 uppercase tracking-widest">
          Overall risk score
        </p>
      </div>
    </motion.div>
  );
}

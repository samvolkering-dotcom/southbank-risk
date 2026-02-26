"use client";

import { motion } from "motion/react";
import { AssessmentResult } from "@/lib/types";
import { AnimatedNumber } from "../ui/AnimatedNumber";

interface ProfileCardProps {
  result: AssessmentResult;
}

export function ProfileCard({ result }: ProfileCardProps) {
  const { archetype, overall } = result;

  // Gauge angle: map 1.0-4.0 to 0-180 degrees
  const angle = ((overall - 1.0) / 3.0) * 180;

  return (
    <motion.div
      className="glass-card rounded-3xl p-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {/* Emoji */}
      <motion.div
        className="text-6xl mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
      >
        {archetype.emoji}
      </motion.div>

      {/* Archetype name */}
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

      {/* Headline */}
      <motion.p
        className="text-[var(--brand-text-secondary)] text-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {archetype.headline}
      </motion.p>

      {/* Radial Gauge */}
      <motion.div
        className="relative w-48 h-28 mx-auto mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <svg viewBox="0 0 200 110" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="var(--brand-bg-card)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Colored arc */}
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
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          />
          {/* Needle */}
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
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          />
          {/* Center dot */}
          <circle cx="100" cy="100" r="5" fill={archetype.color} />
          {/* Labels */}
          <text
            x="15"
            y="108"
            className="text-[8px] fill-[var(--brand-text-muted)]"
          >
            Conservative
          </text>
          <text
            x="145"
            y="108"
            className="text-[8px] fill-[var(--brand-text-muted)]"
          >
            Aggressive
          </text>
        </svg>
      </motion.div>

      {/* Score */}
      <div className="text-center">
        <AnimatedNumber
          value={overall}
          className="text-4xl font-bold"
          prefix=""
          suffix=" / 4.0"
        />
        <p className="text-xs text-[var(--brand-text-muted)] mt-1 uppercase tracking-widest">
          Overall risk score
        </p>
      </div>
    </motion.div>
  );
}

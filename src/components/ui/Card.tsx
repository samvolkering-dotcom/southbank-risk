"use client";

import { motion } from "motion/react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  onClick,
  selected = false,
  hoverable = false,
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`
        glass-card rounded-2xl p-6
        ${selected ? "border-[var(--brand-accent)] bg-[var(--brand-accent-dim)]" : ""}
        ${hoverable || onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      whileHover={
        hoverable || onClick
          ? { scale: 1.02, borderColor: "var(--brand-accent)" }
          : undefined
      }
      whileTap={onClick ? { scale: 0.98 } : undefined}
      layout
    >
      {children}
    </motion.div>
  );
}

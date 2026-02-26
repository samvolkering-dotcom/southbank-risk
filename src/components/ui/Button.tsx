"use client";

import { motion } from "motion/react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2 focus:ring-offset-[var(--brand-bg-primary)] disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--brand-accent)] text-[#0B0F1A] hover:bg-[#E5C548] active:bg-[#C49B2F]",
    secondary:
      "border border-[var(--brand-border)] text-[var(--brand-text-primary)] hover:bg-[var(--brand-accent-dim)] active:bg-[var(--brand-border)]",
    ghost:
      "text-[var(--brand-text-secondary)] hover:text-[var(--brand-text-primary)] hover:bg-[var(--brand-accent-dim)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

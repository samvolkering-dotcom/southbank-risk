"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "../ui/Button";
import { useAssessment } from "@/hooks/useAssessment";

interface ResultGateProps {
  archetypeId: string;
  encodedResult: string;
}

type Status = "idle" | "submitting" | "error";

export function ResultGate({ archetypeId, encodedResult }: ResultGateProps) {
  const [email, setEmail] = useState("");
  // Default ON — pre-checked per ADR-0002. Reverses the previous code-level default.
  const [optIn, setOptIn] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const markEmailSubmitted = useAssessment((s) => s.markEmailSubmitted);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail || status === "submitting") return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          optInDaily: optIn,
          archetype: archetypeId,
          source: "risk-assessor",
          encodedResult,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      markEmailSubmitted(email);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <motion.div
      className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[var(--brand-accent)] relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--brand-accent)] opacity-[0.06] blur-3xl" />

      <div className="relative">
        <div className="flex items-start gap-4 mb-5">
          <Lock className="w-9 h-9 text-[var(--brand-accent)] shrink-0" aria-hidden />
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-bold mb-1">
              Your Result Is Ready
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-text-primary)] leading-tight">
              Where should we send your full profile?
            </h3>
            <p className="text-sm text-[var(--brand-text-secondary)] mt-2">
              Unlock your dimension breakdown, insights, and overall risk score. We&apos;ll email you a link back to this page plus a free copy of{" "}
              <span className="italic">The Road to Financial Freedom</span>.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl bg-[var(--brand-bg-card)] border border-[var(--brand-border)] text-[var(--brand-text-primary)] placeholder:text-[var(--brand-text-muted)] focus:outline-none focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2 focus:ring-offset-[var(--brand-bg-primary)]"
              disabled={status === "submitting"}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[var(--brand-border)] bg-[var(--brand-bg-card)] text-[var(--brand-accent)] focus:ring-[var(--brand-accent)] focus:ring-offset-[var(--brand-bg-primary)] cursor-pointer"
              disabled={status === "submitting"}
            />
            <span className="text-sm text-[var(--brand-text-secondary)] leading-relaxed group-hover:text-[var(--brand-text-primary)] transition-colors">
              Also sign me up to <strong className="text-[var(--brand-text-primary)]">Investor&apos;s Daily</strong>
              {" "}— Southbank&apos;s free e-letter on the markets, big ideas, and independent research. By ticking this box, I agree to receive marketing material by email from Southbank Investment Research. I can unsubscribe at any time.
            </span>
          </label>

          {status === "error" && (
            <p className="text-sm text-red-400" role="alert">
              {errorMsg}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!isValidEmail || status === "submitting"}
            className="w-full gold-glow"
          >
            {status === "submitting" ? (
              "Unlocking..."
            ) : (
              <span className="inline-flex items-center gap-2">
                See My Full Profile
                <ArrowRight className="w-5 h-5" aria-hidden />
              </span>
            )}
          </Button>

          <p className="text-xs text-[var(--brand-text-muted)] text-center">
            We&apos;ll never share your email. See our{" "}
            <a
              href="https://southbankresearch.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--brand-accent)]"
            >
              privacy policy
            </a>
            .
          </p>
        </form>
      </div>
    </motion.div>
  );
}

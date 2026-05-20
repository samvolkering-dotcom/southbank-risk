"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/Button";
import { useAssessment } from "@/hooks/useAssessment";

interface EmailCaptureProps {
  archetypeId: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function EmailCapture({ archetypeId }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  // Default OFF — user must actively consent to Investor's Daily to receive the report.
  const [optIn, setOptIn] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const emailSubmitted = useAssessment((s) => s.emailSubmitted);
  const submittedEmail = useAssessment((s) => s.submittedEmail);
  const markEmailSubmitted = useAssessment((s) => s.markEmailSubmitted);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (useAssessment.persist.hasHydrated()) setHydrated(true);
    const unsub = useAssessment.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showSuccess = status === "success" || emailSubmitted;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail || !optIn || status === "submitting") return;

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
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      markEmailSubmitted(email);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!hydrated) {
    return (
      <div
        className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[var(--brand-accent)] min-h-[300px]"
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[var(--brand-accent)] relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--brand-accent)] opacity-[0.06] blur-3xl" />

      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            className="relative text-center py-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-5xl mb-3">📬</div>
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Check your inbox
            </h3>
            <p className="text-[var(--brand-text-secondary)] max-w-md mx-auto">
              Your free copy of <span className="italic">The Road to Financial Freedom</span> is on its way to{" "}
              <span className="text-[var(--brand-text-primary)] font-semibold">{submittedEmail || email}</span>.
            </p>
            {status === "success" && optIn && (
              <p className="text-sm text-[var(--brand-text-muted)] mt-3">
                You&apos;re also subscribed to <strong>Investor&apos;s Daily</strong> — your first issue arrives tomorrow morning.
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="form"
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="text-4xl shrink-0">🎁</div>
              <div>
                <span className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--brand-accent)] font-bold mb-1">
                  Your Free Bonus is Ready
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-text-primary)] leading-tight">
                  Where should we send <span className="italic">The Road to Financial Freedom</span>?
                </h3>
                <p className="text-sm text-[var(--brand-text-secondary)] mt-2">
                  A practical guide to building wealth on your own terms. To receive your free copy, sign up to Investor&apos;s Daily below.
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
                  aria-required="true"
                  className="mt-1 w-4 h-4 rounded border-[var(--brand-border)] bg-[var(--brand-bg-card)] text-[var(--brand-accent)] focus:ring-[var(--brand-accent)] focus:ring-offset-[var(--brand-bg-primary)] cursor-pointer"
                  disabled={status === "submitting"}
                />
                <span className="text-sm text-[var(--brand-text-secondary)] leading-relaxed group-hover:text-[var(--brand-text-primary)] transition-colors">
                  <strong className="text-[var(--brand-text-primary)]">
                    Sign me up to Investor&apos;s Daily
                  </strong>{" "}
                  — Southbank&apos;s free e-letter on the markets, big ideas, and
                  independent research — and send me my free report. By ticking
                  this box, I agree to receive marketing material by email from
                  Southbank Investment Research. I can unsubscribe at any time.
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
                disabled={!isValidEmail || !optIn || status === "submitting"}
                className="w-full gold-glow"
              >
                {status === "submitting" ? "Sending..." : "Send Me The Report →"}
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

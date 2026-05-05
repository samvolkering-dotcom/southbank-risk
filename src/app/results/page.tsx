"use client";

import { useRef, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useAssessment } from "@/hooks/useAssessment";
import { motion } from "motion/react";
import { decodeResults } from "@/lib/scoring";
import { getBrand } from "@/lib/brand-config";
import { Confetti } from "@/components/results/Confetti";
import { ProfileCard } from "@/components/results/ProfileCard";
import { DimensionRadar } from "@/components/results/DimensionRadar";
import { DimensionBreakdown } from "@/components/results/DimensionBreakdown";
import { Insights } from "@/components/results/Insights";
import { ShareCard } from "@/components/results/ShareCard";
import { EmailCapture } from "@/components/results/EmailCapture";
import { Button } from "@/components/ui/Button";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shareRef = useRef<HTMLDivElement>(null);
  const brand = getBrand();
  const resetAssessment = useAssessment((s) => s.reset);

  const handleRetake = useCallback(() => {
    resetAssessment();
    router.push("/");
  }, [resetAssessment, router]);

  const result = useMemo(() => {
    const encoded = searchParams.get("r");
    if (!encoded) return null;
    return decodeResults(encoded);
  }, [searchParams]);

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-[var(--brand-text-primary)] mb-4">
          No results found
        </h1>
        <p className="text-[var(--brand-text-secondary)] mb-6">
          It looks like you haven&apos;t completed the assessment yet.
        </p>
        <Link href="/assess">
          <Button variant="primary" size="lg">
            Start Assessment
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid">
      <Confetti />

      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
        {/* Shareable card area */}
        <div ref={shareRef} className="space-y-6">
          <ProfileCard result={result} />
          <DimensionRadar
            dimensions={result.dimensions}
            color={result.archetype.color}
          />
        </div>

        <DimensionBreakdown dimensions={result.dimensions} />
        <Insights archetype={result.archetype} />

        {/* Email capture for free bonus report */}
        <EmailCapture
          archetypeName={result.archetype.name}
          archetypeId={result.archetype.id}
        />

        {/* CTA */}
        <motion.div
          className="glass-card rounded-3xl p-6 sm:p-8 text-center border border-[var(--brand-accent)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <h3 className="text-xl font-bold gradient-text mb-2">
            {brand.cta.resultsHeadline}
          </h3>
          <p className="text-sm text-[var(--brand-text-secondary)] mb-4 max-w-md mx-auto">
            {brand.cta.resultsBody}
          </p>
          <a
            href={brand.cta.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg">
              {brand.cta.buttonText}
            </Button>
          </a>
        </motion.div>

        <ShareCard shareRef={shareRef} />

        {/* Retake */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Button variant="ghost" onClick={handleRetake}>↻ Retake Assessment</Button>
        </motion.div>

        {/* FCA Disclaimer */}
        <motion.div
          className="text-center pt-8 pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <div className="max-w-xl mx-auto">
            <p className="text-xs text-[var(--brand-text-muted)] leading-relaxed">
              <strong>Important information:</strong> {brand.disclaimer}
            </p>
          </div>
          {brand.showSouthbankBranding && (
            <p className="text-xs text-[var(--brand-text-muted)] mt-4">
              © {new Date().getFullYear()} {brand.name}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-[var(--brand-text-muted)]">Loading results...</div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}

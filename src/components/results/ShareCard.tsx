"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/Button";

interface ShareCardProps {
  shareRef: React.RefObject<HTMLDivElement | null>;
}

export function ShareCard({ shareRef }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const handleDownload = useCallback(async () => {
    if (!shareRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: "#0B0F1A",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = "my-risk-profile.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Screenshot failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [shareRef]);

  return (
    <motion.div
      className="glass-card rounded-3xl p-6 sm:p-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
    >
      <h3 className="text-lg font-semibold text-[var(--brand-text-primary)] mb-2">
        Share Your Results
      </h3>
      <p className="text-sm text-[var(--brand-text-secondary)] mb-4">
        Your results are encoded in the URL — anyone with the link can see them.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="secondary" onClick={handleCopyLink}>
          {copied ? "Copied! ✓" : "Copy Link"}
        </Button>
        <Button
          variant="secondary"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? "Generating..." : "Download Image"}
        </Button>
      </div>
    </motion.div>
  );
}

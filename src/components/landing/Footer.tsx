"use client";

import { getBrand } from "@/lib/brand-config";

export function Footer() {
  const brand = getBrand();

  return (
    <footer className="py-12 px-4 border-t border-[var(--brand-border)]">
      <div className="max-w-3xl mx-auto text-center">
        {/* Brand */}
        {brand.showSouthbankBranding && (
          <p className="text-sm text-[var(--brand-text-secondary)] mb-4">
            A tool by{" "}
            <span className="text-[var(--brand-accent)] font-medium">
              {brand.name}
            </span>
          </p>
        )}

        {/* FCA Disclaimer */}
        <div className="max-w-xl mx-auto mb-4">
          <p className="text-xs text-[var(--brand-text-muted)] leading-relaxed">
            <strong>Important information:</strong> {brand.disclaimer}
          </p>
        </div>

        {/* FCA Educational Notice */}
        <div className="max-w-xl mx-auto mb-4 p-3 rounded-lg bg-[var(--brand-bg-secondary)] border border-[var(--brand-border)]">
          <p className="text-xs text-[var(--brand-text-muted)] leading-relaxed">
            This risk assessment tool is designed for educational purposes to help you reflect on your
            own attitudes and circumstances regarding investment risk. It is not a regulated activity
            under the Financial Services and Markets Act 2000 and does not constitute a suitability
            assessment, financial promotion, or personal recommendation as defined by the FCA Handbook.
            Risk tolerance is just one factor in investment decisions — your complete financial
            situation, tax position, and personal circumstances should also be considered. If in doubt,
            consult a qualified financial adviser authorised by the Financial Conduct Authority.
          </p>
        </div>

        <p className="text-xs text-[var(--brand-text-muted)]">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

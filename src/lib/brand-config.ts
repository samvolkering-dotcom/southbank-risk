export interface BrandConfig {
  id: string;
  name: string;
  tagline: string;
  logo?: string;
  colors: {
    bgPrimary: string;
    bgSecondary: string;
    bgCard: string;
    accent: string;
    accentDim: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
  };
  cta: {
    resultsHeadline: string;
    resultsBody: string;
    buttonText: string;
    buttonUrl: string;
  };
  disclaimer: string;
  showSouthbankBranding: boolean;
}

const southbank: BrandConfig = {
  id: "southbank",
  name: "Southbank Investment Research",
  tagline: "Independent research for independent investors",
  colors: {
    bgPrimary: "#0B0F1A",
    bgSecondary: "#111827",
    bgCard: "#1A1F2E",
    accent: "#D4AF37",
    accentDim: "rgba(212, 175, 55, 0.15)",
    textPrimary: "#F1F5F9",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    border: "rgba(212, 175, 55, 0.2)",
  },
  cta: {
    resultsHeadline: "Independent Research for Independent Investors",
    resultsBody:
      "Southbank Investment Research provides independent analysis for every kind of investor — from cautious income seekers to bold growth hunters.",
    buttonText: "Explore Our Research",
    buttonUrl: "https://southbankresearch.com",
  },
  disclaimer:
    "This tool is for educational and informational purposes only. It does not constitute personal financial advice, a personal recommendation, or a suitability assessment under FCA rules. Your capital is at risk when investing. Past performance is not a reliable indicator of future results. The value of investments and any income from them can fall as well as rise. You may get back less than you invest. If you are unsure about the suitability of an investment, you should seek advice from a qualified financial adviser. Southbank Investment Research is authorised and regulated by the Financial Conduct Authority (FCA). This assessment does not take into account your complete financial situation, objectives, or specific needs.",
  showSouthbankBranding: true,
};

const brands: Record<string, BrandConfig> = {
  southbank,
};

export function getBrand(): BrandConfig {
  const brandId = process.env.NEXT_PUBLIC_BRAND || "southbank";
  return brands[brandId] || southbank;
}

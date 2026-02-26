import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Risk Assessor | Southbank Investment Research",
  description:
    "Discover your true investor risk profile in under 3 minutes. A free, interactive assessment measuring your capacity, attitude, composure, and need for risk.",
  openGraph: {
    title: "What Kind of Investor Are You?",
    description:
      "Free interactive risk assessment. Discover your investor archetype in under 3 minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

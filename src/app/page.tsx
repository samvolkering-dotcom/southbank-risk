"use client";

import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BonusGift } from "@/components/landing/BonusGift";
import { SocialProof } from "@/components/landing/SocialProof";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <BonusGift />
      <SocialProof />
      <Footer />
    </main>
  );
}

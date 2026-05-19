import { ArchetypeResult } from "./types";

export const archetypes: ArchetypeResult[] = [
  {
    id: "guardian",
    name: "The Guardian",
    scoreRange: [1.0, 2.5],
    color: "#4682B4",
    emoji: "🛡️",
    headline: "You protect what matters most.",
    description:
      "You're a careful, deliberate investor who prioritises capital preservation above all else. You understand that sleeping well at night is worth more than chasing every percentage point. In volatile markets, you're the calm voice of reason.",
    strengths: [
      "Disciplined saver with strong financial foundations",
      "Unlikely to panic-sell or make emotional decisions",
      "Well-suited to income-generating investments",
    ],
    watchOuts: [
      "Inflation can silently erode overly cautious portfolios",
      "Being too conservative over decades may mean falling short of goals",
      "You may miss opportunities by waiting for 'the perfect time'",
    ],
    portfolioHint:
      "Consider a mix of high-quality bonds, cash ISAs, dividend-paying blue chips, and inflation-linked gilts. A small allocation to diversified funds can add growth without keeping you up at night.",
  },
  {
    id: "steady-builder",
    name: "The Steady Builder",
    scoreRange: [2.6, 4.0],
    color: "#2BBAB4",
    emoji: "🧱",
    headline: "Slow and steady builds real wealth.",
    description:
      "You're a patient, methodical investor who believes in the power of compounding. You don't need excitement from your portfolio — you need reliability. You're happy to let time do the heavy lifting while you focus on living your life.",
    strengths: [
      "Excellent temperament for long-term index investing",
      "Comfortable with modest volatility for better returns",
      "Consistent contributor — the habit is more powerful than the amount",
    ],
    watchOuts: [
      "Don't let caution prevent you from taking age-appropriate risk",
      "Review your allocation periodically — what's right at 35 isn't right at 55",
      "Avoid 'lifestyle creep' that reduces your investment contributions",
    ],
    portfolioHint:
      "Consider a sensible split between index funds, bond funds, finding that sweet spot coupled with regular monthly contributions into a stocks and shares ISA or SIPP, which can work wonders over the long term.",
  },
  {
    id: "balanced-navigator",
    name: "The Balanced Navigator",
    scoreRange: [4.1, 5.5],
    color: "#DAA520",
    emoji: "⚖️",
    headline: "You play both sides of the board.",
    description:
      "You have a healthy relationship with risk. You understand that growth requires some discomfort, but you're not reckless about it. You're the investor who reads the research, considers the options, and makes informed decisions.",
    strengths: [
      "Adaptable — can adjust strategy as circumstances change",
      "Willing to accept short-term losses for long-term gains",
      "Good instincts for diversification and portfolio balance",
    ],
    watchOuts: [
      "Indecision can be costly — don't overthink entry points",
      "Balanced doesn't mean passive — stay engaged with your portfolio",
      "Watch for 'analysis paralysis' when markets send mixed signals",
    ],
    portfolioHint:
      "A diversified mix of equities, bonds, and perhaps some real estate funds may be where you're at. Equities are certainly on the higher risk, higher reward side of things but depending on your time horizon can work for you positively long term. Combining an active strategy with a core passive strategy is right in your wheelhouse.",
  },
  {
    id: "calculated-opportunist",
    name: "The Calculated Opportunist",
    scoreRange: [5.6, 7.0],
    color: "#E6960C",
    emoji: "🎯",
    headline: "You see opportunity where others see risk.",
    description:
      "You're a confident, research-driven investor who isn't afraid to back your convictions. You understand that the best opportunities often come with uncertainty, and you've got the stomach to hold through volatility. You invest with intention, not impulse.",
    strengths: [
      "Comfortable making contrarian bets backed by research",
      "Strong risk-reward assessment skills",
      "Can act decisively when others are frozen by fear",
    ],
    watchOuts: [
      "Confidence can become overconfidence — always size positions wisely",
      "Ensure you have adequate cash reserves before making bold moves",
      "Don't let conviction blind you to changing fundamentals",
    ],
    portfolioHint:
      "A growth-tilted portfolio with tactical allocations suits your style. Consider a core of quality growth stocks and thematic funds, with some exposure to emerging markets and smaller companies. Keep 10-15% in defensive assets for dry powder.",
  },
  {
    id: "frontier-explorer",
    name: "The Frontier Explorer",
    scoreRange: [7.1, 8.5],
    color: "#E65100",
    emoji: "🧭",
    headline: "You venture where most investors won't.",
    description:
      "You're drawn to the edges of the investment universe — emerging markets, innovative sectors, asymmetric opportunities. You accept that some of your bets will fail, because the ones that succeed can be transformative. You're playing a different game than most investors.",
    strengths: [
      "Comfortable with significant volatility and drawdowns",
      "Early mover instinct — you spot trends before the crowd",
      "Portfolio can significantly outperform in bull markets",
    ],
    watchOuts: [
      "Ensure your financial foundations are solid before exploring frontiers",
      "High-risk allocations need strict position sizing rules",
      "Excitement isn't a thesis — always have a clear investment rationale",
    ],
    portfolioHint:
      "A high-conviction portfolio with thematic and sector bets, growth stocks, small-caps, and some alternative assets. Consider keeping 20-30% in more stable holdings as an anchor. Use ISA and SIPP wrappers to shelter gains from tax.",
  },
  {
    id: "maverick",
    name: "The Maverick",
    scoreRange: [8.6, 10.0],
    color: "#DC143C",
    emoji: "🔥",
    headline: "You play to win, and you know the stakes.",
    description:
      "You're an aggressive, conviction-driven investor who embraces maximum volatility for maximum potential return. You understand that concentrated positions and unconventional assets can both make and lose fortunes. You're not gambling — you've done the work — but you accept that big outcomes require big risks.",
    strengths: [
      "Can stomach extreme drawdowns without emotional selling",
      "Willing to hold concentrated, high-conviction positions",
      "Potential for life-changing returns over long time horizons",
    ],
    watchOuts: [
      "Even mavericks need an emergency fund and basic financial security",
      "Position sizing is everything — never bet what you can't afford to lose",
      "Past success can breed dangerous overconfidence",
    ],
    portfolioHint:
      "A concentrated, high-growth portfolio — but only with money you can genuinely afford to lose. Consider a barbell approach: a small, untouchable safety net alongside aggressive growth positions. Maximise tax-efficient wrappers.",
  },
];

export function getArchetype(score: number): ArchetypeResult {
  const clamped = Math.max(1.0, Math.min(10.0, score));
  for (const arch of archetypes) {
    if (clamped >= arch.scoreRange[0] && clamped <= arch.scoreRange[1]) {
      return arch;
    }
  }
  // Fallback: find closest
  return archetypes.reduce((closest, arch) => {
    const mid = (arch.scoreRange[0] + arch.scoreRange[1]) / 2;
    const closestMid = (closest.scoreRange[0] + closest.scoreRange[1]) / 2;
    return Math.abs(clamped - mid) < Math.abs(clamped - closestMid)
      ? arch
      : closest;
  });
}

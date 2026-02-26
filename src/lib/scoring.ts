import { getRandomisedQuestions } from "./questions";
import { getArchetype } from "./archetypes";
import { AssessmentResult, Dimension, DimensionScore } from "./types";

const dimensionWeights: Record<Dimension, number> = {
  capacity: 0.2,
  attitude: 0.3,
  composure: 0.25,
  need: 0.25,
};

const dimensionLabels: Record<Dimension, string> = {
  capacity: "Financial Capacity",
  attitude: "Risk Attitude",
  composure: "Behavioural Composure",
  need: "Growth Need",
};

function getDimensionInsight(dimension: Dimension, score: number): string {
  const insights: Record<Dimension, Record<string, string>> = {
    capacity: {
      low: "Your current financial position suggests a cautious approach is wise. Building up your cash reserves and reducing debt before taking on investment risk will put you in a much stronger position.",
      mid: "You have a reasonable financial foundation for investing. Your time horizon and savings give you room for moderate risk, though maintaining an adequate emergency fund remains important.",
      high: "Your financial position gives you significant capacity to take on investment risk. A long time horizon and solid savings base mean you can weather market downturns without it affecting your daily life.",
    },
    attitude: {
      low: "You naturally prefer certainty and stability in your investments. This isn't a weakness — it means you're less likely to make costly emotional mistakes. Focus on investments that let you sleep well.",
      mid: "You have a balanced view of investment risk. You understand that some volatility is the price of growth, and you're comfortable with that trade-off within reason.",
      high: "You're psychologically comfortable with significant investment risk and volatility. You see market drops as opportunities rather than threats. Make sure this confidence is backed by solid research.",
    },
    composure: {
      low: "You tend to react emotionally to market movements, which can lead to buying high and selling low. Consider automating your investments and checking your portfolio less frequently.",
      mid: "You generally keep your composure during market turbulence, though big drops can test your resolve. Having a written investment plan can help you stay the course when emotions run high.",
      high: "You demonstrate excellent emotional discipline with your investments. You're unlikely to panic-sell or make impulsive decisions, which is one of the most valuable traits an investor can have.",
    },
    need: {
      low: "Your financial goals are achievable without taking on much investment risk. This is a great position to be in — you can afford to prioritise capital preservation and steady income.",
      mid: "You need your investments to deliver moderate growth to reach your goals. A balanced approach with a tilt toward equities can help bridge the gap without excessive risk.",
      high: "You need meaningful investment growth to reach your financial goals. This creates a genuine tension — the need for higher returns means accepting more volatility. Make sure your strategy is sustainable.",
    },
  };

  const level = score <= 4 ? "low" : score <= 7 ? "mid" : "high";
  return insights[dimension][level];
}

export function calculateResults(
  answers: Record<number, number>,
  activeQuestions?: { id: number; dimension: Dimension }[]
): AssessmentResult {
  // Use provided questions or fall back to a fresh set
  const qs = activeQuestions || getRandomisedQuestions();

  // Group scores by dimension
  const dimensionScores: Record<Dimension, number[]> = {
    capacity: [],
    attitude: [],
    composure: [],
    need: [],
  };

  for (const q of qs) {
    const answer = answers[q.id];
    if (answer !== undefined) {
      dimensionScores[q.dimension].push(answer);
    }
  }

  // Average each dimension
  const dimensions: DimensionScore[] = (
    ["capacity", "attitude", "composure", "need"] as Dimension[]
  ).map((dim) => {
    const scores = dimensionScores[dim];
    const avg =
      scores.length > 0
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 5.5;
    const score = Math.round(avg * 10) / 10;
    return {
      dimension: dim,
      score,
      label: dimensionLabels[dim],
      insight: getDimensionInsight(dim, score),
    };
  });

  // Weighted overall score
  let overall = dimensions.reduce(
    (sum, d) => sum + d.score * dimensionWeights[d.dimension],
    0
  );

  // Critical rule: overall capped by capacity + 1.5
  const capacityScore =
    dimensions.find((d) => d.dimension === "capacity")?.score ?? 5.5;
  overall = Math.min(overall, capacityScore + 1.5);

  // Composure adjustment: high attitude + low composure nudges down
  const attitudeScore =
    dimensions.find((d) => d.dimension === "attitude")?.score ?? 5.5;
  const composureScore =
    dimensions.find((d) => d.dimension === "composure")?.score ?? 5.5;
  if (attitudeScore >= 7 && composureScore <= 4) {
    overall = Math.max(1, overall - 0.8);
  }

  overall = Math.round(overall * 10) / 10;
  overall = Math.max(1, Math.min(10, overall));

  const archetype = getArchetype(overall);

  return {
    dimensions,
    overall,
    archetype,
    answers,
    completedAt: new Date().toISOString(),
  };
}

/** Encode results into a URL-safe base64 string */
export function encodeResults(result: AssessmentResult): string {
  const payload = {
    d: result.dimensions.map((d) => ({
      k: d.dimension,
      s: d.score,
    })),
    o: result.overall,
    a: result.answers,
  };
  const json = JSON.stringify(payload);
  if (typeof window !== "undefined") {
    return btoa(json);
  }
  return Buffer.from(json).toString("base64");
}

/** Decode results from a URL-safe base64 string */
export function decodeResults(
  encoded: string
): AssessmentResult | null {
  try {
    let json: string;
    if (typeof window !== "undefined") {
      json = atob(encoded);
    } else {
      json = Buffer.from(encoded, "base64").toString("utf-8");
    }
    const payload = JSON.parse(json);
    const dimensions: DimensionScore[] = payload.d.map(
      (d: { k: Dimension; s: number }) => ({
        dimension: d.k,
        score: d.s,
        label: dimensionLabels[d.k],
        insight: getDimensionInsight(d.k, d.s),
      })
    );
    const overall = payload.o;
    const archetype = getArchetype(overall);
    return {
      dimensions,
      overall,
      archetype,
      answers: payload.a,
      completedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

import { Question } from "./types";

/**
 * Question pool — each "slot" has 1-3 variants.
 * getRandomisedQuestions() picks one variant per slot.
 */

type QuestionSlot = Question[];

const questionPool: QuestionSlot[] = [
  // === CAPACITY SLOT 1 (scenario-cards) ===
  [
    {
      id: 1,
      name: "The Inheritance",
      dimension: "capacity",
      interaction: "scenario-cards",
      prompt: "You receive an unexpected £50,000. What do you do?",
      subtitle: "Be honest — there's no wrong answer.",
      options: [
        {
          id: "savings",
          label: "Straight to savings",
          description:
            "Pay off debts and put the rest in a high-interest savings account. Sleep soundly.",
          value: 1,
          icon: "landmark",
        },
        {
          id: "mix-safe",
          label: "Mostly safe, a little invested",
          description:
            "Keep £35k in cash savings and invest £15k in a diversified fund.",
          value: 4,
          icon: "scale",
        },
        {
          id: "mix-growth",
          label: "Split it and grow it",
          description:
            "Keep 6 months' expenses in cash, invest the rest across shares and funds.",
          value: 7,
          icon: "trending-up",
        },
        {
          id: "all-in",
          label: "Invest almost everything",
          description:
            "Minimal cash buffer. Put the bulk into growth stocks and higher-risk opportunities.",
          value: 10,
          icon: "rocket",
        },
      ],
    },
    {
      id: 1,
      name: "The Bonus",
      dimension: "capacity",
      interaction: "scenario-cards",
      prompt: "You get an unexpected £25,000 bonus at work. What's your first move?",
      subtitle: "There are no wrong answers here.",
      options: [
        {
          id: "debts",
          label: "Clear my debts",
          description:
            "Pay off the credit card, the car loan, anything outstanding. Start fresh.",
          value: 1,
          icon: "credit-card",
        },
        {
          id: "emergency",
          label: "Build my safety net",
          description:
            "Boost my emergency fund to 6+ months, then maybe invest a small amount.",
          value: 4,
          icon: "home",
        },
        {
          id: "invest-most",
          label: "Invest the majority",
          description:
            "Keep a small buffer and put the rest into a mix of funds and shares.",
          value: 7,
          icon: "bar-chart",
        },
        {
          id: "aggressive",
          label: "Go big on a conviction bet",
          description:
            "I've been watching some opportunities. This is the capital I've been waiting for.",
          value: 10,
          icon: "target",
        },
      ],
    },
  ],

  // === CAPACITY SLOT 2 (visual-slider) ===
  [
    {
      id: 2,
      name: "The Time Machine",
      dimension: "capacity",
      interaction: "visual-slider",
      prompt: "How many years until you'll need this money?",
      subtitle:
        "Think about your biggest financial goal — retirement, a house, your children's future.",
      sliderConfig: {
        min: 1,
        max: 30,
        step: 1,
        minLabel: "1 year",
        maxLabel: "30+ years",
        valueToScore: (v: number) => {
          if (v <= 2) return 1;
          if (v <= 5) return 3;
          if (v <= 10) return 5;
          if (v <= 15) return 7;
          if (v <= 20) return 8;
          return 10;
        },
        formatValue: (v: number) => (v >= 30 ? "30+ years" : `${v} years`),
      },
    },
    {
      id: 2,
      name: "The Countdown",
      dimension: "capacity",
      interaction: "visual-slider",
      prompt: "When will you need to access a significant portion of your investments?",
      subtitle:
        "Think about your next major life milestone — a home purchase, school fees, or retirement.",
      sliderConfig: {
        min: 1,
        max: 30,
        step: 1,
        minLabel: "Within a year",
        maxLabel: "30+ years away",
        valueToScore: (v: number) => {
          if (v <= 2) return 1;
          if (v <= 5) return 3;
          if (v <= 10) return 5;
          if (v <= 15) return 7;
          if (v <= 20) return 8;
          return 10;
        },
        formatValue: (v: number) => (v >= 30 ? "30+ years" : `${v} years`),
      },
    },
  ],

  // === ATTITUDE SLOT 1 (animated-chart) ===
  [
    {
      id: 3,
      name: "The Rollercoaster",
      dimension: "attitude",
      interaction: "animated-chart",
      prompt: "Your portfolio just dropped 20% in a month. What's your gut reaction?",
      subtitle: "Watch the chart below, then tell us how you'd feel.",
      chartData: [
        { month: "Jan", value: 10000 },
        { month: "Feb", value: 10400 },
        { month: "Mar", value: 10800 },
        { month: "Apr", value: 11200 },
        { month: "May", value: 10600 },
        { month: "Jun", value: 9800 },
        { month: "Jul", value: 8800 },
        { month: "Aug", value: 8000 },
      ],
      options: [
        {
          id: "panic",
          label: "Sell everything",
          description: "I can't watch this. Get me out before it gets worse.",
          value: 1,
          icon: "frown",
        },
        {
          id: "uneasy",
          label: "Concerned but holding",
          description:
            "I'm worried, but I know selling now locks in the loss.",
          value: 4,
          icon: "meh",
        },
        {
          id: "calm",
          label: "This is normal",
          description: "Markets go up and down. I'll ride it out and check back later.",
          value: 7,
          icon: "smile",
        },
        {
          id: "excited",
          label: "Time to buy more",
          description: "Everything's on sale! I'm adding to my positions.",
          value: 10,
          icon: "laugh",
        },
      ],
    },
    {
      id: 3,
      name: "The Headline",
      dimension: "attitude",
      interaction: "animated-chart",
      prompt: "\"FTSE crashes 25% — worst quarter since 2008.\" You're £12,000 down. How do you react?",
      subtitle: "Watch the chart, then be honest about your gut feeling.",
      chartData: [
        { month: "Jan", value: 50000 },
        { month: "Feb", value: 52000 },
        { month: "Mar", value: 48000 },
        { month: "Apr", value: 44000 },
        { month: "May", value: 40000 },
        { month: "Jun", value: 38000 },
      ],
      options: [
        {
          id: "panic",
          label: "I'd sell immediately",
          description: "This feels like 2008 all over again. I need to protect what's left.",
          value: 1,
          icon: "frown",
        },
        {
          id: "reduce",
          label: "I'd reduce my exposure",
          description: "Sell some positions and move to safer ground until it blows over.",
          value: 4,
          icon: "meh",
        },
        {
          id: "hold",
          label: "I'd hold and wait",
          description: "Panicking never works. I'll leave it alone and reassess in six months.",
          value: 7,
          icon: "smile",
        },
        {
          id: "buy",
          label: "I'd be buying aggressively",
          description: "This is exactly when you should be putting money in. Fearful markets create opportunities.",
          value: 10,
          icon: "laugh",
        },
      ],
    },
  ],

  // === ATTITUDE SLOT 2 (would-you-rather) ===
  [
    {
      id: 4,
      name: "The Cocktail Party",
      dimension: "attitude",
      interaction: "would-you-rather",
      prompt: "Which investment story would you rather tell at a dinner party?",
      options: [
        {
          id: "steady",
          label: "The Steady Compounder",
          description:
            "\"I've earned 6% every year for a decade. Nothing flashy, but my money's doubled.\"",
          value: 3,
          icon: "wine",
        },
        {
          id: "bold",
          label: "The Bold Bet",
          description:
            "\"I spotted an opportunity early, took a big position, and it paid off 5x in three years.\"",
          value: 9,
          icon: "target",
        },
      ],
    },
    {
      id: 4,
      name: "The Pub Debate",
      dimension: "attitude",
      interaction: "would-you-rather",
      prompt: "Your mate asks for investment advice. Which do you recommend?",
      options: [
        {
          id: "tracker",
          label: "A global tracker fund",
          description:
            "\"Just put it in an ETF and forget about it. You'll thank me in 20 years.\"",
          value: 3,
          icon: "globe",
        },
        {
          id: "picks",
          label: "A handful of stock picks",
          description:
            "\"I've been researching three companies I really believe in. Higher risk, but the upside is massive.\"",
          value: 9,
          icon: "microscope",
        },
      ],
    },
  ],

  // === ATTITUDE SLOT 3 (drag-allocate) ===
  [
    {
      id: 5,
      name: "Build Your Portfolio",
      dimension: "attitude",
      interaction: "drag-allocate",
      prompt: "Build your ideal portfolio. Drag the sliders to allocate 100%.",
      subtitle: "There's no perfect answer — just what feels right to you.",
      allocateConfig: {
        categories: [
          {
            id: "cash",
            label: "Cash & Bonds",
            color: "#4682B4",
            description: "Low risk, low return. Capital preservation.",
          },
          {
            id: "funds",
            label: "Index Funds",
            color: "#2BBAB4",
            description: "Diversified market exposure. Medium risk.",
          },
          {
            id: "stocks",
            label: "Individual Stocks",
            color: "#DAA520",
            description: "Higher risk, higher potential return.",
          },
          {
            id: "alternative",
            label: "Crypto & Alternatives",
            color: "#DC143C",
            description: "High risk, speculative. Potential for large gains or losses.",
          },
        ],
        allocationToScore: (allocs: Record<string, number>) => {
          const cash = allocs["cash"] || 0;
          const funds = allocs["funds"] || 0;
          const stocks = allocs["stocks"] || 0;
          const alt = allocs["alternative"] || 0;
          // Weighted: cash=1, funds=3.5, stocks=7, alt=10
          const weighted = (cash * 1 + funds * 3.5 + stocks * 7 + alt * 10) / 100;
          return Math.max(1, Math.min(10, Math.round(weighted * 10) / 10));
        },
      },
    },
  ],

  // === COMPOSURE SLOT 1 (animated-chart) ===
  [
    {
      id: 6,
      name: "The Monday Morning",
      dimension: "composure",
      interaction: "animated-chart",
      prompt:
        "It's Monday morning. Over the weekend, global markets crashed 15%. Your portfolio is down £8,000. What do you actually do?",
      subtitle: "Not what you think you should do — what would you actually do?",
      chartData: [
        { month: "Mon", value: 50000 },
        { month: "Tue", value: 51200 },
        { month: "Wed", value: 52000 },
        { month: "Thu", value: 51500 },
        { month: "Fri", value: 50800 },
        { month: "Sat", value: 44000 },
        { month: "Sun", value: 42000 },
      ],
      options: [
        {
          id: "sell-all",
          label: "Sell and go to cash",
          description: "I'll buy back in once things calm down.",
          value: 1,
          icon: "footprints",
        },
        {
          id: "sell-some",
          label: "Sell some, keep some",
          description: "Reduce my exposure but stay partly invested.",
          value: 4,
          icon: "circle-help",
        },
        {
          id: "hold",
          label: "Do nothing",
          description: "I'll check again in a few weeks. No point reacting.",
          value: 7,
          icon: "anchor",
        },
        {
          id: "buy-dip",
          label: "Buy the dip",
          description: "This is a buying opportunity. I'm adding money.",
          value: 10,
          icon: "dumbbell",
        },
      ],
    },
    {
      id: 6,
      name: "The Flash Crash",
      dimension: "composure",
      interaction: "animated-chart",
      prompt:
        "You check your portfolio at lunch. It's down £6,000 since this morning due to a flash crash. What do you do in the next hour?",
      subtitle: "Be honest — no one's watching.",
      chartData: [
        { month: "9am", value: 40000 },
        { month: "10am", value: 39500 },
        { month: "11am", value: 37000 },
        { month: "12pm", value: 34000 },
      ],
      options: [
        {
          id: "sell-all",
          label: "Sell immediately",
          description: "Cut my losses right now. I can't afford this.",
          value: 1,
          icon: "footprints",
        },
        {
          id: "sell-some",
          label: "Trim my riskiest positions",
          description: "Lighten the load, keep the core holdings.",
          value: 4,
          icon: "circle-help",
        },
        {
          id: "hold",
          label: "Close the app",
          description: "Flash crashes recover. I'll check tomorrow.",
          value: 7,
          icon: "anchor",
        },
        {
          id: "buy-dip",
          label: "Add money",
          description: "Flash crash = flash sale. I'm buying.",
          value: 10,
          icon: "dumbbell",
        },
      ],
    },
  ],

  // === COMPOSURE SLOT 2 (icon-scale) ===
  [
    {
      id: 7,
      name: "The Checking Habit",
      dimension: "composure",
      interaction: "icon-scale",
      prompt: "How often do you check your investment portfolio?",
      subtitle: "Be honest — we all have habits.",
      iconScaleConfig: {
        icons: ["smartphone", "smartphone", "smartphone", "smartphone", "smartphone"],
        labels: [
          "Multiple times a day",
          "Once a day",
          "A few times a week",
          "Monthly",
          "Quarterly or less",
        ],
        indexToScore: (i: number) => {
          // More checking = less composure
          const scores = [1, 3, 5, 7, 10];
          return scores[i] ?? 5;
        },
      },
    },
    {
      id: 7,
      name: "The Notification",
      dimension: "composure",
      interaction: "icon-scale",
      prompt: "Your broker sends a notification: 'Your portfolio changed significantly today.' What do you do?",
      subtitle: "Pick the response closest to your actual behaviour.",
      iconScaleConfig: {
        icons: ["smartphone", "smartphone", "smartphone", "smartphone", "smartphone"],
        labels: [
          "Drop everything and check immediately",
          "Check within the hour",
          "Check when I get a moment later today",
          "Glance at it tomorrow",
          "Ignore it — I'll review at my regular schedule",
        ],
        indexToScore: (i: number) => {
          const scores = [1, 3, 5, 7, 10];
          return scores[i] ?? 5;
        },
      },
    },
  ],

  // === COMPOSURE SLOT 3 (would-you-rather) ===
  [
    {
      id: 8,
      name: "The Regret Test",
      dimension: "composure",
      interaction: "would-you-rather",
      prompt: "Which would bother you more?",
      options: [
        {
          id: "lost-money",
          label: "I invested and lost 20%",
          description:
            "The pain of watching your money shrink. You took a chance and it didn't work out.",
          value: 3,
          icon: "trending-down",
        },
        {
          id: "missed-out",
          label: "I didn't invest and missed a 40% gain",
          description:
            "The regret of sitting on the sidelines. You played it safe and missed the rally.",
          value: 9,
          icon: "annoyed",
        },
      ],
    },
    {
      id: 8,
      name: "The Hindsight Test",
      dimension: "composure",
      interaction: "would-you-rather",
      prompt: "Looking back on your worst financial decision, what bothers you more?",
      options: [
        {
          id: "acted",
          label: "That I took the risk",
          description:
            "I should have stayed safe. The loss still stings. I'd rather have my money back than a lesson learned.",
          value: 3,
          icon: "frown",
        },
        {
          id: "didnt-act",
          label: "That I played it too safe",
          description:
            "I knew it was an opportunity and I hesitated. The money I didn't make haunts me more than any loss.",
          value: 9,
          icon: "annoyed",
        },
      ],
    },
  ],

  // === NEED SLOT 1 (scenario-cards) ===
  [
    {
      id: 9,
      name: "The Retirement Gap",
      dimension: "need",
      interaction: "scenario-cards",
      prompt:
        "How would you describe the gap between where your finances are now and where they need to be?",
      subtitle: "Think about retirement, financial goals, or the life you want.",
      options: [
        {
          id: "on-track",
          label: "I'm on track",
          description:
            "My pension, savings and investments should cover my needs. No heroics required.",
          value: 1,
          icon: "check-circle",
        },
        {
          id: "small-gap",
          label: "Small gap to close",
          description:
            "I need a bit more growth, but nothing dramatic. Steady returns will get me there.",
          value: 4,
          icon: "bar-chart",
        },
        {
          id: "meaningful-gap",
          label: "Meaningful gap",
          description:
            "I need my investments to work harder. Playing it too safe won't get me where I need to be.",
          value: 7,
          icon: "zap",
        },
        {
          id: "big-gap",
          label: "Significant gap",
          description:
            "I need substantial growth. Without higher returns, I'll fall well short of my goals.",
          value: 10,
          icon: "target",
        },
      ],
    },
    {
      id: 9,
      name: "The Reality Check",
      dimension: "need",
      interaction: "scenario-cards",
      prompt:
        "If your investments returned 4% per year for the next decade, how would that affect your plans?",
      subtitle: "4% is roughly what a balanced, cautious portfolio might return after inflation.",
      options: [
        {
          id: "fine",
          label: "That would be fine",
          description:
            "I'm already in a good position. 4% would keep me on track comfortably.",
          value: 1,
          icon: "check-circle",
        },
        {
          id: "ok",
          label: "Workable, but tight",
          description:
            "I could make it work, but I'd prefer more. Some goals might need adjusting.",
          value: 4,
          icon: "bar-chart",
        },
        {
          id: "not-enough",
          label: "Not enough",
          description:
            "I need more than 4% to hit my targets. I'd have to rethink my plans.",
          value: 7,
          icon: "zap",
        },
        {
          id: "disaster",
          label: "That would be a real problem",
          description:
            "I'm counting on significantly better returns. 4% would leave a serious shortfall.",
          value: 10,
          icon: "target",
        },
      ],
    },
  ],

  // === NEED SLOT 2 (visual-slider) ===
  [
    {
      id: 10,
      name: "The Magic Number",
      dimension: "need",
      interaction: "visual-slider",
      prompt: "What annual return do you think you need to reach your goals?",
      subtitle:
        "Cash savings earn ~4-5%. The stock market has historically returned ~8-10% per year. Returns are variable and not guaranteed.",
      sliderConfig: {
        min: 2,
        max: 20,
        step: 1,
        minLabel: "2%",
        maxLabel: "20%+",
        valueToScore: (v: number) => {
          if (v <= 4) return 1;
          if (v <= 6) return 3;
          if (v <= 8) return 5;
          if (v <= 10) return 6;
          if (v <= 14) return 8;
          return 10;
        },
        formatValue: (v: number) => `${v}% per year`,
      },
    },
  ],

  // === NEED SLOT 3 (would-you-rather) ===
  [
    {
      id: 11,
      name: "The Ten-Year Bet",
      dimension: "need",
      interaction: "would-you-rather",
      prompt: "Choose your 10-year investment outcome:",
      options: [
        {
          id: "guaranteed",
          label: "Guaranteed £65,000",
          description:
            "Invest £50,000 and get a guaranteed £65,000 back in 10 years. A sure 30% total return.",
          value: 3,
          icon: "lock",
        },
        {
          id: "variable",
          label: "Somewhere between £30,000 and £150,000",
          description:
            "Invest £50,000 with a chance of tripling your money — but you could lose 40% too.",
          value: 9,
          icon: "dices",
        },
      ],
    },
    {
      id: 11,
      name: "The Pension Choice",
      dimension: "need",
      interaction: "would-you-rather",
      prompt: "You're choosing a pension strategy for the next 20 years:",
      options: [
        {
          id: "stable",
          label: "Steady and predictable",
          description:
            "A 'lifestyling' approach that gradually moves to bonds. You'll likely end up with £280k-£320k.",
          value: 3,
          icon: "lock",
        },
        {
          id: "growth",
          label: "Stay in growth",
          description:
            "Stay 100% in equities the whole time. Could be £180k or £500k — but the average is higher.",
          value: 9,
          icon: "dices",
        },
      ],
    },
  ],

  // === CALIBRATION SLOT (scenario-cards) ===
  [
    {
      id: 12,
      name: "The Final Word",
      dimension: "attitude",
      interaction: "scenario-cards",
      prompt: "Which statement best describes your investment philosophy?",
      subtitle: "Choose the one that resonates most — not what sounds smartest.",
      options: [
        {
          id: "preserve",
          label: "Protect what I have",
          description:
            "Preserving my capital is my top priority. I'd rather earn less than risk losing what I've built.",
          value: 1,
          icon: "shield",
        },
        {
          id: "steady-growth",
          label: "Grow steadily over time",
          description:
            "I want reliable growth with manageable ups and downs. Consistency matters most.",
          value: 4,
          icon: "sprout",
        },
        {
          id: "beat-market",
          label: "Beat the market",
          description:
            "I'm willing to accept volatility for the chance of above-average returns.",
          value: 7,
          icon: "zap",
        },
        {
          id: "max-growth",
          label: "Maximum growth at any cost",
          description:
            "I have a long time horizon and strong nerves. I want the highest possible returns.",
          value: 10,
          icon: "flame",
        },
      ],
    },
    {
      id: 12,
      name: "The Mirror",
      dimension: "attitude",
      interaction: "scenario-cards",
      prompt: "If your portfolio were a car, which would it be?",
      subtitle: "Go with your instinct.",
      options: [
        {
          id: "volvo",
          label: "A reliable Volvo",
          description:
            "Safety-tested, predictable, holds its value. Gets you there without drama.",
          value: 1,
          icon: "shield",
        },
        {
          id: "bmw",
          label: "A well-specced BMW",
          description:
            "Quality engineering, good performance, a few premium features. Solid all-rounder.",
          value: 4,
          icon: "sprout",
        },
        {
          id: "porsche",
          label: "A Porsche 911",
          description:
            "Thrilling to drive, seriously fast, but you need to know what you're doing.",
          value: 7,
          icon: "zap",
        },
        {
          id: "f1",
          label: "A Formula 1 car",
          description:
            "Insanely fast, built to win, could crash spectacularly. Not for Sunday drivers.",
          value: 10,
          icon: "flame",
        },
      ],
    },
  ],
];

/**
 * Returns a randomised set of 12 questions — one per slot,
 * picking a random variant where multiple exist.
 */
export function getRandomisedQuestions(): Question[] {
  return questionPool.map((slot) => {
    const index = Math.floor(Math.random() * slot.length);
    return slot[index];
  });
}

/** Default export for backward compat — picks a random set once at import time */
export const questions: Question[] = getRandomisedQuestions();

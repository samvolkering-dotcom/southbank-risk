import { Question } from "./types";

export const questions: Question[] = [
  // === CAPACITY (Q1-Q2) ===
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
        value: 1.0,
        icon: "🏦",
      },
      {
        id: "mix-safe",
        label: "Mostly safe, a little invested",
        description:
          "Keep £35k in cash savings and invest £15k in a diversified fund.",
        value: 2.0,
        icon: "⚖️",
      },
      {
        id: "mix-growth",
        label: "Split it and grow it",
        description:
          "Keep 6 months' expenses in cash, invest the rest across shares and funds.",
        value: 3.0,
        icon: "📈",
      },
      {
        id: "all-in",
        label: "Invest almost everything",
        description:
          "Minimal cash buffer. Put the bulk into growth stocks and higher-risk opportunities.",
        value: 4.0,
        icon: "🚀",
      },
    ],
  },
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
        if (v <= 3) return 1.0;
        if (v <= 7) return 2.0;
        if (v <= 15) return 3.0;
        return 4.0;
      },
      formatValue: (v: number) => (v >= 30 ? "30+ years" : `${v} years`),
    },
  },

  // === ATTITUDE (Q3-Q5) ===
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
        value: 1.0,
        icon: "😰",
      },
      {
        id: "uneasy",
        label: "Concerned but holding",
        description:
          "I'm worried, but I know selling now locks in the loss.",
        value: 2.0,
        icon: "😟",
      },
      {
        id: "calm",
        label: "This is normal",
        description: "Markets go up and down. I'll ride it out and check back later.",
        value: 3.0,
        icon: "😌",
      },
      {
        id: "excited",
        label: "Time to buy more",
        description: "Everything's on sale! I'm adding to my positions.",
        value: 4.0,
        icon: "🤑",
      },
    ],
  },
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
        value: 1.5,
        icon: "🍷",
      },
      {
        id: "bold",
        label: "The Bold Bet",
        description:
          "\"I spotted an opportunity early, took a big position, and it paid off 5x in three years.\"",
        value: 3.5,
        icon: "🎯",
      },
    ],
  },
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
        // Weighted score: cash=1, funds=2, stocks=3, alt=4
        const weighted = (cash * 1 + funds * 2 + stocks * 3 + alt * 4) / 100;
        return Math.max(1.0, Math.min(4.0, weighted));
      },
    },
  },

  // === COMPOSURE (Q6-Q8) ===
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
        value: 1.0,
        icon: "🏃",
      },
      {
        id: "sell-some",
        label: "Sell some, keep some",
        description: "Reduce my exposure but stay partly invested.",
        value: 2.0,
        icon: "🤔",
      },
      {
        id: "hold",
        label: "Do nothing",
        description: "I'll check again in a few weeks. No point reacting.",
        value: 3.0,
        icon: "🧘",
      },
      {
        id: "buy-dip",
        label: "Buy the dip",
        description: "This is a buying opportunity. I'm adding money.",
        value: 4.0,
        icon: "💪",
      },
    ],
  },
  {
    id: 7,
    name: "The Checking Habit",
    dimension: "composure",
    interaction: "icon-scale",
    prompt: "How often do you check your investment portfolio?",
    subtitle: "Be honest — we all have habits.",
    iconScaleConfig: {
      icons: ["📱", "📱", "📱", "📱", "📱"],
      labels: [
        "Multiple times a day",
        "Once a day",
        "A few times a week",
        "Monthly",
        "Quarterly or less",
      ],
      indexToScore: (i: number) => {
        // More checking = less composure
        const scores = [1.0, 1.8, 2.5, 3.2, 4.0];
        return scores[i] ?? 2.5;
      },
    },
  },
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
        value: 1.5,
        icon: "📉",
      },
      {
        id: "missed-out",
        label: "I didn't invest and missed a 40% gain",
        description:
          "The regret of sitting on the sidelines. You played it safe and missed the rally.",
        value: 3.5,
        icon: "😤",
      },
    ],
  },

  // === NEED (Q9-Q11) ===
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
        value: 1.0,
        icon: "✅",
      },
      {
        id: "small-gap",
        label: "Small gap to close",
        description:
          "I need a bit more growth, but nothing dramatic. Steady returns will get me there.",
        value: 2.0,
        icon: "📊",
      },
      {
        id: "meaningful-gap",
        label: "Meaningful gap",
        description:
          "I need my investments to work harder. Playing it too safe won't get me where I need to be.",
        value: 3.0,
        icon: "⚡",
      },
      {
        id: "big-gap",
        label: "Significant gap",
        description:
          "I need substantial growth. Without higher returns, I'll fall well short of my goals.",
        value: 4.0,
        icon: "🎯",
      },
    ],
  },
  {
    id: 10,
    name: "The Magic Number",
    dimension: "need",
    interaction: "visual-slider",
    prompt: "What annual return do you think you need to reach your goals?",
    subtitle:
      "Cash savings earn ~4-5%. The stock market has historically returned ~8-10% per year.",
    sliderConfig: {
      min: 2,
      max: 20,
      step: 1,
      minLabel: "2%",
      maxLabel: "20%+",
      valueToScore: (v: number) => {
        if (v <= 5) return 1.0;
        if (v <= 8) return 2.0;
        if (v <= 12) return 3.0;
        return 4.0;
      },
      formatValue: (v: number) => `${v}% per year`,
    },
  },
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
        value: 1.5,
        icon: "🔒",
      },
      {
        id: "variable",
        label: "Somewhere between £30,000 and £150,000",
        description:
          "Invest £50,000 with a chance of tripling your money — but you could lose 40% too.",
        value: 3.5,
        icon: "🎲",
      },
    ],
  },

  // === CROSS-DIMENSIONAL CALIBRATION (Q12) ===
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
        value: 1.0,
        icon: "🛡️",
      },
      {
        id: "steady-growth",
        label: "Grow steadily over time",
        description:
          "I want reliable growth with manageable ups and downs. Consistency matters most.",
        value: 2.0,
        icon: "🌱",
      },
      {
        id: "beat-market",
        label: "Beat the market",
        description:
          "I'm willing to accept volatility for the chance of above-average returns.",
        value: 3.0,
        icon: "⚡",
      },
      {
        id: "max-growth",
        label: "Maximum growth at any cost",
        description:
          "I have a long time horizon and strong nerves. I want the highest possible returns.",
        value: 4.0,
        icon: "🔥",
      },
    ],
  },
];

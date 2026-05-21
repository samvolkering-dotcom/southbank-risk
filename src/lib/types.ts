import type { IconName } from "./icons";

export type Dimension = "capacity" | "attitude" | "composure" | "need";

export type InteractionType =
  | "scenario-cards"
  | "visual-slider"
  | "animated-chart"
  | "would-you-rather"
  | "drag-allocate"
  | "icon-scale";

export interface QuestionOption {
  id: string;
  label: string;
  description: string;
  value: number; // 1.0 - 4.0
  icon?: IconName;
}

export interface SliderConfig {
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  /** Maps slider value to a score 1.0-4.0 */
  valueToScore: (value: number) => number;
  /** Format the slider value for display */
  formatValue: (value: number) => string;
}

export interface AllocateCategory {
  id: string;
  label: string;
  color: string;
  description: string;
}

export interface AllocateConfig {
  categories: AllocateCategory[];
  /** Maps allocation percentages to a score 1.0-4.0 */
  allocationToScore: (allocations: Record<string, number>) => number;
}

export interface IconScaleConfig {
  icons: IconName[];
  labels: string[];
  /** Maps selected index (0-based) to a score 1.0-4.0 */
  indexToScore: (index: number) => number;
}

export interface Question {
  id: number;
  name: string;
  dimension: Dimension;
  interaction: InteractionType;
  prompt: string;
  subtitle?: string;
  options?: QuestionOption[];
  sliderConfig?: SliderConfig;
  allocateConfig?: AllocateConfig;
  iconScaleConfig?: IconScaleConfig;
  /** For animated-chart: the crash scenario data */
  chartData?: { month: string; value: number }[];
}

export interface DimensionScore {
  dimension: Dimension;
  score: number; // 1.0 - 4.0
  label: string;
  insight: string;
}

export interface ArchetypeResult {
  id: string;
  name: string;
  scoreRange: [number, number];
  color: string;
  icon: IconName;
  headline: string;
  description: string;
  strengths: string[];
  watchOuts: string[];
  portfolioHint: string;
}

export interface AssessmentResult {
  dimensions: DimensionScore[];
  overall: number;
  archetype: ArchetypeResult;
  /** Raw answer values keyed by question id */
  answers: Record<number, number>;
  completedAt: string;
}

export interface AssessmentState {
  currentQuestion: number;
  answers: Record<number, number>;
  isComplete: boolean;
  setAnswer: (questionId: number, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  reset: () => void;
}

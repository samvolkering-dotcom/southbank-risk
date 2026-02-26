import { create } from "zustand";
import { questions } from "@/lib/questions";

interface AssessmentState {
  currentQuestion: number;
  answers: Record<number, number>;
  isComplete: boolean;
  setAnswer: (questionId: number, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  reset: () => void;
}

export const useAssessment = create<AssessmentState>((set, get) => ({
  currentQuestion: 0,
  answers: {},
  isComplete: false,

  setAnswer: (questionId, value) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    }));
  },

  nextQuestion: () => {
    const { currentQuestion } = get();
    if (currentQuestion < questions.length - 1) {
      set({ currentQuestion: currentQuestion + 1 });
    } else {
      set({ isComplete: true });
    }
  },

  prevQuestion: () => {
    const { currentQuestion } = get();
    if (currentQuestion > 0) {
      set({ currentQuestion: currentQuestion - 1 });
    }
  },

  goToQuestion: (index) => {
    if (index >= 0 && index < questions.length) {
      set({ currentQuestion: index, isComplete: false });
    }
  },

  reset: () => {
    set({
      currentQuestion: 0,
      answers: {},
      isComplete: false,
    });
  },
}));

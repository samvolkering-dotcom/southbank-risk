import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { questions } from "@/lib/questions";

interface AssessmentState {
  currentQuestion: number;
  answers: Record<number, number>;
  isComplete: boolean;
  emailSubmitted: boolean;
  submittedEmail: string;
  setAnswer: (questionId: number, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  markEmailSubmitted: (email: string) => void;
  reset: () => void;
}

export const useAssessment = create<AssessmentState>()(
  persist(
    (set, get) => ({
      currentQuestion: 0,
      answers: {},
      isComplete: false,
      emailSubmitted: false,
      submittedEmail: "",

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

      markEmailSubmitted: (email) =>
        set({ emailSubmitted: true, submittedEmail: email }),

      reset: () => {
        set({
          currentQuestion: 0,
          answers: {},
          isComplete: false,
          emailSubmitted: false,
          submittedEmail: "",
        });
      },
    }),
    {
      name: "southbank-risk-assessment",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        emailSubmitted: s.emailSubmitted,
        submittedEmail: s.submittedEmail,
      }),
    },
  ),
);

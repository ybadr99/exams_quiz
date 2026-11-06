import { create } from 'zustand'
import { defaultExam } from '@/features/quiz/data/exams'
import type { ExamData, OptionKey, QuizStatus } from '@/types/quiz'

interface QuizState {
  exam: ExamData
  status: QuizStatus
  currentIndex: number
  answers: Partial<Record<number, OptionKey>>
  startExam: (exam: ExamData) => void
  selectAnswer: (questionId: number, option: OptionKey) => void
  nextQuestion: () => void
  previousQuestion: () => void
  finishExam: () => void
}

function createInitialState() {
  return {
    status: 'idle' as QuizStatus,
    currentIndex: 0,
    answers: {} satisfies Partial<Record<number, OptionKey>>,
  }
}

export const useQuizStore = create<QuizState>((set, get) => ({
  exam: defaultExam,
  ...createInitialState(),

  startExam: (exam) => {
    set({ ...createInitialState(), exam, status: 'active' })
  },

  selectAnswer: (questionId, option) => {
    const { answers, status } = get()

    if (status !== 'active' || answers[questionId] !== undefined) {
      return
    }

    set({ answers: { ...answers, [questionId]: option } })
  },

  nextQuestion: () => {
    const { currentIndex, exam } = get()
    const lastIndex = exam.questions.length - 1

    set({ currentIndex: Math.min(currentIndex + 1, lastIndex) })
  },

  previousQuestion: () => {
    const { currentIndex } = get()

    set({ currentIndex: Math.max(currentIndex - 1, 0) })
  },

  finishExam: () => {
    if (get().status === 'active') {
      set({ status: 'finished' })
    }
  },
}))

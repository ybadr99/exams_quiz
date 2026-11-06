export const OPTION_KEYS = ['A', 'B', 'C', 'D'] as const

export type OptionKey = (typeof OPTION_KEYS)[number]

export interface Question {
  id: number
  unit: string
  type: 'mcq'
  prompt: string
  options: Record<OptionKey, string>
  answer: OptionKey
  explanation?: string
}

export interface Subject {
  id: string
  title: string
}

export interface ExamMeta {
  id: string
  title: string
  order: number
  questionCount: number
}

export interface ExamData {
  subject: Subject
  exam: ExamMeta
  questions: Question[]
}

export type QuizStatus = 'idle' | 'active' | 'finished'

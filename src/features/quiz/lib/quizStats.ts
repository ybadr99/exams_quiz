import type { ExamData, OptionKey, Question } from '@/types/quiz'

export interface QuizStats {
  total: number
  answered: number
  correct: number
  incorrect: number
  unanswered: number
  percentage: number
}

export function isAnswerCorrect(
  question: Question,
  answer: OptionKey | undefined,
): boolean {
  return answer === question.answer
}

export function getQuizStats(
  exam: ExamData,
  answers: Partial<Record<number, OptionKey>>,
): QuizStats {
  const total = exam.questions.length
  const answered = exam.questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length
  const correct = exam.questions.filter((question) =>
    isAnswerCorrect(question, answers[question.id]),
  ).length
  const incorrect = answered - correct

  return {
    total,
    answered,
    correct,
    incorrect,
    unanswered: total - answered,
    percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
  }
}

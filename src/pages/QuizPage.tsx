import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, CheckCheck } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { QuestionCard } from '@/features/quiz/components/QuestionCard'
import { QuizIntro } from '@/features/quiz/components/QuizIntro'
import { QuizProgress } from '@/features/quiz/components/QuizProgress'
import { QuizResults } from '@/features/quiz/components/QuizResults'
import { getExamById } from '@/features/quiz/data/exams'
import { getQuizStats } from '@/features/quiz/lib/quizStats'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useQuizStore } from '@/store/useQuizStore'
import type { OptionKey } from '@/types/quiz'

export function QuizPage() {
  const { examId } = useParams<{ examId: string }>()
  const routeExam = examId ? getExamById(examId) : undefined

  const storedExam = useQuizStore((state) => state.exam)
  const storedStatus = useQuizStore((state) => state.status)
  const storedIndex = useQuizStore((state) => state.currentIndex)
  const storedAnswers = useQuizStore((state) => state.answers)
  const startExam = useQuizStore((state) => state.startExam)
  const selectAnswer = useQuizStore((state) => state.selectAnswer)
  const nextQuestion = useQuizStore((state) => state.nextQuestion)
  const previousQuestion = useQuizStore((state) => state.previousQuestion)
  const finishExam = useQuizStore((state) => state.finishExam)

  const isCurrentExam = routeExam?.exam.id === storedExam.exam.id
  const status = isCurrentExam ? storedStatus : 'idle'
  const currentIndex = isCurrentExam ? storedIndex : 0
  const answers: Partial<Record<number, OptionKey>> = isCurrentExam
    ? storedAnswers
    : {}

  useDocumentTitle(
    !routeExam
      ? 'الصفحة غير موجودة | الاختبارات'
      : status === 'finished'
        ? 'النتائج | الاختبارات'
        : 'اختبار | الاختبارات',
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentIndex, status])

  if (!routeExam) {
    return <NotFoundPage />
  }

  if (status === 'idle') {
    return <QuizIntro exam={routeExam} onStart={() => startExam(routeExam)} />
  }

  if (status === 'finished') {
    return (
      <QuizResults
        exam={routeExam}
        answers={answers}
        onRestart={() => startExam(routeExam)}
      />
    )
  }

  const currentQuestion = routeExam.questions[currentIndex]
  const selectedAnswer = answers[currentQuestion.id]
  const isAnswered = selectedAnswer !== undefined
  const isLastQuestion = currentIndex === routeExam.questions.length - 1
  const stats = getQuizStats(routeExam, answers)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <QuizProgress
        current={currentIndex + 1}
        total={routeExam.questions.length}
        answered={stats.answered}
        correct={stats.correct}
      />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelect={(option) => selectAnswer(currentQuestion.id, option)}
      />

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={previousQuestion}
          disabled={currentIndex === 0}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
          السابق
        </button>

        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          {!isAnswered && (
            <p className="text-center text-sm text-slate-500 sm:text-end">
              اختر إجابة للمتابعة.
            </p>
          )}

          {isLastQuestion ? (
            <button
              type="button"
              onClick={finishExam}
              disabled={!isAnswered}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCheck className="size-4" aria-hidden="true" />
              إنهاء الاختبار
            </button>
          ) : (
            <button
              type="button"
              onClick={nextQuestion}
              disabled={!isAnswered}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              السؤال التالي
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

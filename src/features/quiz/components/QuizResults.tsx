import {
  ArrowRight,
  CheckCircle2,
  MinusCircle,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { QuizReview } from '@/features/quiz/components/QuizReview'
import { getQuizStats } from '@/features/quiz/lib/quizStats'
import type { ExamData, OptionKey } from '@/types/quiz'

interface QuizResultsProps {
  exam: ExamData
  answers: Partial<Record<number, OptionKey>>
  onRestart: () => void
}

function getResultMessage(percentage: number): string {
  if (percentage >= 80) return 'عمل ممتاز!'
  if (percentage >= 50) return 'جهد جيد!'
  return 'استمر في التدريب!'
}

export function QuizResults({ exam, answers, onRestart }: QuizResultsProps) {
  const stats = getQuizStats(exam, answers)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-indigo-50">
          <Trophy className="size-7 text-indigo-600" aria-hidden="true" />
        </span>

        <p className="mt-4 text-sm font-medium text-indigo-600">
          {exam.subject.title} · {exam.exam.title}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          اكتمل الاختبار
        </h1>
        <p className="mt-1 text-slate-600">{getResultMessage(stats.percentage)}</p>

        <div className="mt-6 flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold tracking-tight text-slate-900">
            {stats.percentage}%
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          {stats.correct} من {stats.total} إجابة صحيحة
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            صحيحة
          </div>
          <p className="mt-2 text-2xl font-semibold text-emerald-800">
            {stats.correct}
          </p>
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-rose-700">
            <XCircle className="size-4" aria-hidden="true" />
            خاطئة
          </div>
          <p className="mt-2 text-2xl font-semibold text-rose-800">
            {stats.incorrect}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <MinusCircle className="size-4" aria-hidden="true" />
            بدون إجابة
          </div>
          <p className="mt-2 text-2xl font-semibold text-slate-800">
            {stats.unanswered}
          </p>
        </div>
      </div>

      <QuizReview exam={exam} answers={answers} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          إعادة الاختبار
        </button>

        <Link
          to="/"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  )
}

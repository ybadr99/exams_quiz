import { CheckCircle2, MinusCircle, XCircle } from 'lucide-react'
import type { ExamData, OptionKey } from '@/types/quiz'

interface QuizReviewProps {
  exam: ExamData
  answers: Partial<Record<number, OptionKey>>
}

export function QuizReview({ exam, answers }: QuizReviewProps) {
  const incorrect = exam.questions.flatMap((question) => {
    const selected = answers[question.id]

    if (selected === undefined || selected === question.answer) {
      return []
    }

    return [{ question, selected }]
  })

  const unanswered = exam.questions.filter(
    (question) => answers[question.id] === undefined,
  )

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-900">
          مراجعة الإجابات
        </h2>
        {incorrect.length > 0 && (
          <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
            {incorrect.length} خاطئة
          </span>
        )}
      </div>

      {incorrect.length === 0 ? (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2
            className="mt-0.5 size-4 shrink-0"
            aria-hidden="true"
          />
          <p>لا توجد إجابات خاطئة. عمل رائع!</p>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {incorrect.map(({ question, selected }) => (
            <li
              key={question.id}
              className="rounded-lg border border-rose-200 bg-rose-50/50 p-4"
            >
              <div className="flex items-start gap-2">
                <XCircle
                  className="mt-0.5 size-4 shrink-0 text-rose-600"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500">
                    {question.unit}
                  </p>
                  <p className="mt-1 font-medium text-slate-900">
                    {question.prompt}
                  </p>

                  <p className="mt-2 text-sm text-rose-700">
                    <span className="font-semibold">إجابتك:</span>{' '}
                    {selected}. {question.options[selected]}
                  </p>
                  <p className="mt-1 text-sm text-emerald-700">
                    <span className="font-semibold">الإجابة الصحيحة:</span>{' '}
                    {question.answer}. {question.options[question.answer]}
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    {question.explanation ??
                      'لا يتوفر شرح إضافي لهذا السؤال.'}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {unanswered.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <MinusCircle className="size-4 text-slate-500" aria-hidden="true" />
            بدون إجابة ({unanswered.length})
          </h3>
          <ul className="mt-3 space-y-3">
            {unanswered.map((question) => (
              <li
                key={question.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-medium text-slate-500">
                  {question.unit}
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  {question.prompt}
                </p>
                <p className="mt-2 text-sm text-emerald-700">
                  <span className="font-semibold">الإجابة الصحيحة:</span>{' '}
                  {question.answer}. {question.options[question.answer]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

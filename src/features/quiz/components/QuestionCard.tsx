import { useId } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { OPTION_KEYS } from '@/types/quiz'
import type { OptionKey, Question } from '@/types/quiz'

interface QuestionCardProps {
  question: Question
  selectedAnswer: OptionKey | undefined
  onSelect: (option: OptionKey) => void
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}: QuestionCardProps) {
  const promptId = useId()
  const isAnswered = selectedAnswer !== undefined
  const isCorrect = selectedAnswer === question.answer

  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby={promptId}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
          {question.unit}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          اختيار من متعدد
        </span>
      </div>

      <h2
        id={promptId}
        className="text-lg font-semibold leading-relaxed text-slate-900 sm:text-xl"
      >
        {question.prompt}
      </h2>

      <div className="mt-5 space-y-3">
        {OPTION_KEYS.map((key) => {
          const isSelected = selectedAnswer === key
          const isCorrectOption = question.answer === key
          const showCorrect = isAnswered && isCorrectOption
          const showWrong = isAnswered && isSelected && !isCorrectOption

          return (
            <button
              key={key}
              type="button"
              disabled={isAnswered}
              aria-pressed={isSelected}
              onClick={() => onSelect(key)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-start transition-colors',
                !isAnswered &&
                  'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50',
                showCorrect && 'border-emerald-300 bg-emerald-50',
                showWrong && 'border-rose-300 bg-rose-50',
                isAnswered &&
                  !showCorrect &&
                  !showWrong &&
                  'border-slate-200 bg-white opacity-60',
                isAnswered && 'cursor-default',
              )}
            >
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                  !isAnswered && 'bg-slate-100 text-slate-700',
                  showCorrect && 'bg-emerald-600 text-white',
                  showWrong && 'bg-rose-600 text-white',
                  isAnswered &&
                    !showCorrect &&
                    !showWrong &&
                    'bg-slate-100 text-slate-500',
                )}
              >
                {key}
              </span>

              <span className="flex-1 text-sm text-slate-800 sm:text-base">
                {question.options[key]}
              </span>

              {showCorrect && (
                <CheckCircle2
                  className="size-5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
              )}
              {showWrong && (
                <XCircle
                  className="size-5 shrink-0 text-rose-600"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>

      <div aria-live="polite">
        {isAnswered && (
          <div
            className={cn(
              'mt-5 rounded-lg border p-4',
              isCorrect
                ? 'border-emerald-200 bg-emerald-50'
                : 'border-rose-200 bg-rose-50',
            )}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2
                  className="size-5 text-emerald-600"
                  aria-hidden="true"
                />
              ) : (
                <XCircle className="size-5 text-rose-600" aria-hidden="true" />
              )}
              <p
                className={cn(
                  'font-semibold',
                  isCorrect ? 'text-emerald-800' : 'text-rose-800',
                )}
              >
                {isCorrect ? 'إجابة صحيحة' : 'إجابة خاطئة'}
              </p>
            </div>

            <p className="mt-2 text-sm text-slate-700">
              الإجابة الصحيحة:{' '}
              <strong>
                {question.answer}. {question.options[question.answer]}
              </strong>
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {question.explanation ??
                'لا يتوفر شرح إضافي لهذا السؤال.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

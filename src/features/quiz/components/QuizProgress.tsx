interface QuizProgressProps {
  current: number
  total: number
  answered: number
  correct: number
}

export function QuizProgress({
  current,
  total,
  answered,
  correct,
}: QuizProgressProps) {
  const percentage = total === 0 ? 0 : (current / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-medium text-slate-900">
          السؤال {current} من {total}
        </span>
        <span className="text-slate-500">
          تمت الإجابة عن {answered} · {correct} صحيحة
        </span>
      </div>

      <div
        className="h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={`السؤال ${current} من ${total}`}
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

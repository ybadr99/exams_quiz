import { BookOpen, ListChecks, Play } from 'lucide-react'
import type { ExamData } from '@/types/quiz'

interface QuizIntroProps {
  exam: ExamData
  onStart: () => void
}

const instructions = [
  'أجب عن سؤال واحد في كل مرة',
  'احصل على تصحيح فوري بعد كل إجابة',
  'لا يمكن تغيير الإجابة بعد تأكيدها',
  'اقرأ الشرح قبل الانتقال للسؤال التالي',
]

export function QuizIntro({ exam, onStart }: QuizIntroProps) {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-indigo-50">
          <BookOpen className="size-6 text-indigo-600" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-medium text-indigo-600">
            {exam.subject.title}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {exam.exam.title}
          </h1>
        </div>
      </div>

      <p className="mt-5 text-slate-600">
        يحتوي هذا الاختبار على{' '}
        <strong className="text-slate-900">
          {exam.questions.length} سؤالاً
        </strong>
        . أجب عن الأسئلة بالترتيب وراجع التصحيح بعد كل إجابة.
      </p>

      <ul className="mt-6 space-y-3">
        {instructions.map((instruction) => (
          <li key={instruction} className="flex items-start gap-2 text-sm">
            <ListChecks
              className="mt-0.5 size-4 shrink-0 text-indigo-600"
              aria-hidden="true"
            />
            <span className="text-slate-700">{instruction}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onStart}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto"
      >
        <Play className="size-4" aria-hidden="true" />
        ابدأ الاختبار
      </button>
    </div>
  )
}

import { ArrowLeft, BookOpen, ClipboardList, ListChecks } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatCard } from '@/components/ui/StatCard'
import { exams, getSubjectGroups } from '@/features/quiz/data/exams'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle('الرئيسية | الاختبارات')

  const subjectGroups = getSubjectGroups()
  const totalQuestions = exams.reduce(
    (total, exam) => total + exam.questions.length,
    0,
  )

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          الاختبارات المتاحة
        </h1>
        <p className="text-slate-600">
          اختر مادة وابدأ التدريب بأسئلة تفاعلية مع تصحيح فوري وشرح للإجابات.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="المواد"
          value={subjectGroups.length.toString()}
          icon={BookOpen}
        />
        <StatCard
          label="الاختبارات"
          value={exams.length.toString()}
          icon={ClipboardList}
        />
        <StatCard
          label="إجمالي الأسئلة"
          value={totalQuestions.toString()}
          icon={ListChecks}
        />
      </div>

      {subjectGroups.map((group) => (
        <section key={group.subject.id} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">
              {group.subject.title}
            </h2>
            <span className="text-sm text-slate-500">
              {group.exams.length} اختبار
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.exams.map((exam) => (
              <article
                key={exam.exam.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold leading-relaxed text-slate-900">
                    {exam.exam.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {exam.questions.length} سؤالاً
                  </span>
                </div>

                <Link
                  to={`/exam/${exam.exam.id}`}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 pt-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  ابدأ الاختبار
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

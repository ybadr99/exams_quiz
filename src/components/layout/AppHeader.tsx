import { GraduationCap } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { getSubjectGroups } from '@/features/quiz/data/exams'
import { cn } from '@/lib/cn'

export function AppHeader() {
  const { pathname } = useLocation()
  const subjectGroups = getSubjectGroups()

  const navItems = [
    {
      to: '/',
      label: 'الرئيسية',
      isActive: pathname === '/',
    },
    ...subjectGroups.map((group) => ({
      to: `/exam/${group.exams[0].exam.id}`,
      label: group.subject.title,
      isActive: group.exams.some(
        (exam) => pathname === `/exam/${exam.exam.id}`,
      ),
    })),
  ]

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-slate-900"
        >
          <GraduationCap
            className="size-6 text-indigo-600"
            aria-hidden="true"
          />
          <span>الاختبارات</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                item.isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

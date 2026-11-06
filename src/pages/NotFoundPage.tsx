import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('الصفحة غير موجودة | الاختبارات')

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold text-indigo-600">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        الصفحة غير موجودة
      </h1>
      <p className="mt-2 text-slate-600">
        الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        <ArrowRight className="size-4" aria-hidden="true" />
        العودة للرئيسية
      </Link>
    </div>
  )
}

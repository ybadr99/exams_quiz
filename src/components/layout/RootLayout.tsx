import { Outlet } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'

export function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-slate-50 text-slate-900">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

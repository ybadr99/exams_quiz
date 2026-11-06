import { Navigate, createHashRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { defaultExam } from '@/features/quiz/data/exams'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { QuizPage } from '@/pages/QuizPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'exam',
        element: <Navigate to={`/exam/${defaultExam.exam.id}`} replace />,
      },
      {
        path: 'exam/:examId',
        element: <QuizPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

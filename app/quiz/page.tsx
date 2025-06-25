import { QuizFrame } from '@/components/quiz-frame'

export default function QuizPage({
  searchParams,
}: {
  searchParams: { session?: string; q?: string; score?: string }
}) {
  return <QuizFrame searchParams={searchParams} />
} 
import { ResultsFrame } from '@/components/results-frame'

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { score?: string; total?: string; session?: string }
}) {
  return <ResultsFrame searchParams={searchParams} />
} 
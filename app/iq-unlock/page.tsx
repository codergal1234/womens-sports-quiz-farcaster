import { IQUnlock } from '@/components/iq-unlock'

// Force dynamic rendering to prevent Wagmi hooks from running during static generation
export const dynamic = 'force-dynamic'

export default function IQUnlockPage() {
  return <IQUnlock />
} 
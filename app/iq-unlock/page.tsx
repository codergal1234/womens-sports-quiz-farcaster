import dynamic from 'next/dynamic'

// Dynamically import the IQUnlock component with no SSR
const IQUnlock = dynamic(() => import('@/components/iq-unlock').then(mod => ({ default: mod.IQUnlock })), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 p-4 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-300 mx-auto mb-4"></div>
        <p className="text-gray-300">Loading Sports IQ Unlock...</p>
      </div>
    </div>
  )
})

export default function IQUnlockPage() {
  return <IQUnlock />
} 
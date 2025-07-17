'use client'

import { useEffect, useState } from 'react'

// Force dynamic rendering and disable static generation
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function IQUnlockPage() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only load the component on the client side
    import('@/components/iq-unlock').then((mod) => {
      setComponent(() => mod.IQUnlock)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-300 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading Sports IQ Unlock...</p>
        </div>
      </div>
    )
  }

  return Component ? <Component /> : null
} 
import { WelcomeScreen } from "@/components/welcome-screen"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Women's Sports Quiz - Farcaster Mini App",
  description: "Test your knowledge with 5 fun questions about women's sports history, records, and viral moments!",
  openGraph: {
    title: "Women's Sports Quiz",
    description: "Test your knowledge with 5 fun questions about women's sports history, records, and viral moments!",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og`,
        width: 1200,
        height: 630,
        alt: "Women's Sports Quiz",
      },
    ],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og`,
    'fc:frame:button:1': 'Start Quiz',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <WelcomeScreen />
      </div>
    </main>
  )
}

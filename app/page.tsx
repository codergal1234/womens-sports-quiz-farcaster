import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Brain, Trophy, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="h-12 w-12 text-yellow-400 mr-3" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Women's Sports Quiz
            </h1>
          </div>
          
          <p className="text-gray-300 mb-8 text-lg">
            Test your knowledge of women's sports and unlock your IQ score! 🏀✨
          </p>

          <div className="space-y-4">
            <Link href="/quiz">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl text-lg">
                <Trophy className="h-6 w-6 mr-2" />
                Take the Quiz
              </Button>
            </Link>

            <Link href="/iq-unlock">
              <Button variant="outline" className="w-full border-purple-400 text-purple-300 hover:bg-purple-600/20 font-semibold py-4 rounded-xl text-lg">
                <Brain className="h-6 w-6 mr-2" />
                Unlock IQ Score
              </Button>
            </Link>

            <div className="mt-8 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-yellow-300 font-semibold">New Feature!</span>
              </div>
              <p className="text-gray-300 text-sm">
                Connect your wallet and pay 0.1 USDC to unlock your Sports IQ score on Base network!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { QuizScreen } from "@/components/quiz-screen"
import { ShoppingBasketIcon as Basketball, Trophy, Sparkles } from "lucide-react"

export function WelcomeScreen() {
  const [started, setStarted] = useState(false)

  if (started) {
    return <QuizScreen />
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="relative h-40 bg-gradient-to-r from-teal-400 to-pink-500 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=400&width=400')] bg-repeat"></div>
        <Basketball className="absolute top-4 right-4 h-12 w-12 text-white" />
        <Trophy className="absolute bottom-4 left-4 h-10 w-10 text-yellow-300" />
        <Sparkles className="absolute top-6 left-6 h-8 w-8 text-yellow-300" />
      </div>

      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          How Well Do You Know Women's Sports?
        </h1>

        <p className="text-gray-600 mb-6">
          Test your knowledge with 5 fun questions about women's sports history, records, and viral moments!
        </p>

        <Button
          onClick={() => setStarted(true)}
          className="w-full py-6 text-xl font-bold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          Let's Play! 🏀✨
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, Share2, RotateCcw, Award, Download } from "lucide-react"
import confetti from "canvas-confetti"

interface ResultsFrameProps {
  searchParams: { score?: string; total?: string; session?: string }
}

export function ResultsFrame({ searchParams }: ResultsFrameProps) {
  const [showBadge, setShowBadge] = useState(false)
  const score = parseInt(searchParams.score || '0')
  const total = parseInt(searchParams.total || '5')
  const sessionId = searchParams.session || 'default'
  const isPerfectScore = score === total

  useEffect(() => {
    if (isPerfectScore) {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [isPerfectScore])

  const getMessage = () => {
    const percentage = (score / total) * 100

    if (percentage === 100) {
      return "You're a Trivia Queen! 🏆✨"
    } else if (percentage >= 80) {
      return "Amazing! You're an All-Star! 🌟"
    } else if (percentage >= 60) {
      return "Great job! You know your stuff! 👏"
    } else if (percentage >= 40) {
      return "Not bad! Keep learning! 📚"
    } else {
      return "Keep practicing! You'll be a pro soon! 💪"
    }
  }

  const handleShare = () => {
    const shareText = `I just scored ${score}/${total} on the Women's Sports Quiz! ${getMessage()}`

    if (navigator.share) {
      navigator.share({
        title: "Women's Sports Quiz Results",
        text: shareText,
        url: window.location.href,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareText)
      alert("Score copied to clipboard! Share it with your friends!")
    }
  }

  const handleChallenge = () => {
    const challengeText = `Think you know women's sports? I scored ${score}/${total} - can you beat me? Take the quiz: ${window.location.origin}`

    if (navigator.share) {
      navigator.share({
        title: "Women's Sports Quiz Challenge",
        text: challengeText,
        url: window.location.origin,
      })
    } else {
      navigator.clipboard.writeText(challengeText)
      alert("Challenge copied to clipboard! Send it to your friends!")
    }
  }

  const getBadgeTitle = () => {
    if (score === total) return "PERFECT SCORE"
    if (score >= total * 0.8) return "ALL-STAR"
    if (score >= total * 0.6) return "SPORTS SCHOLAR"
    return "SPORTS FAN"
  }

  const getBadgeColor = () => {
    if (score === total) return "from-yellow-400 to-yellow-600"
    if (score >= total * 0.8) return "from-purple-500 to-pink-500"
    if (score >= total * 0.6) return "from-teal-500 to-blue-500"
    return "from-blue-400 to-indigo-500"
  }

  const downloadBadge = () => {
    // Create a canvas to generate the badge image
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 400

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 400, 400)
    if (score === total) {
      gradient.addColorStop(0, "#fbbf24")
      gradient.addColorStop(1, "#d97706")
    } else if (score >= total * 0.8) {
      gradient.addColorStop(0, "#8b5cf6")
      gradient.addColorStop(1, "#ec4899")
    } else if (score >= total * 0.6) {
      gradient.addColorStop(0, "#14b8a6")
      gradient.addColorStop(1, "#3b82f6")
    } else {
      gradient.addColorStop(0, "#60a5fa")
      gradient.addColorStop(1, "#6366f1")
    }

    // Draw circle
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(200, 200, 180, 0, 2 * Math.PI)
    ctx.fill()

    // Add text
    ctx.fillStyle = "white"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.fillText("🏆", 200, 180)

    ctx.font = "bold 16px Arial"
    ctx.fillText(getBadgeTitle(), 200, 220)

    ctx.font = "14px Arial"
    ctx.fillText(`Score: ${score}/${total}`, 200, 250)
    ctx.fillText(`Women's Sports Quiz`, 200, 270)
    ctx.fillText(new Date().toLocaleDateString(), 200, 290)

    // Download the image
    const link = document.createElement("a")
    link.download = `womens-sports-quiz-badge-${score}-${total}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-40 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
          <Trophy className="h-20 w-20 text-yellow-300" />
        </div>

        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            You scored {score}/{total}!
          </h2>

          <p className="text-xl font-medium text-purple-600 mb-6">{getMessage()}</p>

          {!showBadge && (
            <Button
              onClick={() => setShowBadge(true)}
              className="w-full mb-3 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Award className="mr-2 h-5 w-5" />
              Claim Your Badge!
            </Button>
          )}

          {showBadge && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="flex justify-center mb-2">
                <div
                  className={`relative w-32 h-32 bg-gradient-to-r ${getBadgeColor()} rounded-full flex items-center justify-center`}
                >
                  <Trophy className="h-16 w-16 text-white" />
                  <div className="absolute -bottom-2 w-full text-center bg-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
                    {getBadgeTitle()}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Women's Sports {getBadgeTitle()} Badge
                <br />
                Earned on {new Date().toLocaleDateString()}
              </p>

              <Button
                onClick={downloadBadge}
                variant="outline"
                className="w-full mb-3 border-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Badge Image
              </Button>

              {isPerfectScore && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 mb-3">
                  <p className="text-sm font-medium text-yellow-800">🎉 Perfect Score Achievement!</p>
                  <p className="text-xs text-yellow-700">You're officially a Women's Sports expert!</p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={() => {
                const newSessionId = Math.random().toString(36).substring(2, 15)
                window.location.href = `/quiz?session=${newSessionId}&q=0`
              }}
              className="w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Play Again
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full py-4 text-lg font-bold rounded-xl border-2 border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share Score
            </Button>

            <Button
              onClick={handleChallenge}
              variant="outline"
              className="w-full py-4 text-lg font-bold rounded-xl border-2 border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              🏆 Challenge Friends
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 
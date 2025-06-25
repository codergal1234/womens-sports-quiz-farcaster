"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

const QUESTIONS = [
  {
    question: "Who was the first woman to dunk in a WNBA game?",
    options: ["Lisa Leslie", "Candace Parker", "Sylvia Fowles"],
    correctAnswer: "Lisa Leslie",
    funFact: "Lisa Leslie made history on July 30, 2002, becoming the first woman to dunk in a WNBA game!",
  },
  {
    question: "Which viral TikTok in 2023 featured a women's college basketball buzzer-beater?",
    options: ["Caitlin Clark", "Juju Watkins", "Paige Bueckers"],
    correctAnswer: "Caitlin Clark",
    funFact: "Caitlin Clark's buzzer-beater for Iowa went viral with millions of views across social media platforms!",
  },
  {
    question: "What year did women's basketball debut at the Olympics?",
    options: ["1976", "1984", "1992"],
    correctAnswer: "1976",
    funFact: "Women's basketball made its Olympic debut at the 1976 Montreal Games, with the Soviet Union winning gold!",
  },
  {
    question: "Who holds the WNBA record for most points in a single game?",
    options: ["Diana Taurasi", "Liz Cambage", "Maya Moore"],
    correctAnswer: "Liz Cambage",
    funFact: "Liz Cambage scored a record 53 points for the Dallas Wings against the New York Liberty in 2018!",
  },
  {
    question: "Which athlete said: \"I'd rather regret the risks that didn't work out than the chances I didn't take at all\"?",
    options: ["Serena Williams", "Abby Wambach", "Sue Bird"],
    correctAnswer: "Abby Wambach",
    funFact: "Abby Wambach is not only a soccer legend but also an author and activist for equality!",
  },
]

interface QuizFrameProps {
  searchParams: { session?: string; q?: string; score?: string }
}

export function QuizFrame({ searchParams }: QuizFrameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [questions, setQuestions] = useState<typeof QUESTIONS>([])

  // Initialize from URL params or default
  useEffect(() => {
    const questionIndex = parseInt(searchParams.q || '0')
    const currentScore = parseInt(searchParams.score || '0')
    
    setCurrentQuestionIndex(questionIndex)
    setScore(currentScore)
    
    // Shuffle and select 5 questions
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random())
    setQuestions(shuffled.slice(0, 5))
  }, [searchParams.q, searchParams.score])

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 p-4 flex items-center justify-center">
        <div className="text-white text-center">Loading quiz...</div>
      </div>
    )
  }

  if (quizComplete) {
    const sessionId = searchParams.session || 'default'
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 p-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-40 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <div className="text-6xl">🏆</div>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                You scored {score}/{questions.length}!
              </h2>
              <p className="text-xl font-medium text-purple-600 mb-6">
                {score === questions.length ? "🏆 Perfect score! You're a Trivia Queen!" :
                 score >= questions.length * 0.8 ? "🌟 All-Star performance!" :
                 score >= questions.length * 0.6 ? "👏 Great job! You know your stuff!" :
                 score >= questions.length * 0.4 ? "📚 Not bad! Keep learning!" :
                 "💪 Keep practicing! You'll be a pro soon!"}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    const newSessionId = Math.random().toString(36).substring(2, 15)
                    window.location.href = `/quiz?session=${newSessionId}&q=0`
                  }}
                  className="w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  🎮 Play Again
                </Button>
                <Button
                  onClick={() => {
                    const shareText = `I scored ${score}/${questions.length} on the Women's Sports Quiz! Think you can beat me? Take the quiz: ${window.location.origin}`
                    if (navigator.share) {
                      navigator.share({
                        title: "Women's Sports Quiz Results",
                        text: shareText,
                        url: window.location.origin,
                      })
                    } else {
                      navigator.clipboard.writeText(shareText)
                      alert("Score copied to clipboard!")
                    }
                  }}
                  variant="outline"
                  className="w-full py-4 text-lg font-bold rounded-xl border-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  📤 Share Score
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    const correct = answer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setShowFeedback(true)

    // Move to next question after delay
    setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer(null)
      setIsCorrect(null)

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setQuizComplete(true)
      }
    }, 2500)
  }

  const getFeedbackMessage = () => {
    if (isCorrect) {
      const messages = [
        "Nailed it! Future Hall of Famer energy ✨",
        "Swish! Nothing but net on that one! 🏀",
        "MVP move right there! 🏆",
        "You're on fire! 🔥",
        "That's championship material! 👑",
      ]
      return messages[Math.floor(Math.random() * messages.length)]
    } else {
      const messages = [
        "Don't worry, even GOATs miss free throws sometimes!",
        "Close one! Keep your head in the game! 💪",
        "Not quite! But you're still in this! 🏀",
        "That's okay! The comeback is always stronger than the setback!",
        "Shake it off and keep playing! 🌟",
      ]
      return messages[Math.floor(Math.random() * messages.length)]
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-3 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
            style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-purple-600">Score: {score}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`w-full py-5 justify-start text-lg font-medium rounded-xl transition-all ${
                  selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? "bg-green-500 hover:bg-green-500 text-white"
                      : "bg-red-500 hover:bg-red-500 text-white"
                    : selectedAnswer !== null && option === currentQuestion.correctAnswer
                      ? "bg-green-500 hover:bg-green-500 text-white"
                      : "bg-white hover:bg-purple-100 text-gray-800 border-2 border-purple-200"
                }`}
                variant="outline"
              >
                <span className="mr-3">{String.fromCharCode(65 + index)}.</span> {option}
              </Button>
            ))}
          </div>

          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl text-center"
            >
              <div className="flex items-center justify-center mb-2">
                {isCorrect ? (
                  <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-500 mr-2" />
                )}
                <span className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{getFeedbackMessage()}</p>
              <p className="text-sm text-gray-500 italic">{currentQuestion.funFact}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 
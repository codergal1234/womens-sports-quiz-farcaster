"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ResultsScreen } from "@/components/results-screen"
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
    funFact:
      "Women's basketball made its Olympic debut at the 1976 Montreal Games, with the Soviet Union winning gold!",
  },
  {
    question: "Who holds the WNBA record for most points in a single game?",
    options: ["Diana Taurasi", "Liz Cambage", "Maya Moore"],
    correctAnswer: "Liz Cambage",
    funFact: "Liz Cambage scored a record 53 points for the Dallas Wings against the New York Liberty in 2018!",
  },
  {
    question:
      "Which athlete said: \"I'd rather regret the risks that didn't work out than the chances I didn't take at all\"?",
    options: ["Serena Williams", "Abby Wambach", "Sue Bird"],
    correctAnswer: "Abby Wambach",
    funFact: "Abby Wambach is not only a soccer legend but also an author and activist for equality!",
  },
  {
    question: "Which women's soccer team has won the most World Cup titles?",
    options: ["Germany", "USA", "Brazil"],
    correctAnswer: "USA",
    funFact: "The USA has won 4 Women's World Cup titles (1991, 1999, 2015, 2019), more than any other nation!",
  },
  {
    question: "Who is the most decorated female Olympic gymnast of all time?",
    options: ["Simone Biles", "Nadia Comăneci", "Mary Lou Retton"],
    correctAnswer: "Simone Biles",
    funFact:
      "Simone Biles has won 7 Olympic medals and 25 World Championship medals, making her the most decorated gymnast ever!",
  },
  {
    question: "Which tennis player has won the most Grand Slam singles titles in the Open Era?",
    options: ["Serena Williams", "Steffi Graf", "Martina Navratilova"],
    correctAnswer: "Serena Williams",
    funFact: "Serena Williams has won 23 Grand Slam singles titles, the most by any player in the Open Era!",
  },
  {
    question: "Who was the first female driver to score points in a Formula 1 race?",
    options: ["Danica Patrick", "Lella Lombardi", "Janet Guthrie"],
    correctAnswer: "Lella Lombardi",
    funFact: "Italian driver Lella Lombardi scored 0.5 points at the 1975 Spanish Grand Prix, making F1 history!",
  },
  {
    question: "Which female athlete has the most Olympic gold medals in track and field?",
    options: ["Florence Griffith-Joyner", "Allyson Felix", "Jackie Joyner-Kersee"],
    correctAnswer: "Allyson Felix",
    funFact: "Allyson Felix has won 7 Olympic gold medals, making her the most decorated U.S. track and field athlete!",
  },
]

export function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [questions, setQuestions] = useState<typeof QUESTIONS>([])

  // Shuffle and select 5 questions on component mount
  useEffect(() => {
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random())
    setQuestions(shuffled.slice(0, 5))
  }, [])

  if (questions.length === 0) {
    return <div className="text-white text-center">Loading quiz...</div>
  }

  if (quizComplete) {
    return (
      <ResultsScreen
        score={score}
        totalQuestions={5}
        onRestart={() => {
          const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random())
          setQuestions(shuffled.slice(0, 5))
          setCurrentQuestionIndex(0)
          setSelectedAnswer(null)
          setIsCorrect(null)
          setScore(0)
          setShowFeedback(false)
          setQuizComplete(false)
        }}
      />
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
      </div>

      {/* Feedback overlay */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-6 text-center"
        >
          {isCorrect ? (
            <CheckCircle className="w-20 h-20 text-green-400 mb-4" />
          ) : (
            <XCircle className="w-20 h-20 text-red-400 mb-4" />
          )}

          <h3 className="text-2xl font-bold text-white mb-2">{isCorrect ? "Correct!" : "Not quite!"}</h3>

          <p className="text-xl text-white mb-4">{getFeedbackMessage()}</p>

          <p className="text-sm text-white/80 max-w-xs">{currentQuestion.funFact}</p>
        </motion.div>
      )}
    </div>
  )
}

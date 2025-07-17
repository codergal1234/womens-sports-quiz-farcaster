'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wallet, 
  Brain, 
  Trophy, 
  Sparkles, 
  Lock, 
  Unlock, 
  CheckCircle,
  Loader2,
  Zap,
  ExternalLink
} from 'lucide-react'

export default function IQUnlockPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [testCompleted, setTestCompleted] = useState(false)
  const [scoreUnlocked, setScoreUnlocked] = useState(false)
  const [iqScore, setIqScore] = useState<number | null>(null)
  const [showTest, setShowTest] = useState(false)
  const [isFarcasterApp, setIsFarcasterApp] = useState(false)

  // Mock test questions
  const mockQuestions = [
    "Who was the first woman to dunk in a WNBA game?",
    "Which athlete has won the most Olympic medals?",
    "What year did women's soccer debut at the Olympics?"
  ]

  const mockAnswers = ["Lisa Leslie", "Simone Biles", "1996"]

  useEffect(() => {
    // Check if we're in a Farcaster environment
    const checkFarcaster = () => {
      if (typeof window !== 'undefined') {
        const isInFarcaster = window.location.href.includes('farcaster') || 
                             window.location.href.includes('warpcast') ||
                             window.navigator.userAgent.includes('Farcaster') ||
                             window.navigator.userAgent.includes('Warpcast')
        setIsFarcasterApp(isInFarcaster)
      }
    }

    checkFarcaster()
    setIsLoading(false)
  }, [])

  const handleConnectWallet = async () => {
    // Simulate wallet connection for now
    setIsConnected(true)
    setAddress('0x1234...5678')
  }

  const handleStartTest = () => {
    setShowTest(true)
  }

  const handleCompleteTest = () => {
    const score = Math.floor(Math.random() * 40) + 60 // 60-100
    setIqScore(score)
    setTestCompleted(true)
    setShowTest(false)
  }

  const handleUnlockIQ = async () => {
    // Simulate USDC payment
    await new Promise(resolve => setTimeout(resolve, 2000))
    setScoreUnlocked(true)
  }

  const getIQMessage = (score: number) => {
    if (score >= 90) return "Genius Level! 🧠✨"
    if (score >= 80) return "Sports Scholar! 📚🏆"
    if (score >= 70) return "Pretty Smart! 💡"
    return "Keep Learning! 📖"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-purple-300 mx-auto mb-4 animate-spin" />
          <p className="text-gray-300">Loading Sports IQ Unlock...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 p-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-purple-300 mr-2" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Sports IQ Unlock
              </h1>
            </div>
            <p className="text-gray-300 text-sm">
              Test your knowledge, pay 0.1 USDC, unlock your IQ score! 🏀✨
            </p>
            
            {isFarcasterApp && (
              <div className="mt-3 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                <p className="text-blue-200 text-xs">
                  🎯 Farcaster Mini App - Connect your wallet to get started!
                </p>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* Not Connected State */}
            {!isConnected && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="mb-6">
                  <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Connect Your Wallet
                  </h2>
                  <p className="text-gray-300 text-sm mb-6">
                    {isFarcasterApp 
                      ? "Connect your wallet to start your Sports IQ journey on-chain!"
                      : "Connect your wallet to start your Sports IQ journey!"
                    }
                  </p>
                </div>
                
                <Button
                  onClick={handleConnectWallet}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl"
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  Connect Wallet
                </Button>
              </motion.div>
            )}

            {/* Connected but Test Not Started */}
            {isConnected && !testCompleted && !showTest && (
              <motion.div
                key="start-test"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Wallet className="h-6 w-6 text-green-400 mr-2" />
                    <span className="text-green-400 text-sm font-medium">
                      Connected: {address}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Ready to Test Your Sports IQ?
                  </h2>
                  <p className="text-gray-300 text-sm mb-6">
                    Answer 3 quick questions to unlock your IQ score on-chain!
                  </p>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={handleStartTest}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Start Test
                  </Button>
                  <Button
                    onClick={() => setIsConnected(false)}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Disconnect
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Test in Progress */}
            {showTest && (
              <motion.div
                key="test"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="mb-6">
                  <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Sports IQ Test
                  </h2>
                  <div className="space-y-4 text-left">
                    {mockQuestions.map((question, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <p className="text-white text-sm mb-2">
                          {index + 1}. {question}
                        </p>
                        <p className="text-gray-400 text-xs">
                          Answer: {mockAnswers[index]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleCompleteTest}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Complete Test
                </Button>
              </motion.div>
            )}

            {/* Test Completed - Payment Required */}
            {testCompleted && !scoreUnlocked && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="mb-6">
                  <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Test Complete! 🎉
                  </h2>
                  <p className="text-gray-300 text-sm mb-4">
                    Your IQ score is ready to unlock on-chain!
                  </p>
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 mb-4">
                    <p className="text-white font-semibold">
                      Pay 0.1 USDC to unlock your score
                    </p>
                    <p className="text-gray-300 text-xs mt-1">
                      Transaction fee: ~$0.01 on Base
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleUnlockIQ}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl"
                >
                  <Unlock className="h-5 w-5 mr-2" />
                  Unlock IQ Score (0.1 USDC)
                </Button>
              </motion.div>
            )}

            {/* Score Unlocked */}
            {scoreUnlocked && iqScore && (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="mb-6">
                  <div className="relative">
                    <Unlock className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Your Sports IQ Score
                  </h2>
                  <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl p-6 mb-4">
                    <div className="text-4xl font-bold text-white mb-2">
                      {iqScore}
                    </div>
                    <p className="text-purple-200 font-semibold">
                      {getIQMessage(iqScore)}
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Payment successful! Your score is now unlocked on-chain! 🎉
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl"
                  >
                    <Trophy className="h-5 w-5 mr-2" />
                    Take Test Again
                  </Button>
                  <Button
                    onClick={() => setIsConnected(false)}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
} 
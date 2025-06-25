import { FarcasterClient } from '@farcaster/js'

// Farcaster configuration
export const FARCASTER_CONFIG = {
  // You'll need to get these from Farcaster
  APP_FID: process.env.NEXT_PUBLIC_APP_FID || '',
  APP_MNEMONIC: process.env.APP_MNEMONIC || '',
  HUB_URL: process.env.NEXT_PUBLIC_HUB_URL || 'https://hub.farcaster.standardcrypto.vc:2283',
}

// Initialize Farcaster client
export const farcasterClient = new FarcasterClient({
  hubUrl: FARCASTER_CONFIG.HUB_URL,
})

// Frame metadata for Farcaster
export const getFrameMetadata = (state?: string) => ({
  'fc:frame': 'vNext',
  'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og`,
  'fc:frame:button:1': 'Start Quiz',
  'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame${state ? `?state=${state}` : ''}`,
})

// Frame metadata for quiz questions
export const getQuestionFrameMetadata = (questionIndex: number, questionId: string) => ({
  'fc:frame': 'vNext',
  'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og/question?q=${questionIndex}&id=${questionId}`,
  'fc:frame:button:1': 'Option A',
  'fc:frame:button:2': 'Option B', 
  'fc:frame:button:3': 'Option C',
  'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/answer?q=${questionIndex}&id=${questionId}`,
})

// Frame metadata for results
export const getResultsFrameMetadata = (score: number, total: number) => ({
  'fc:frame': 'vNext',
  'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og/results?score=${score}&total=${total}`,
  'fc:frame:button:1': 'Play Again',
  'fc:frame:button:2': 'Share Score',
  'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/results?score=${score}&total=${total}`,
})

// Share text for Farcaster
export const getShareText = (score: number, total: number) => {
  const percentage = (score / total) * 100
  let message = ''
  
  if (percentage === 100) {
    message = "🏆 Perfect score! I'm a Women's Sports Trivia Queen!"
  } else if (percentage >= 80) {
    message = "🌟 All-Star performance on the Women's Sports Quiz!"
  } else if (percentage >= 60) {
    message = "👏 Great job on the Women's Sports Quiz!"
  } else if (percentage >= 40) {
    message = "📚 Learning more about women's sports every day!"
  } else {
    message = "💪 Working on my women's sports knowledge!"
  }
  
  return `${message} I scored ${score}/${total}! Think you can beat me? Take the quiz: ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`
} 
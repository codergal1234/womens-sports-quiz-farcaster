import { NextRequest, NextResponse } from 'next/server'

const QUESTIONS = [
  {
    question: "Who was the first woman to dunk in a WNBA game?",
    options: ["Lisa Leslie", "Candace Parker", "Sylvia Fowles"],
    correctAnswer: "Lisa Leslie",
  },
  {
    question: "Which viral TikTok in 2023 featured a women's college basketball buzzer-beater?",
    options: ["Caitlin Clark", "Juju Watkins", "Paige Bueckers"],
    correctAnswer: "Caitlin Clark",
  },
  {
    question: "What year did women's basketball debut at the Olympics?",
    options: ["1976", "1984", "1992"],
    correctAnswer: "1976",
  },
  {
    question: "Who holds the WNBA record for most points in a single game?",
    options: ["Diana Taurasi", "Liz Cambage", "Maya Moore"],
    correctAnswer: "Liz Cambage",
  },
  {
    question: "Which athlete said: \"I'd rather regret the risks that didn't work out than the chances I didn't take at all\"?",
    options: ["Serena Williams", "Abby Wambach", "Sue Bird"],
    correctAnswer: "Abby Wambach",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { untrustedData } = body
    const url = new URL(request.url)
    
    const questionIndex = parseInt(url.searchParams.get('q') || '0')
    const sessionId = url.searchParams.get('session') || 'default'
    const currentScore = parseInt(url.searchParams.get('score') || '0')
    
    const currentQuestion = QUESTIONS[questionIndex]
    const selectedAnswerIndex = (untrustedData?.buttonIndex || 1) - 1
    const selectedAnswer = currentQuestion.options[selectedAnswerIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    
    const newScore = isCorrect ? currentScore + 1 : currentScore
    const nextQuestionIndex = questionIndex + 1
    
    // If this was the last question, show results
    if (nextQuestionIndex >= 5) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/results?score=${newScore}&total=5&session=${sessionId}`
      )
    }
    
    // Otherwise, go to next question
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/quiz?session=${sessionId}&q=${nextQuestionIndex}&score=${newScore}`
    )
    
  } catch (error) {
    console.error('Answer API error:', error)
    return new NextResponse('Error processing answer', { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const questionIndex = parseInt(url.searchParams.get('q') || '0')
  const sessionId = url.searchParams.get('session') || 'default'
  const score = url.searchParams.get('score') || '0'
  
  const currentQuestion = QUESTIONS[questionIndex]
  
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Question ${questionIndex + 1}</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og/question?q=${questionIndex}&session=${sessionId}&score=${score}" />
        <meta property="fc:frame:button:1" content="${currentQuestion.options[0]}" />
        <meta property="fc:frame:button:2" content="${currentQuestion.options[1]}" />
        <meta property="fc:frame:button:3" content="${currentQuestion.options[2]}" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/answer?q=${questionIndex}&session=${sessionId}&score=${score}" />
      </head>
      <body>
        <h1>Question ${questionIndex + 1}</h1>
        <p>${currentQuestion.question}</p>
      </body>
    </html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  )
} 
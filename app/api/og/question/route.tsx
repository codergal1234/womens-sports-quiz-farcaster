import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const questionIndex = parseInt(searchParams.get('q') || '0')
  const score = searchParams.get('score') || '0'
  
  const QUESTIONS = [
    {
      question: "Who was the first woman to dunk in a WNBA game?",
      options: ["Lisa Leslie", "Candace Parker", "Sylvia Fowles"],
    },
    {
      question: "Which viral TikTok in 2023 featured a women's college basketball buzzer-beater?",
      options: ["Caitlin Clark", "Juju Watkins", "Paige Bueckers"],
    },
    {
      question: "What year did women's basketball debut at the Olympics?",
      options: ["1976", "1984", "1992"],
    },
    {
      question: "Who holds the WNBA record for most points in a single game?",
      options: ["Diana Taurasi", "Liz Cambage", "Maya Moore"],
    },
    {
      question: "Which athlete said: \"I'd rather regret the risks that didn't work out than the chances I didn't take at all\"?",
      options: ["Serena Williams", "Abby Wambach", "Sue Bird"],
    },
  ]
  
  const currentQuestion = QUESTIONS[questionIndex]

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '30px',
              fontSize: '20px',
              color: 'white',
            }}
          >
            <span>Question {questionIndex + 1}/5</span>
            <span>Score: {score}</span>
          </div>
          
          {/* Question */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '40px',
              textAlign: 'center',
              lineHeight: 1.3,
              maxWidth: '800px',
            }}
          >
            {currentQuestion.question}
          </div>
          
          {/* Options */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              width: '100%',
              maxWidth: '600px',
            }}
          >
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                style={{
                  padding: '15px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '20px',
                  color: 'white',
                  textAlign: 'left',
                }}
              >
                {String.fromCharCode(65 + index)}. {option}
              </div>
            ))}
          </div>
          
          {/* Instructions */}
          <div
            style={{
              marginTop: '30px',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
            }}
          >
            Click an option to answer!
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
} 
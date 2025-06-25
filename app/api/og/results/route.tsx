import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const score = parseInt(searchParams.get('score') || '0')
  const total = parseInt(searchParams.get('total') || '5')
  const percentage = (score / total) * 100

  const getMessage = () => {
    if (percentage === 100) {
      return "🏆 Perfect score! You're a Women's Sports Trivia Queen!"
    } else if (percentage >= 80) {
      return "🌟 All-Star performance! Amazing job!"
    } else if (percentage >= 60) {
      return "👏 Great job! You know your stuff!"
    } else if (percentage >= 40) {
      return "📚 Not bad! Keep learning!"
    } else {
      return "💪 Keep practicing! You'll be a pro soon!"
    }
  }

  const getBadgeTitle = () => {
    if (score === total) return "PERFECT SCORE"
    if (score >= total * 0.8) return "ALL-STAR"
    if (score >= total * 0.6) return "SPORTS SCHOLAR"
    return "SPORTS FAN"
  }

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
          }}
        >
          {/* Trophy Icon */}
          <div
            style={{
              fontSize: '100px',
              marginBottom: '20px',
            }}
          >
            🏆
          </div>
          
          {/* Score */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            {score}/{total}
          </div>
          
          {/* Message */}
          <div
            style={{
              fontSize: '28px',
              color: 'white',
              marginBottom: '30px',
              textAlign: 'center',
              lineHeight: 1.3,
              maxWidth: '800px',
            }}
          >
            {getMessage()}
          </div>
          
          {/* Badge */}
          <div
            style={{
              padding: '15px 30px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '15px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '30px',
            }}
          >
            {getBadgeTitle()} BADGE
          </div>
          
          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <span>🎮 Play Again</span>
            <span>📤 Share Score</span>
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
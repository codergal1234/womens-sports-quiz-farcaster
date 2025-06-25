import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
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
          <div
            style={{
              fontSize: '80px',
              marginBottom: '20px',
            }}
          >
            🏀
          </div>
          
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Women's Sports Quiz
          </div>
          
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              maxWidth: '600px',
              lineHeight: 1.4,
            }}
          >
            Test your knowledge with 5 fun questions about women's sports history, records, and viral moments!
          </div>
          
          <div
            style={{
              marginTop: '40px',
              padding: '16px 32px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Click "Start Quiz" to begin! ✨
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
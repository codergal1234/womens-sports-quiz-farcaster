import { NextRequest, NextResponse } from 'next/server'
import { getShareText } from '@/lib/farcaster'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { untrustedData } = body
    const url = new URL(request.url)
    
    const score = parseInt(url.searchParams.get('score') || '0')
    const total = parseInt(url.searchParams.get('total') || '5')
    const sessionId = url.searchParams.get('session') || 'default'
    
    // Handle button clicks
    if (untrustedData?.buttonIndex === 1) {
      // Play Again - start a new quiz
      const newSessionId = Math.random().toString(36).substring(2, 15)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/quiz?session=${newSessionId}&q=0`
      )
    } else if (untrustedData?.buttonIndex === 2) {
      // Share Score - this would typically post to Farcaster
      // For now, we'll redirect to a share page
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/share?score=${score}&total=${total}&session=${sessionId}`
      )
    }
    
    // Default response - show results frame
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Quiz Results</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og/results?score=${score}&total=${total}" />
          <meta property="fc:frame:button:1" content="Play Again" />
          <meta property="fc:frame:button:2" content="Share Score" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/results?score=${score}&total=${total}&session=${sessionId}" />
        </head>
        <body>
          <h1>Quiz Results</h1>
          <p>You scored ${score}/${total}!</p>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  } catch (error) {
    console.error('Results API error:', error)
    return new NextResponse('Error processing results', { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const score = parseInt(url.searchParams.get('score') || '0')
  const total = parseInt(url.searchParams.get('total') || '5')
  const sessionId = url.searchParams.get('session') || 'default'
  
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Quiz Results</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og/results?score=${score}&total=${total}" />
        <meta property="fc:frame:button:1" content="Play Again" />
        <meta property="fc:frame:button:2" content="Share Score" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/results?score=${score}&total=${total}&session=${sessionId}" />
      </head>
      <body>
        <h1>Quiz Results</h1>
        <p>You scored ${score}/${total}!</p>
      </body>
    </html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  )
} 
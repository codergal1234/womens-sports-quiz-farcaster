import { NextRequest, NextResponse } from 'next/server'
import { getFrameMetadata } from '@/lib/farcaster'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { untrustedData } = body
    
    // Handle the initial "Start Quiz" button click
    if (untrustedData?.buttonIndex === 1) {
      // Generate a unique session ID for this quiz
      const sessionId = Math.random().toString(36).substring(2, 15)
      
      // Redirect to the first question
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/quiz?session=${sessionId}&q=0`
      )
    }
    
    // Default response - show the welcome frame
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Women's Sports Quiz</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og" />
          <meta property="fc:frame:button:1" content="Start Quiz" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame" />
        </head>
        <body>
          <h1>Women's Sports Quiz</h1>
          <p>Test your knowledge of women's sports!</p>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  } catch (error) {
    console.error('Frame API error:', error)
    return new NextResponse('Error processing frame', { status: 500 })
  }
}

export async function GET() {
  // Return the initial frame HTML
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Women's Sports Quiz</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og" />
        <meta property="fc:frame:button:1" content="Start Quiz" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame" />
      </head>
      <body>
        <h1>Women's Sports Quiz</h1>
        <p>Test your knowledge of women's sports!</p>
      </body>
    </html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  )
} 
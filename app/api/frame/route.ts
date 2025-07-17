import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const buttonIndex = data.get('untrustedData.buttonIndex')
  const inputText = data.get('untrustedData.inputText') as string

  // Handle different button actions
  if (buttonIndex === '1') {
    // Start Quiz button
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/quiz`)
  } else if (buttonIndex === '2') {
    // Unlock IQ Score button
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/iq-unlock`)
  }

  // Default: go to homepage
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`)
}

export async function GET() {
  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Women's Sports Quiz</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og" />
        <meta property="fc:frame:button:1" content="🏀 Take Quiz" />
        <meta property="fc:frame:button:2" content="🧠 Unlock IQ Score" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame" />
      </head>
      <body>
        <h1>Women's Sports Quiz</h1>
        <p>Test your knowledge and unlock your IQ score!</p>
      </body>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
} 
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateScreenshots() {
  console.log('Starting screenshot generation...');
  
  // Check if puppeteer is installed
  try {
    require('puppeteer');
  } catch (error) {
    console.log('Puppeteer not found. Installing...');
    const { execSync } = require('child_process');
    execSync('npm install puppeteer', { stdio: 'inherit' });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to the exact size we need
  await page.setViewport({ width: 1284, height: 2778 });
  
  // Create HTML content for each screenshot that matches the actual app design
  const screenshots = [
    {
      name: 'screenshot1.png',
      html: `
        <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              width: 1284px;
              height: 2778px;
              background: linear-gradient(135deg, #581c87 0%, #be185d 50%, #3730a3 100%);
              color: white;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              max-width: 400px;
              text-align: center;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(16px);
              border-radius: 24px;
              padding: 32px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .header {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 24px;
            }
            .trophy-icon {
              width: 48px;
              height: 48px;
              margin-right: 12px;
              color: #fbbf24;
            }
            h1 {
              font-size: 30px;
              font-weight: bold;
              background: linear-gradient(135deg, #c084fc 0%, #f9a8d4 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin: 0;
            }
            .description {
              color: #d1d5db;
              margin-bottom: 32px;
              font-size: 18px;
              line-height: 1.5;
            }
            .button {
              width: 100%;
              background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
              color: white;
              border: none;
              padding: 16px;
              border-radius: 12px;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 16px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .button:hover {
              background: linear-gradient(135deg, #7c3aed 0%, #db2777 100%);
            }
            .button.outline {
              background: transparent;
              border: 1px solid #a855f7;
              color: #c084fc;
            }
            .button.outline:hover {
              background: rgba(168, 85, 247, 0.2);
            }
            .icon {
              width: 24px;
              height: 24px;
              margin-right: 8px;
            }
            .feature-box {
              margin-top: 32px;
              padding: 16px;
              background: linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
              border-radius: 8px;
            }
            .feature-header {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 8px;
            }
            .sparkles-icon {
              width: 20px;
              height: 20px;
              color: #fbbf24;
              margin-right: 8px;
            }
            .feature-title {
              color: #fde047;
              font-weight: 600;
              font-size: 14px;
            }
            .feature-text {
              color: #d1d5db;
              font-size: 14px;
              line-height: 1.4;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="trophy-icon">🏆</div>
              <h1>Women's Sports Quiz</h1>
            </div>
            
            <p class="description">Test your knowledge of women's sports and unlock your IQ score! 🏀✨</p>

            <button class="button">
              <span class="icon">🏆</span>
              Take the Quiz
            </button>

            <button class="button outline">
              <span class="icon">🧠</span>
              Unlock IQ Score
            </button>

            <div class="feature-box">
              <div class="feature-header">
                <span class="sparkles-icon">✨</span>
                <span class="feature-title">New Feature!</span>
              </div>
              <p class="feature-text">Connect your wallet and pay 0.1 USDC to unlock your Sports IQ score on Base network!</p>
            </div>
          </div>
        </body>
        </html>
      `
    },
    {
      name: 'screenshot2.png',
      html: `
        <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              width: 1284px;
              height: 2778px;
              background: linear-gradient(135deg, #581c87 0%, #be185d 50%, #3730a3 100%);
              color: white;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              max-width: 400px;
              text-align: center;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(16px);
              border-radius: 24px;
              padding: 32px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .question-number {
              font-size: 14px;
              color: #a855f7;
              margin-bottom: 16px;
              font-weight: 600;
            }
            h1 {
              font-size: 24px;
              font-weight: bold;
              color: white;
              margin-bottom: 32px;
              line-height: 1.4;
            }
            .options {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
            .option {
              background: rgba(255, 255, 255, 0.1);
              border: 2px solid rgba(255, 255, 255, 0.2);
              color: white;
              padding: 16px;
              border-radius: 12px;
              font-size: 16px;
              cursor: pointer;
              transition: all 0.2s;
            }
            .option:hover {
              background: rgba(255, 255, 255, 0.2);
              border-color: #a855f7;
            }
            .option.selected {
              background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
              border-color: #a855f7;
            }
            .progress {
              margin-bottom: 24px;
            }
            .progress-bar {
              width: 100%;
              height: 8px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 4px;
              overflow: hidden;
            }
            .progress-fill {
              width: 20%;
              height: 100%;
              background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
              border-radius: 4px;
            }
            .progress-text {
              font-size: 14px;
              color: #d1d5db;
              margin-top: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="progress">
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
              <div class="progress-text">Question 1 of 5</div>
            </div>
            
            <div class="question-number">Question 1</div>
            <h1>Who was the first woman to dunk in a WNBA game?</h1>
            
            <div class="options">
              <div class="option">Michelle Snow</div>
              <div class="option selected">Candace Parker</div>
              <div class="option">Lisa Leslie</div>
              <div class="option">Sylvia Fowles</div>
            </div>
          </div>
        </body>
        </html>
      `
    },
    {
      name: 'screenshot3.png',
      html: `
        <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              width: 1284px;
              height: 2778px;
              background: linear-gradient(135deg, #581c87 0%, #be185d 50%, #3730a3 100%);
              color: white;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              max-width: 400px;
              text-align: center;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(16px);
              border-radius: 24px;
              padding: 32px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .celebration {
              font-size: 48px;
              margin-bottom: 16px;
            }
            h1 {
              font-size: 28px;
              font-weight: bold;
              color: white;
              margin-bottom: 16px;
            }
            .score {
              font-size: 20px;
              color: #d1d5db;
              margin-bottom: 24px;
            }
            .badge {
              background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
              color: #92400e;
              padding: 16px 24px;
              border-radius: 16px;
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 32px;
              display: inline-block;
            }
            .buttons {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
            .button {
              background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
              color: white;
              border: none;
              padding: 16px;
              border-radius: 12px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
            }
            .button:hover {
              background: linear-gradient(135deg, #7c3aed 0%, #db2777 100%);
            }
            .button.outline {
              background: transparent;
              border: 1px solid #a855f7;
              color: #c084fc;
            }
            .button.outline:hover {
              background: rgba(168, 85, 247, 0.2);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="celebration">🎉</div>
            <h1>Quiz Complete!</h1>
            <div class="score">You scored 4 out of 5</div>
            <div class="badge">🏆 ALL-STAR</div>
            
            <div class="buttons">
              <button class="button">Play Again</button>
              <button class="button outline">Share Score</button>
            </div>
          </div>
        </body>
        </html>
      `
    }
  ];

  // Generate each screenshot
  for (const screenshot of screenshots) {
    console.log(`Generating ${screenshot.name}...`);
    
    await page.setContent(screenshot.html);
    
    // Wait a moment for any animations to settle
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    const screenshotPath = path.join(__dirname, '..', 'public', screenshot.name);
    await page.screenshot({ 
      path: screenshotPath,
      type: 'png',
      fullPage: false
    });
    
    console.log(`✅ Generated ${screenshot.name}`);
  }

  await browser.close();
  console.log('🎉 All screenshots generated successfully!');
  console.log('📁 Screenshots saved to public/ folder');
}

// Run the script
generateScreenshots().catch(console.error); 
const { FarcasterClient } = require('@farcaster/js');
const fs = require('fs');
const path = require('path');

// Farcaster configuration
const FARCASTER_CONFIG = {
  APP_FID: process.env.NEXT_PUBLIC_APP_FID || '',
  APP_MNEMONIC: process.env.APP_MNEMONIC || '',
  HUB_URL: process.env.NEXT_PUBLIC_HUB_URL || 'https://hub.farcaster.standardcrypto.vc:2283',
};

async function uploadToFarcaster() {
  console.log('🚀 Starting Farcaster upload process...');
  
  // Check if required environment variables are set
  if (!FARCASTER_CONFIG.APP_FID || !FARCASTER_CONFIG.APP_MNEMONIC) {
    console.error('❌ Missing required environment variables:');
    console.error('   - NEXT_PUBLIC_APP_FID');
    console.error('   - APP_MNEMONIC');
    console.error('');
    console.error('Please set these in your .env.local file');
    console.error('');
    console.error('To get these values:');
    console.error('1. Go to https://warpcast.com/~/developers');
    console.error('2. Create a new app');
    console.error('3. Copy the App FID and App Mnemonic');
    return;
  }

  try {
    // Initialize Farcaster client
    const farcasterClient = new FarcasterClient({
      hubUrl: FARCASTER_CONFIG.HUB_URL,
    });

    console.log('✅ Farcaster client initialized');

    // Check if screenshots exist
    const screenshotPath = path.join(__dirname, '..', 'public');
    const screenshots = ['screenshot1.png', 'screenshot2.png', 'screenshot3.png'];
    
    for (const screenshot of screenshots) {
      const filePath = path.join(screenshotPath, screenshot);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Screenshot not found: ${screenshot}`);
        console.error('Please run the screenshot generation script first:');
        console.error('   node scripts/generate-screenshots.js');
        return;
      }
    }

    console.log('✅ All screenshots found');

    // Frame metadata for the main quiz
    const frameMetadata = {
      'fc:frame': 'vNext',
      'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og`,
      'fc:frame:button:1': '🏆 Take the Quiz',
      'fc:frame:button:2': '🧠 Unlock IQ Score',
      'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
    };

    console.log('📋 Frame metadata prepared:');
    console.log(JSON.stringify(frameMetadata, null, 2));

    // Create the cast content
    const castContent = `🏀 Women's Sports Quiz is now live on Farcaster!

Test your knowledge of women's sports and unlock your IQ score! 

🎯 Take the quiz to see how much you know about women's sports history, achievements, and legends.

🧠 Connect your wallet to unlock your personalized Sports IQ score on Base network.

Try it now! 👆`;

    console.log('📝 Cast content prepared:');
    console.log(castContent);

    console.log('');
    console.log('🎉 Ready to upload to Farcaster!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Make sure your app is deployed and accessible');
    console.log('2. Set NEXT_PUBLIC_BASE_URL to your deployed URL');
    console.log('3. Run this script again to actually post to Farcaster');
    console.log('');
    console.log('To deploy your app:');
    console.log('   npm run build');
    console.log('   npm run start');
    console.log('');
    console.log('Or deploy to Vercel:');
    console.log('   npx vercel --prod');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
uploadToFarcaster().catch(console.error); 
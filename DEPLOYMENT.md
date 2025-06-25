# Deploying Your Women's Sports Quiz to Farcaster

This guide will walk you through deploying your quiz app and publishing it as a Farcaster Mini App.

## Step 1: Choose Your Domain

You need a domain to host your app. Here are some options:

### Option A: Vercel (Recommended - Free)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Import your GitHub repository
4. Deploy - you'll get a URL like `https://your-app.vercel.app`

### Option B: Netlify (Free)
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Import your GitHub repository
4. Deploy - you'll get a URL like `https://your-app.netlify.app`

### Option C: Custom Domain
If you have a custom domain, you can use that instead.

## Step 2: Update Environment Variables

Once you have your domain, update the environment variables:

1. **In Vercel/Netlify dashboard:**
   - Go to your project settings
   - Add environment variable: `NEXT_PUBLIC_BASE_URL`
   - Set value to your domain (e.g., `https://your-app.vercel.app`)

2. **Update the manifest file:**
   Edit `public/.well-known/farcaster.json` and replace all instances of `your-domain.com` with your actual domain.

## Step 3: Create Required Images

You need several images for your Farcaster Mini App:

### 1. App Icon (1024x1024 PNG)
- Convert the SVG icon to PNG: `public/icon.svg` → `public/icon.png`
- Must be exactly 1024x1024 pixels
- No transparency/alpha channel

### 2. Screenshots (1284x2778 PNG)
Create 3 screenshots of your app in portrait orientation:
- `public/screenshot1.png` - Welcome screen
- `public/screenshot2.png` - Quiz question
- `public/screenshot3.png` - Results screen

### 3. Hero Image (1200x630 PNG)
- Use the Open Graph image: `https://your-domain.com/api/og`
- Or create a custom promotional image

## Step 4: Update the Manifest File

Update `public/.well-known/farcaster.json` with your actual domain and image URLs:

```json
{
  "frame": {
    "version": "1",
    "name": "Women's Sports Quiz",
    "iconUrl": "https://your-actual-domain.com/icon.png",
    "homeUrl": "https://your-actual-domain.com",
    "imageUrl": "https://your-actual-domain.com/api/og",
    "buttonTitle": "🏀 Start Quiz",
    "splashImageUrl": "https://your-actual-domain.com/icon.png",
    "splashBackgroundColor": "#667eea",
    "subtitle": "Test your women's sports knowledge",
    "description": "Challenge yourself with 5 fun questions about women's sports history, records, and viral moments. Perfect for sports fans and trivia lovers!",
    "screenshotUrls": [
      "https://your-actual-domain.com/screenshot1.png",
      "https://your-actual-domain.com/screenshot2.png",
      "https://your-actual-domain.com/screenshot3.png"
    ],
    "primaryCategory": "games",
    "tags": [
      "sports",
      "quiz",
      "womens-sports",
      "trivia",
      "basketball"
    ],
    "heroImageUrl": "https://your-actual-domain.com/api/og",
    "tagline": "Test your women's sports knowledge",
    "ogTitle": "Women's Sports Quiz",
    "ogDescription": "Challenge yourself with 5 fun questions about women's sports history, records, and viral moments!",
    "ogImageUrl": "https://your-actual-domain.com/api/og",
    "canonicalDomain": "your-actual-domain.com"
  }
}
```

## Step 5: Verify Your Setup

1. **Test the manifest file:**
   Visit `https://your-domain.com/.well-known/farcaster.json`
   It should return your JSON manifest

2. **Test the Open Graph image:**
   Visit `https://your-domain.com/api/og`
   It should return a 1200x630 image

3. **Test the frame endpoints:**
   - `https://your-domain.com/api/frame`
   - `https://your-domain.com/api/frame/answer?q=0&session=test&score=0`
   - `https://your-domain.com/api/frame/results?score=4&total=5&session=test`

## Step 6: Verify Domain Ownership (Optional but Recommended)

To get verified and eligible for rewards:

1. **Open Warpcast** and go to Developer Tools
2. **Use the Mini App Manifest Tool**
3. **Enter your domain** (exactly as it appears in your manifest)
4. **Copy the generated `accountAssociation` object**
5. **Add it to your `farcaster.json`:**

```json
{
  "accountAssociation": {
    "header": "your-header-here",
    "payload": "your-payload-here", 
    "signature": "your-signature-here"
  },
  "frame": {
    // ... your existing frame config
  }
}
```

## Step 7: Submit for Discovery

Once deployed and verified:

1. **Your app will automatically appear** in Farcaster Mini App stores
2. **Users can discover it** through the app store
3. **You can share the frame URL** directly: `https://your-domain.com/api/frame`

## Testing Your Frame

You can test your frame using:

1. **Warpcast** - Share the frame URL in a cast
2. **Frame Validator** - Use tools like [Frame Validator](https://frame-validator.vercel.app/)
3. **Direct URL** - Visit `https://your-domain.com/api/frame`

## Troubleshooting

### Common Issues:

1. **Manifest not found:**
   - Ensure `.well-known/farcaster.json` is in your `public` folder
   - Check that your hosting platform serves it correctly

2. **Images not loading:**
   - Verify image URLs are accessible
   - Check image dimensions match requirements
   - Ensure PNG format (no transparency for icon)

3. **Frame not working:**
   - Test all API endpoints return valid HTML
   - Check that frame metadata is correct
   - Verify redirects work properly

### Getting Help:

- Check the [Farcaster documentation](https://docs.farcaster.xyz/)
- Join Farcaster developer communities
- Test with the [Frame Validator](https://frame-validator.vercel.app/)

## Next Steps

Once your app is live:

1. **Share it on Farcaster** - Post about your new quiz app!
2. **Gather feedback** - Ask users what they think
3. **Add more questions** - Expand the quiz content
4. **Consider advanced features** - Add notifications, leaderboards, etc.

---

**Congratulations! Your Women's Sports Quiz is now a Farcaster Mini App! 🏀✨** 
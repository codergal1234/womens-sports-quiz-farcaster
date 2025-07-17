# Women's Sports Quiz - Farcaster Mini App

A fun, interactive quiz about women's sports history, records, and viral moments, designed to work as both a standalone web app and a Farcaster frame.

## Features

- 🏀 5 engaging questions about women's sports
- 🏆 Dynamic scoring and achievement badges
- 📱 Optimized for both web and Farcaster frames
- 🎨 Beautiful, responsive UI with animations
- 📤 Social sharing and friend challenges
- 🏅 Downloadable achievement badges

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Farcaster Frame Integration

This app is designed to work seamlessly with Farcaster frames. The frame flow is:

1. **Welcome Frame** (`/api/frame`) - Initial frame with "Start Quiz" button
2. **Question Frames** (`/api/frame/answer`) - Interactive quiz questions with 3 answer options
3. **Results Frame** (`/api/frame/results`) - Score display with "Play Again" and "Share Score" options

### Frame URLs

- **Main Frame:** `http://localhost:3000/api/frame`
- **Question Frame:** `http://localhost:3000/api/frame/answer?q=0&session=abc123&score=0`
- **Results Frame:** `http://localhost:3000/api/frame/results?score=4&total=5&session=abc123`

### Open Graph Images

The app generates dynamic Open Graph images for frames:

- **Welcome:** `/api/og`
- **Questions:** `/api/og/question?q=0&score=0`
- **Results:** `/api/og/results?score=4&total=5`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_BASE_URL`: Your production URL (e.g., `https://your-app.vercel.app`)

### Other Platforms

The app works on any platform that supports Next.js. Just make sure to:

1. Set the `NEXT_PUBLIC_BASE_URL` environment variable to your production URL
2. Ensure the platform supports Next.js 15+ and the Edge Runtime

## Advanced Farcaster Features

For advanced Farcaster integration (casting, reactions, etc.), you can add these optional environment variables:

```env
NEXT_PUBLIC_APP_FID=your_app_fid_here
APP_MNEMONIC=your_app_mnemonic_here
NEXT_PUBLIC_HUB_URL=https://hub.farcaster.standardcrypto.vc:2283
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── frame/           # Farcaster frame endpoints
│   │   └── og/              # Open Graph image generation
│   ├── quiz/                # Quiz page
│   ├── results/             # Results page
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── quiz-frame.tsx       # Quiz component
│   ├── results-frame.tsx    # Results component
│   ├── welcome-screen.tsx   # Welcome screen
│   └── ui/                  # UI components
├── lib/
│   └── farcaster.ts         # Farcaster utilities
└── public/                  # Static assets
```

## Customization

### Adding New Questions

Edit the `QUESTIONS` array in `components/quiz-frame.tsx`:

```typescript
const QUESTIONS = [
  {
    question: "Your new question here?",
    options: ["Option A", "Option B", "Option C"],
    correctAnswer: "Option A",
    funFact: "Interesting fact about the answer!",
  },
  // ... more questions
]
```

### Styling

The app uses Tailwind CSS for styling. The main color scheme is purple/pink gradients, which you can customize in the component files.

### Badge System

Badge titles and colors are determined by score percentages:
- 100%: "PERFECT SCORE" (Gold)
- 80%+: "ALL-STAR" (Purple/Pink)
- 60%+: "SPORTS SCHOLAR" (Teal/Blue)
- <60%: "SPORTS FAN" (Blue/Indigo)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own Farcaster mini apps!

## Support

If you have questions or need help, feel free to:
- Open an issue on GitHub
- Reach out on Farcaster
- Check the Farcaster documentation for frame development

---

**Happy quizzing! 🏀✨** # Last updated: Thu Jul 17 16:29:22 PDT 2025

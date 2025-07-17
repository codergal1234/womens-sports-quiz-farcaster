# Farcaster Mini App Wallet Integration Setup Guide

This guide explains how to set up the wallet integration and USDC payment functionality for the Women's Sports Quiz Farcaster Mini App.

## Features

- 🔗 **Farcaster Mini App Wallet Connection**: Optimized for Farcaster environment
- 🧠 **IQ Score Testing**: Take a sports knowledge test
- 💰 **USDC Payment**: Pay 0.1 USDC on Base network to unlock your score
- 🎨 **Gen Z Design**: Beautiful, modern UI with animations
- 🌐 **Network Detection**: Automatic Base network detection and switching

## Setup Instructions

### 1. Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# WalletConnect Project ID (get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Your wallet address to receive USDC payments
NEXT_PUBLIC_RECIPIENT_ADDRESS=0x1390e7b342e4033060604d43fbe776038b89327a
```

### 2. Get WalletConnect Project ID

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID
4. Add it to your environment variables

### 3. Payment Destination

All USDC payments (0.1 USDC per test) will be sent to your Base wallet address:
**`0x1390e7b342e4033060604d43fbe776038b89327a`**

This address is hardcoded in the app, so you'll receive all payments directly to your wallet.

### 4. USDC on Base Network

The app uses the official USDC token on Base:
- **Address**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Network**: Base (L2)
- **Amount**: 0.1 USDC

## How It Works

1. **Farcaster Detection**: App automatically detects if running in Farcaster Mini App environment
2. **Connect Wallet**: User connects their wallet (optimized for Farcaster environment)
3. **Network Check**: App verifies user is on Base network and offers to switch if needed
4. **Take Test**: User answers 3 sports questions (currently mock questions)
5. **Payment Prompt**: After completing the test, user is prompted to pay 0.1 USDC
6. **Transaction**: User approves the USDC transfer to your wallet address
7. **Score Unlock**: Once payment is confirmed, the IQ score is unlocked and displayed

## Components

### `useFarcasterWallet` Hook (`hooks/useFarcasterWallet.ts`)
- Detects Farcaster Mini App environment
- Handles wallet connections optimized for Farcaster
- Manages network switching to Base
- Provides error handling and loading states

### `useUnlockIQ` Hook (`hooks/useUnlockIQ.ts`)
- Manages test completion state
- Handles USDC payment transactions
- Tracks transaction status
- Unlocks score after successful payment

### `IQUnlock` Component (`components/iq-unlock.tsx`)
- Beautiful UI with animations
- Farcaster-optimized wallet connection interface
- Network detection and switching
- Test interface
- Payment interface
- Score display

## Testing

1. Visit `/iq-unlock` in your app
2. Connect your wallet (make sure you're on Base network)
3. Take the test
4. Approve the USDC payment
5. View your unlocked score

## Customization

### Change Payment Amount
Edit the `PAYMENT_AMOUNT` constant in `hooks/useUnlockIQ.ts`:

```typescript
const PAYMENT_AMOUNT = 0.1 // Change this value
```

### Add Real Questions
Replace the mock questions in `components/iq-unlock.tsx`:

```typescript
const mockQuestions = [
  "Your real question here?",
  "Another question?",
  "Third question?"
]
```

### Change USDC Address
If you want to use a different USDC token, update the address in `hooks/useUnlockIQ.ts`:

```typescript
const USDC_ADDRESS = '0xYourUSDCAddress'
```

## Security Notes

- Always verify the recipient address before deploying
- Test on Base Sepolia testnet first
- Ensure your wallet has enough USDC and ETH for gas fees
- Consider adding rate limiting for production use

## Troubleshooting

### "Wallet not connected" error
- Make sure the user has connected their wallet
- Check that the wallet is on Base network

### "Payment failed" error
- Ensure the user has enough USDC in their wallet
- Check that they have enough ETH for gas fees
- Verify the recipient address is correct

### Transaction not confirming
- Check Base network status
- Ensure gas fees are sufficient
- Try increasing gas limit if needed 
"use client"

import { WagmiProvider, createConfig, http } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { base, baseSepolia } from "wagmi/chains"
import { metaMask, coinbaseWallet, walletConnect, injected } from "wagmi/connectors"
import type { ReactNode } from "react"

/**
 * 1️⃣  React-Query client (wagmi v2 dep.)
 */
const queryClient = new QueryClient()

/**
 * 2️⃣  wagmi config – optimized for Farcaster Mini Apps
 *     NOTE: replace `projectId` with your WalletConnect Cloud project-id.
 */
const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    // Injected connector for Farcaster Mini Apps
    injected({
      target: 'metaMask',
    }),
    // MetaMask connector
    metaMask(), 
    // Coinbase Wallet connector
    coinbaseWallet({ 
      appName: "Women's Sports Quiz",
      appLogoUrl: "https://womens-sports-quiz-farcaster.vercel.app/icon.svg"
    }),
    // WalletConnect for mobile compatibility
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
      showQrModal: true,
      metadata: {
        name: "Women's Sports Quiz",
        description: "Test your sports knowledge and unlock your IQ score",
        url: "https://womens-sports-quiz-farcaster.vercel.app",
        icons: ["https://womens-sports-quiz-farcaster.vercel.app/icon.svg"]
      }
    })
  ],
  transports: {
    [base.id]: http(), // Base mainnet
    [baseSepolia.id]: http(), // Base testnet
  },
})

/**
 * 3️⃣  Provider wrapper – supplies wagmi + React-Query to the tree.
 */
export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

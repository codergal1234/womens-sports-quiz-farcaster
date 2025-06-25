"use client"

import { WagmiProvider, createConfig, http } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { base, baseSepolia } from "wagmi/chains"
import { metaMask, coinbaseWallet } from "wagmi/connectors"
import type { ReactNode } from "react"

/**
 * 1️⃣  React-Query client (wagmi v2 dep.)
 */
const queryClient = new QueryClient()

/**
 * 2️⃣  wagmi config – add any chains / connectors you want.
 *     NOTE: replace `projectId` with your WalletConnect Cloud project-id.
 */
const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [metaMask(), coinbaseWallet({ appName: "Women's Sports Quiz" })],
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

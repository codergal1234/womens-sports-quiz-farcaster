import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function useFarcasterWallet() {
  const { connectors, connect, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected, chainId } = useAccount()
  
  const [isFarcasterApp, setIsFarcasterApp] = useState(false)
  const [walletError, setWalletError] = useState<string | null>(null)

  // Check if we're in a Farcaster Mini App environment
  useEffect(() => {
    const checkFarcasterApp = () => {
      // Only run on client side
      if (typeof window === 'undefined') return
      
      const isInFarcaster = window.location.href.includes('farcaster') || 
                           window.location.href.includes('warpcast') ||
                           window.navigator.userAgent.includes('Farcaster') ||
                           window.navigator.userAgent.includes('Warpcast') ||
                           // Check for Farcaster-specific window properties
                           (window as any).farcaster ||
                           (window as any).warpcast
      
      setIsFarcasterApp(isInFarcaster)
    }
    
    checkFarcasterApp()
  }, [])

  // Handle wallet connection with Farcaster-specific logic
  const handleConnectWallet = async () => {
    try {
      setWalletError(null)
      
      // For Farcaster Mini Apps, try injected connector first
      if (isFarcasterApp) {
        const injectedConnector = connectors.find(c => c.id === 'injected')
        if (injectedConnector) {
          await connect({ connector: injectedConnector })
          return
        }
      }
      
      // Fallback to first available connector
      if (connectors[0]) {
        await connect({ connector: connectors[0] })
      } else {
        setWalletError('No wallet connectors available')
      }
    } catch (error) {
      console.error('Wallet connection failed:', error)
      setWalletError('Failed to connect wallet. Please try again.')
    }
  }

  // Check if wallet is on Base network
  const isOnBaseNetwork = chainId === 8453 || chainId === 84532 // Base mainnet or testnet

  // Get network name
  const getNetworkName = () => {
    if (chainId === 8453) return 'Base'
    if (chainId === 84532) return 'Base Sepolia'
    return 'Unknown Network'
  }

  // Switch to Base network
  const switchToBase = async () => {
    if (!isConnected) return
    
    try {
      // Try to switch to Base network
      if (window.ethereum) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2105' }], // Base mainnet
        })
      }
    } catch (error) {
      console.error('Failed to switch to Base network:', error)
      setWalletError('Please switch to Base network in your wallet')
    }
  }

  return {
    // State
    isConnected,
    address,
    chainId,
    isFarcasterApp,
    isConnecting,
    walletError,
    isOnBaseNetwork,
    
    // Actions
    handleConnectWallet,
    disconnect,
    switchToBase,
    
    // Utils
    getNetworkName,
    setWalletError
  }
} 
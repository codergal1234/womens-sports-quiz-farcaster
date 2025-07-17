import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'

// USDC token address on Base
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // Base USDC
const USDC_DECIMALS = 6
const PAYMENT_AMOUNT = 0.1 // 0.1 USDC

// ERC20 ABI for USDC transfer
const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  }
] as const

export function useUnlockIQ() {
  const { address, isConnected } = useAccount()
  const [testCompleted, setTestCompleted] = useState(false)
  const [scoreUnlocked, setScoreUnlocked] = useState(false)
  const [iqScore, setIqScore] = useState<number | null>(null)

  // Contract write for USDC transfer
  const { 
    data: hash, 
    writeContract, 
    isPending: isTransferring,
    error: transferError 
  } = useWriteContract()

  // Wait for transaction receipt
  const { 
    isLoading: isConfirming, 
    isSuccess: isTransferSuccess 
  } = useWaitForTransactionReceipt({ hash })

  // Handle test completion
  const handleTestCompletion = (score: number) => {
    setTestCompleted(true)
    setIqScore(score)
  }

  // Handle USDC payment
  const handlePayment = async () => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected')
    }

    const amount = parseUnits(PAYMENT_AMOUNT.toString(), USDC_DECIMALS)
    
    // Transfer to your wallet address
    const recipientAddress = process.env.NEXT_PUBLIC_RECIPIENT_ADDRESS || '0x1390e7b342e4033060604d43fbe776038b89327a'
    
    writeContract({
      address: USDC_ADDRESS as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [recipientAddress as `0x${string}`, amount]
    })
  }

  // Unlock score when payment is successful
  useEffect(() => {
    if (isTransferSuccess) {
      setScoreUnlocked(true)
    }
  }, [isTransferSuccess])

  return {
    // State
    testCompleted,
    scoreUnlocked,
    iqScore,
    isConnected,
    address,
    
    // Actions
    handleTestCompletion,
    handlePayment,
    
    // Transaction state
    isTransferring,
    isConfirming,
    isTransferSuccess,
    transferError,
    hash
  }
} 
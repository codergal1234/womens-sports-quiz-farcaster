"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { Award, Loader2 } from "lucide-react"

// This is a simplified ABI for a basic NFT contract
// In a real implementation, you would use the full ABI of your deployed contract
const NFT_CONTRACT_ABI = [
  {
    name: "mintBadge",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "badgeTitle", type: "string" },
      { name: "score", type: "uint256" },
      { name: "totalQuestions", type: "uint256" },
    ],
    outputs: [{ type: "uint256" }],
  },
] as const

// Replace with your actual contract address on Base
const NFT_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"

interface MintBadgeButtonProps {
  badgeTitle: string
  score: number
  totalQuestions: number
}

export function MintBadgeButton({ badgeTitle, score, totalQuestions }: MintBadgeButtonProps) {
  const { toast } = useToast()
  const [isMinted, setIsMinted] = useState(false)

  const { data: hash, isPending: isMinting, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    confirmations: 1,
  })

  // Set minted state when transaction is successful
  if (isSuccess && !isMinted) {
    setIsMinted(true)
    toast({
      title: "Badge Minted Successfully!",
      description: "Your achievement is now permanently on the blockchain.",
    })
  }

  const handleMint = async () => {
    try {
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: "mintBadge",
        args: [badgeTitle, BigInt(score), BigInt(totalQuestions)],
        value: parseEther("0"), // No ETH sent with transaction
      })
    } catch (error) {
      console.error("Error minting badge:", error)
      toast({
        title: "Minting Failed",
        description: "There was an error minting your badge. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isMinted) {
    return (
      <Button disabled className="w-full bg-green-500">
        <Award className="mr-2 h-5 w-5" />
        Badge Minted Successfully!
      </Button>
    )
  }

  return (
    <Button
      onClick={handleMint}
      disabled={isMinting || isConfirming}
      className="w-full bg-purple-600 hover:bg-purple-700"
    >
      {isMinting || isConfirming ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          {isMinting ? "Confirm in Wallet..." : "Confirming Transaction..."}
        </>
      ) : (
        <>
          <Award className="mr-2 h-5 w-5" />
          Mint Badge NFT
        </>
      )}
    </Button>
  )
}

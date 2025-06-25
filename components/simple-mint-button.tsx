"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Award, Loader2 } from "lucide-react"

interface SimpleMintButtonProps {
  badgeTitle: string
  score: number
  totalQuestions: number
}

export function SimpleMintButton({ badgeTitle, score, totalQuestions }: SimpleMintButtonProps) {
  const [isMinting, setIsMinting] = useState(false)
  const [isMinted, setIsMinted] = useState(false)

  const handleMint = async () => {
    setIsMinting(true)

    try {
      // This is where you'd add the actual minting logic
      // Using Thirdweb, it would be just a few lines:

      // const contract = await sdk.getContract("YOUR_CONTRACT_ADDRESS")
      // const tx = await contract.erc721.mintTo(address, {
      //   name: `${badgeTitle} Badge`,
      //   description: `Earned ${score}/${totalQuestions} on Women's Sports Quiz`,
      //   image: "ipfs://your-badge-image"
      // })

      // Simulate minting for now
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsMinted(true)
      alert("Badge minted successfully! 🎉")
    } catch (error) {
      console.error("Minting failed:", error)
      alert("Minting failed. Please try again.")
    } finally {
      setIsMinting(false)
    }
  }

  if (isMinted) {
    return (
      <Button disabled className="w-full bg-green-500">
        <Award className="mr-2 h-5 w-5" />
        Badge Minted! ✨
      </Button>
    )
  }

  return (
    <Button onClick={handleMint} disabled={isMinting} className="w-full bg-purple-600 hover:bg-purple-700">
      {isMinting ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Minting Badge...
        </>
      ) : (
        <>
          <Award className="mr-2 h-5 w-5" />
          Mint Badge NFT (Free!)
        </>
      )}
    </Button>
  )
}

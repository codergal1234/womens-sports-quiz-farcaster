"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useConnect, useAccount, useDisconnect } from "wagmi"

interface ConnectButtonProps {
  className?: string
}

export function ConnectButton({ className }: ConnectButtonProps) {
  const { connect, connectors, isPending } = useConnect()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="text-sm text-gray-600 text-center">
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <Button onClick={() => disconnect()} variant="outline" className="w-full">
          Disconnect Wallet
        </Button>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isPending ? "Connecting..." : `Connect ${connector.name}`}
        </Button>
      ))}
    </div>
  )
}

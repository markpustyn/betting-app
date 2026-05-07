"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trade } from "@/db/types"
import useSWR from "swr"
import { formatAddress } from "@/lib/tools"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any
  }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function Dashboard() {
  const [wallet, setWallet] = useState<string | null>(null)

  const { data, isLoading } = useSWR(
    wallet ? `/api/history/user?address=${wallet}` : null,
    fetcher,
    {
      refreshInterval: 5000,
    }
  )

  const trades: Trade[] = data?.data ?? []

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask is not installed")
      return
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    setWallet(accounts[0])
  }

  useEffect(() => {
    async function checkWallet() {
      if (!window.ethereum) return

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      })

      if (accounts.length > 0) {
        setWallet(accounts[0])
      }
    }

    checkWallet()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Account Dashboard</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">MetaMask Wallet</p>

          <p className="mt-1 break-all text-sm font-medium">
            {wallet ? wallet : "No wallet connected"}
          </p>

          {!wallet && (
            <Button onClick={connectWallet} className="mt-4">
              Connect Wallet
            </Button>
          )}
        </div>

        <div className="w-full py-4">
          <h2 className="text-md font-semibold mb-2">Your Trade History</h2>

          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading trades...</p>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Trade</TableHead>
                <TableHead>Bet ID</TableHead>
                <TableHead>Tx Hash</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {trades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell>{formatAddress(trade.userId)}</TableCell>
                  <TableCell>{trade.side}</TableCell>
                  <TableCell>{trade.betId}</TableCell>
                  <TableCell>
                    {trade.txHash ? formatAddress(trade.txHash) : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    {Number(trade.amount).toFixed(2)} ETH
                  </TableCell>
                </TableRow>
              ))}

              {trades.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-sm text-muted-foreground"
                  >
                    {wallet ? "No trades yet" : "Connect wallet to view trades"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default Dashboard
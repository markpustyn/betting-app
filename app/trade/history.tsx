"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import useSWR from "swr"
import { Trade, Bet } from "@/db/types"
import { formatAddress } from "@/lib/tools"
import { calculatePayout } from "@/lib/algorithm"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function History({
  bet,
  optionAPool,
  optionBPool,
}: {
  bet: Bet
  optionAPool: number
  optionBPool: number
}) {
  const { data, isLoading } = useSWR(`/api/history?betId=${bet.id}`, fetcher, {
    refreshInterval: 5000,
  })

  const trades: Trade[] = data?.data ?? []
  const currentTotalPool = Number(data?.totalPool ?? bet.totalPool ?? 0)

  function getPayout(trade: Trade) {
    const tradeAmount = Number(trade.amount || 0)

    const selectedSidePool =
      trade.side === bet.optionA
        ? Number(optionAPool || 0)
        : Number(optionBPool || 0)

    return calculatePayout({
      userBetAmount: tradeAmount,
      winningPool: selectedSidePool,
      totalPool: currentTotalPool,
    })
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground mt-4">Loading history...</p>
  }

  return (
    <div className="w-full py-4">
      <h2 className="text-md font-semibold mb-2">Trade History</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Trade</TableHead>
            <TableHead>Est Payout</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{formatAddress(trade.userId)}</TableCell>
              <TableCell>{trade.side}</TableCell>
              <TableCell>{getPayout(trade)} ETH</TableCell>
              <TableCell className="text-right">
                {Number(trade.amount).toFixed(2)} ETH
              </TableCell>
            </TableRow>
          ))}

          {trades.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-sm text-muted-foreground"
              >
                No trades yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default History
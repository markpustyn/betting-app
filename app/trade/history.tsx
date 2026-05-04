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
import { Trade } from "@/db/types"
import { formatAddress } from "@/lib/tools"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function History({ betId }: { betId: number }) {
  const { data, isLoading } = useSWR(
    `/api/history?betId=${betId}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  )

  const trades: Trade[] = data?.data ?? []

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
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{formatAddress(trade.userId)}</TableCell>
              <TableCell>{trade.side}</TableCell>
              <TableCell className="text-right">
                {Number(trade.amount).toFixed(2)} ETH
              </TableCell>
            </TableRow>
          ))}

          {trades.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
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
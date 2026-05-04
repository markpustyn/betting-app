import { Trade } from "@/db/types"

type ChartPoint = {
  time: string
  yes: number
  no: number
}

const HOUSE_EDGE = 0.08
const START_LIQUIDITY = 1000
const START_YES_PROBABILITY = 0.5
const BUCKET_SECONDS = 30

export function generateBettingChart(trades: Trade[], betNames: [string, string]): ChartPoint[] {
  let yesLiquidity = START_YES_PROBABILITY * START_LIQUIDITY
  let noLiquidity = (1 - START_YES_PROBABILITY) * START_LIQUIDITY

  const sortedTrades = [...trades].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  const buckets = new Map<number, ChartPoint>()

  for (const trade of sortedTrades) {
    if (trade.side === betNames[0]) {
      yesLiquidity += Number(trade.amount)
    } else {
      noLiquidity += Number(trade.amount)
    }

    const totalLiquidity = yesLiquidity + noLiquidity

    const rawYesProbability = yesLiquidity / totalLiquidity
    const rawNoProbability = noLiquidity / totalLiquidity

    const yesPrice = rawYesProbability * (1 + HOUSE_EDGE)
    const noPrice = rawNoProbability * (1 + HOUSE_EDGE)

    const tradeTime = new Date(trade.createdAt).getTime()

    const bucketTime =
    Math.floor(tradeTime / (BUCKET_SECONDS * 1000)) *
    BUCKET_SECONDS *
    1000

    buckets.set(bucketTime, {
      time: new Date(bucketTime).toISOString(),
      yes: Number((yesPrice * 100).toFixed(2)),
      no: Number((noPrice * 100).toFixed(2)),
    })
  }

  return Array.from(buckets.values())
}

export default function toTrade(trade: {
  id: number
  userId: string
  betId: number
  side: string
  amount: string
  createdAt: Date
  txHash: string
}): Trade {
  return {
    ...trade,
    side: trade.side.trim(),
    amount: Number(trade.amount),
    createdAt: new Date(trade.createdAt),
  }
}

export function calculatePayout({
  userBetAmount,
  winningPool,
  totalPool,
}: {
  userBetAmount: number
  winningPool: number
  totalPool: number
}) {
  const HOUSE_EDGE = 0.08

  if (winningPool <= 0) return 0

  const payoutPool = totalPool * (1 - HOUSE_EDGE)
  const userShare = userBetAmount / winningPool

  return Number((payoutPool * userShare).toFixed(2))
}
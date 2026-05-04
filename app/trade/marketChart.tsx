"use client"

import toTrade, { generateBettingChart } from "@/lib/algorithm"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Props = {
  betId: number
  betNames: [string, string]
}

export default function MarketMiniChart({ betId, betNames }: Props) {
  const { data, isLoading } = useSWR(`/api/chart?betId=${betId}`, fetcher, {
    refreshInterval: 3000,
    revalidateOnFocus: true,
  })

  if (isLoading) {
    return <div className="mt-4 h-3 w-full rounded-full bg-zinc-200" />
  }

   const chartData = generateBettingChart(data.data.map(toTrade), betNames)
  

  const latest = chartData.at(-1)

  const yesPercent = latest ? Math.round(latest.yes) : 50
  const noPercent = latest ? Math.round(latest.no) : 50

  return (
    <div className="mt-4">
      <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div className="flex h-full">
          <div
            className="bg-green-500 transition-all"
            style={{ width: `${yesPercent}%` }}
          />
          <div
            className="bg-red-500 transition-all"
            style={{ width: `${noPercent}%` }}
          />
        </div>
      </div>

      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{betNames[0]} {yesPercent}%</span>
        <span>{betNames[1]} {noPercent}%</span>
      </div>
    </div>
  )
}
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Bet } from "@/db/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

function History() {
  const [bets, setBets] = useState<Bet[]>([])
  const [status, setStatus] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch("/api/bets")
      .then((res) => res.json())
      .then((data) => setBets(data.data))
      .catch((err) => console.error(err))
  }, [])

  async function saveStatus(id: number) {
    const winner = status[String(id)]

    if (!winner) return

    await fetch("/api/bets/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        winner,
      }),
    })
    toast.success("Updated Result!")
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Active Markets</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border">
            <div className="grid grid-cols-5 border-b p-3 text-sm font-medium">
              <p>Title</p>
              <p>Option A</p>
              <p>Option B</p>
              <p>Total Pool</p>
              <p>Status</p>
            </div>

            {bets.map((market) => (
              <div
                className="grid grid-cols-5 items-center gap-3 border-b p-3 text-sm text-muted-foreground last:border-b-0"
                key={market.id}
              >
                <p>{market.title}</p>
                <p>{market.optionA}</p>
                <p>{market.optionB}</p>
                <p>${market.totalPool}</p>

                <div className="flex gap-2">
                  <Select
                    value={status[String(market.id)] ?? market.winner ?? "open"}
                    onValueChange={(val) =>
                      setStatus((prev) => ({
                        ...prev,
                        [String(market.id)]: val,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value={market.optionA}>
                        {market.optionA}
                      </SelectItem>
                      <SelectItem value={market.optionB}>
                        {market.optionB}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Button size="sm" onClick={() => saveStatus(market.id)}>
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default History
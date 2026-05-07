'use client'
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import History from "./history"

function Page() {

    const [title, setTitle] = useState('')
    const [optionA, setOptionA] = useState('')
    const [optionB, setOptionB] = useState('')
    const [closingDate, setClosingDate] = useState('')
    const [totalPool, setTotalPool] = useState('')
    
    async function createBet() {
    try {
        const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            optionA: optionA,
            optionB: optionB,
            closingDate: closingDate,
            totalPool: totalPool,
        }),
        })

        const data = await res.json()

        if (!res.ok) throw new Error(data.error)

        console.log(data)
    } catch (err) {
        console.error(err)
    }
    }


  return (
    <div>
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <p className="mt-2 text-muted-foreground">
          Create betting markets, manage liquidity, and regulate payout odds.
        </p>

        <div className="mt-8 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Bet</CardTitle>
            </CardHeader>
                <CardContent>
                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                    e.preventDefault()
                    createBet()
                    }}
                >
                    <div className="space-y-2">
                    <Label>Bet Title</Label>
                    <Input
                        placeholder="Sacramento St V Jessup Basketball Game?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Option A</Label>
                        <Input
                        placeholder="Sacramento St"
                        value={optionA}
                        onChange={(e) => setOptionA(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Option B</Label>
                        <Input
                        placeholder="Jessup"
                        value={optionB}
                        onChange={(e) => setOptionB(e.target.value)}
                        />
                    </div>
                    </div>

                    <div className="space-y-2">
                    <Label>Closing Date</Label>
                    <Input
                        type="datetime-local"
                        value={closingDate}
                        onChange={(e) => setClosingDate(e.target.value)}
                    />
                    </div>
                    <div className="space-y-2">
                    <Label>Total Pool</Label>
                    <Input
                    type="number"
                        value={totalPool}
                        onChange={(e) => setTotalPool(e.target.value)}
                        placeholder="$100"
                    />
                    </div>

                    <Button type="submit" className="w-full">
                    Create Bet
                    </Button>
                </form>
                </CardContent>
          </Card>
         
        </div>
        <div className="pt-12">
 </div>
         <History />
        
      </main>
    </div>
  )
}

export default Page
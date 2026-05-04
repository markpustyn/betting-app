import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/db/db"
import { bets } from "@/db/schema"
import Link from "next/link"
import MarketMiniChart from "./trade/marketChart"



export default async function Home() {
  const markets = await db.select().from(bets)



  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10 h-full">
        <div className="flex flex-col items-start justify-start h-full">
          
          <h1 className="text-4xl font-bold text-left mb-8 text-zinc-900 dark:text-white">
            Live Markets
          </h1>

          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market) => (
              <Link key={market.id} href={`/trade/${market.id}`}>
                <Card className="cursor-pointer transition hover:shadow-md hover:scale-[1.01] h-full">
                  <CardHeader>
                    <CardTitle>{market.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                        <strong>Ends On: </strong>{market.closesAt
                ? new Date(market.closesAt).toDateString()
                : "No closing date"}
                    </p>
                    <MarketMiniChart
                      betId={market.id}
                      betNames={[market.optionA, market.optionB]}
                    />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}
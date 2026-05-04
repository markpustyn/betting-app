import Header from "@/components/header"
import Chart from "./chart"
import Orders from "../orders"
import { db } from "@/db/db"
import { bets } from "@/db/schema"
import History from "../history"
import { eq } from "drizzle-orm"
import Info from "../info"


type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
const data = await db.select().from(bets).where(eq(bets.id, Number(id)))

if(!data || data.length === 0) {
  return <div>No bets available</div>
}
const data2 = data[0]

  
  return (
    <div>
      <Header />

      <div className="w-full px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 max-w-7xl mx-auto">
          
          {/* Chart */}
          <div className="w-full md:w-3/4">
            <Chart id={id}/>
            <Info
            category="Sports"
            volume={Number(data2.totalPool)}
            closes={data2.createdAt}
          />
          </div>

          {/* Orders */}
          <div className="w-full md:w-1/4">
            <Orders data={data2} />
            
            <History betId={data2.id}/>
          </div>

        </div>

      </div>
    </div>
  )
}
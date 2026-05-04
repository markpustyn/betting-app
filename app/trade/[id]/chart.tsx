import { db } from '@/db/db'
import { bets } from '@/db/schema'
import { LiveChart } from '../liveChart'
import { eq } from 'drizzle-orm'

type Props = {
  id: string
}

async function Chart({ id }: Props) {
  const data = await db
    .select()
    .from(bets)
    .where(eq(bets.id, Number(id)))

  const bet = data[0]

  if (!bet) {
    return <p>Bet not found</p>
  }

  return (
    <div className="w-full p-4 max-w-7xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{bet.title}</h1>
          <p className="text-muted-foreground">
            Live betting odds and statistics for the upcoming game.
          </p>
        </div>
      </div>

      <div className="w-full">
        <LiveChart
          betId={bet.id}
          betNames={[bet.optionA, bet.optionB]}
        />
      </div>
    </div>
  )
}

export default Chart
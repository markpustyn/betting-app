export type User = {
  id: string
  username: string
  email: string
  status: string | null
  createdAt: Date
}

export type Bet = {
  id: number
  title: string
  optionA: string
  optionB: string
  totalPool: string | null
  winner: string | null
  createdAt: Date
  closesAt: Date
}


export type Trade = {
  id: number
  userId: string
  betId: number
  side: string
  amount: number
  createdAt: Date
  txHash: string
}
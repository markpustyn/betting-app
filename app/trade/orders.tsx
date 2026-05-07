'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Bet } from '@/db/types'
import { toast } from 'sonner'
import { ethers } from 'ethers'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/contract'
import { calculatePayout } from '@/lib/algorithm'

type OrdersProps = {
  data: Bet
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any
  }
}

function Orders({ data, optionAPool, optionBPool }: OrdersProps & { optionAPool: number; optionBPool: number }) {
  const [active, setActive] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

    const tradeAmount = Number(amount || 0)
    const currentTotalPool = Number(data.totalPool || 0)

    const selectedSidePool =
      active === data.optionA
        ? Number(optionAPool || 0)
        : Number(optionBPool || 0)

    const estimatedPayout = calculatePayout({
      userBetAmount: tradeAmount,
      winningPool: selectedSidePool + tradeAmount,
      totalPool: currentTotalPool + tradeAmount,
    })
  useEffect(() => {
  function checkTime() {
        const now = new Date()
        const endTime = new Date(data.closesAt)

        const diff = endTime.getTime() - now.getTime()

        if (diff <= 0) {
          setIsOpen(false)
          setActive(null)
        } else {
          setIsOpen(true)
        }
      }

      checkTime()

      const interval = setInterval(checkTime, 1000)

      return () => clearInterval(interval)
    }, [data.closesAt])


  async function handleTrade() {
    if (!active || !amount) return

    setLoading(true)

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not found')
      }

      const provider = new ethers.BrowserProvider(window.ethereum)

      await provider.send('eth_requestAccounts', [])

      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      )

      const option = active === data.optionA ? 1 : 2

      const tx = await contract.placeBet(data.id, option, {
        value: ethers.parseEther(amount),
      })

      await tx.wait()

      const res = await fetch('/api/trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          side: active,
          amount,
          betId: data.id,
          address,
          txHash: tx.hash,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to save trade')
      }

      setAmount('')
      setActive(null)

      toast.success('Trade placed successfully', {
        position: 'top-center',
      })
    } catch (err) {
      console.error(err)
      toast.error('Failed to place trade')
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="w-full pt-16">
      <Card>
        <CardHeader>
          <CardTitle>Trade Options</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex w-full gap-2">
            <Button
              onClick={() => setActive(data.optionA)}
              className={`flex-1 py-4 ${
                active === data.optionA
                  ? 'bg-green-700 hover:bg-green-800 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-black'
              }`}
            >
              {data.optionA}
            </Button>

            <Button
              onClick={() => setActive(data.optionB)}
              className={`flex-1 py-4 ${
                active === data.optionB
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-black'
              }`}
            >
              {data.optionB}
            </Button>
          </div>

          <div className="pt-4">
            <Input
              type="number"
              placeholder="0.01 ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <Button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleTrade}
            disabled={loading || !active || !amount || !isOpen}
          >
            {loading ? 'Placing...' : 'Trade'}
          </Button>

          <div className="pt-4 text-sm text-muted-foreground">
            <h2>
              {isOpen ? '' : 'This trade has closed.'}
              Payout if {active ?? 'selected option'} wins:{' '}
              {active && amount ? estimatedPayout : '0.00'} ETH
            </h2>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


export default Orders
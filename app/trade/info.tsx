"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type InfoProps = {
  category: string
  volume: number
  closes: string | Date
}

function Info({ category, volume, closes}: InfoProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Market Info</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          
          <div className="text-muted-foreground">Category</div>
          <div className="text-right font-medium">{category}</div>

          <div className="text-muted-foreground">Volume</div>
          <div className="text-right font-medium">
            {volume.toLocaleString()} ETH
          </div>
          <div className="text-muted-foreground">Closes</div>
          <div className="text-right font-medium">
            {new Date(closes).toLocaleDateString()}
          </div>

          <div className="text-muted-foreground">Status</div>
          <div
            className={'text-right font-medium'}
          >
            Upcoming
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default Info
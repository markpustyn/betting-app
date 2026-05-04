"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FaRegDotCircle } from "react-icons/fa";

export const description = "An interactive area chart"

type ChartPoint = {
  time: string
  yes: number
  no: number
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ chartData, betNames }: { chartData: ChartPoint[]; betNames: [string, string] }) {
  const [timeRange, setTimeRange] = React.useState("90d")

const filteredData = chartData.slice(-50)

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardDescription className="flex items-center">
            Live
            <FaRegDotCircle className="ml-2 text-red-600" />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />

              <XAxis
                dataKey="time"
                tickFormatter={(value) => {
                  const date = new Date(value)

                  if (date.getSeconds() % 30 !== 0) return ""

                  return date.toLocaleTimeString("en-US", {
                    minute: "2-digit",
                    second: "2-digit",
                  })
                }}
              />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) =>
                        new Date(value).toLocaleTimeString("en-US", {
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      }
                      indicator="dot"
                    />
                  }
                />
              <Area
                dataKey="yes"
                name={betNames[0]}
                type="natural"
                stroke="#00f5ff"
                strokeWidth={2}
                fill="url(#fillYes)"
              />

              <Area
                dataKey="no"
                name={betNames[1]}
                type="natural"
                stroke="#ff00ff"
                strokeWidth={2}
                fill="url(#fillNo)"
              />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

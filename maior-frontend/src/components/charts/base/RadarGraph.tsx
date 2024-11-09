"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface RadarItem {
  channel: string,
  amount: string
}



interface RadarProps {
  chartData: RadarItem[];
}

export function RadarGraph({chartData}: RadarProps) {
  return (
    <Card className="h-[450px]">
      <CardHeader className="items-center">
        <CardTitle className="text-md">Payment Channels</CardTitle>
        <CardDescription className="text-sm">
          Spendings using different payment channels
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="channel" />
            <PolarGrid />
            <Radar
              dataKey="amount"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm -m-6">
        <div className="flex items-center gap-2 font-medium leading-none text-sm">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground text-sm">
          May - November 2024
        </div>
      </CardFooter>
    </Card>
  )
}
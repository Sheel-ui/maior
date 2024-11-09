"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
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

// Define the type for chart data
interface ChartData {
  value: string; // The name for the X-Axis (e.g., month, category)
  count: number; // The count/number for the Y-Axis (e.g., visitors, sales)
}

interface GenGraphProps {
  chartData: ChartData[]; // Dynamic chart data passed as a prop
}

const chartConfig = {
  desktop: {
    label: "desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function GenGraph({ chartData }: GenGraphProps) {
  return (
    <Card className="h-[570px]">
      <CardHeader>
        <CardTitle className="text-md">Graph</CardTitle>
        <CardDescription className="text-sm">By ChatGpt</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[375px] w-[500px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="value"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Assuming the value is a string (e.g., month name)
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

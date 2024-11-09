import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

interface BarItem {
	start: string;
	amount: string;
}

interface BarProps {
	chartData: BarItem[];
}

export function BarGraph({ chartData }: BarProps) {
	return (
		<div className="w-full flex justify-center items-center">
			<Card className="w-full">
				<CardHeader>
					<CardTitle className="text-md">Bar Chart - Label</CardTitle>
					<CardDescription className="text-sm">
						May - November 2024
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig} className="h-[265px] w-[700px]">
						<BarChart
							accessibilityLayer
							data={chartData}
							margin={{
								top: 10,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="start"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => value.slice(5, 10).replace("-", "/")}
							/>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<Bar
								dataKey="amount"
								fill="var(--color-desktop)"
								radius={4}
								
							>
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
					<div className="flex gap-2 font-medium leading-none text-sm">
						Trending up by 5.2% this month{" "}
						<TrendingUp className="h-4 w-4" />
					</div>
					<div className="leading-none text-muted-foreground text-sm">
						Showing total spendings for the last 6 months
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}

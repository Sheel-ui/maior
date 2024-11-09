"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

interface ChartDataItem {
	category: string;
	amount: number;
}

interface BarProps {
	chartData: ChartDataItem[];
}

const chartConfig = {
	amount: {
		label: "Amount",
	},
	Travel: {
		label: "Travel",
		color: "hsl(var(--chart-1))",
	},
	Food: {
		label: "Food and Drink",
		color: "hsl(var(--chart-2))",
	},
	Transfer: {
		label: "Transfer",
		color: "hsl(var(--chart-3))",
	},
	Shops: {
		label: "Shops",
		color: "hsl(var(--chart-4))",
	},
	Service: {
		label: "Service",
		color: "hsl(var(--chart-5))",
	},
	Healthcare: {
		label: "Healthcare",
		color: "hsl(var(--chart-6))",
	},
	Payment: {
		label: "Payment",
		color: "hsl(var(--chart-7))",
	},
	Recreation: {
		label: "Recreation",
		color: "hsl(var(--chart-8))",
	},
	Community: {
		label: "Community",
		color: "hsl(var(--chart-9))",
	},
} satisfies ChartConfig;

export function PieGraph({ chartData }: BarProps) {
	const totalspendings = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.amount, 0);
	}, [chartData]);

	return (
		<div className="h-[400px]">
			<Card className="flex flex-col h-full">
				<CardHeader className="items-center pb-0">
					<CardTitle className="text-md">Categories</CardTitle>
					<CardDescription className="text-sm">
						May - November 2024
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 pb-0">
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-[250px]"
					>
						<PieChart>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<Pie
								data={chartData}
								dataKey="amount"
								nameKey="category"
								innerRadius={60}
								strokeWidth={5}
							>
								<Label
									content={({ viewBox }) => {
										if (
											viewBox &&
											"cx" in viewBox &&
											"cy" in viewBox
										) {
											return (
												<text
													x={viewBox.cx}
													y={viewBox.cy}
													textAnchor="middle"
													dominantBaseline="middle"
												>
													<tspan
														x={viewBox.cx}
														y={viewBox.cy}
														className="fill-foreground text-3xl font-bold"
													>
														{totalspendings.toLocaleString()}
													</tspan>
													<tspan
														x={viewBox.cx}
														y={
															(viewBox.cy || 0) +
															24
														}
														className="fill-muted-foreground"
													>
														Total Spend
													</tspan>
												</text>
											);
										}
									}}
								/>
							</Pie>
						</PieChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="flex-col gap-2 text-sm">
					<div className="flex items-center gap-2 font-medium leading-none text-sm">
						Trending up by 5.2% this month{" "}
						<TrendingUp className="h-4 w-4" />
					</div>
					<div className="leading-none text-muted-foreground text-sm">
						Top categories from the last 6 months
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}

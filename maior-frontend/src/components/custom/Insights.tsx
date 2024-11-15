import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectItem,
} from "@/components/ui/select";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { useState } from "react";
import { getAiInsightsData } from "@/services/dashboardService";
import { LoadingSpinner } from "./Spinner";
import InsightText from "./InsightText";

const months = [
	"City Spending Analysis",
	"Spending Categories Breakdown",
	"Restaurant Spending Insights",
	"Frequent Merchants and Patterns",
	"Unexpected High Expenditures",
	"Top 5 Most Visited Merchants",
	"Average Transaction Amount by Category",
	"Biggest One-Time Purchases",
	"Suggested Savings Areas",
	"Comparing Spending to Historical Trends",
	"Recurring Charges Analysis",
	"Seasonal Spending Patterns",
	"Travel Spending Analysis",
];

export default function Insights() {
	const [selectedPrompt, setSelectedPrompt] = useState("-1");
	const [result, setResult] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = async (value: string) => {
		setSelectedPrompt(value);
		setLoading(true);
		try {
			const response = await getAiInsightsData(selectedPrompt);
			setResult(response.response);
			setLoading(false);
		} catch {
			setResult("Something went Wrong! Try again later.");
			setLoading(false);
		}
	};

	return (
		<Card className="h-[640px]">
			<CardHeader>
				<div className="flex justify-between">
					<div>
						{" "}
						<CardTitle className="text-md">Insights</CardTitle>
						<CardDescription className="text-sm">
							By ChatGpt
						</CardDescription>
					</div>
					<Select value={selectedPrompt} onValueChange={handleChange}>
						<SelectTrigger className="w-[320px]">
							<SelectValue placeholder="Generate insights">
								{selectedPrompt === "-1"
									? "Generate insights"
									: months[parseInt(selectedPrompt)]}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{months.map((month, index) => (
									<SelectItem
										key={index}
										value={index.toString()}
									>
										{month}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent className="space-y-10 overflow-y-auto h-[525px] pt-4 text-sm">
				{!loading && <InsightText result={result}/>}
				{loading && (
					<div className="h-full w-full flex justify-center items-center">
						<LoadingSpinner />
					</div>
				)}
			</CardContent>
		</Card>
	);
}

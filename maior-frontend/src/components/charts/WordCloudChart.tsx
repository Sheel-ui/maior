import WordCloud from "./base/WordCloud";
import { getGraphData } from "@/services/dashboardService";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

export default function WordCloudChart() {
	const [chartData, setChartData] = useState(null);
	const [selectedRange, setSelectedRange] = useState("week");
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getGraphData(`word/${selectedRange}`);
				setChartData(result);
			} catch (error) {
				console.error("Error fetching line graph data:", error);
			}
		};

		fetchData();
	}, [selectedRange]);
	return (
		<div className="relative">
			<div className="absolute right-2 top-2">
				<Select value={selectedRange} onValueChange={setSelectedRange}>
					<SelectTrigger className="w-[140px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="week">Last Week</SelectItem>
							<SelectItem value="month">Last Month</SelectItem>
							<SelectItem value="quarter">Last 3 months</SelectItem>
							<SelectItem value="half">Last 6 months</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{chartData && <WordCloud data={chartData} />}
		</div>
	);
}

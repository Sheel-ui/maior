import { useState, useEffect } from "react";
import { getGraphData } from "@/services/dashboardService";
import { BarGraph } from "./base/BarGraph";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function BarGraphChart() {
	const [chartData, setChartData] = useState([]);
    const [selectedRange, setSelectedRange] = useState("month"); 

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getGraphData(`total-spend/${selectedRange}`);
				setChartData(result);
			} catch (error) {
				console.error("Error fetching line graph data:", error);
			}
		};
		fetchData();
	}, [selectedRange]);

	// Only render TimeSeries if chartData is not null
	return (
		<div className="relative">
			<div className="absolute right-6 top-2">
				<Select value={selectedRange} onValueChange={setSelectedRange}>
					<SelectTrigger className="w-[100px]">
						<SelectValue placeholder="month" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="month">Monthly</SelectItem>
							<SelectItem value="week">Weekly</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{chartData && <BarGraph chartData={chartData} /> }
		</div>
	);
}

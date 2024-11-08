import { getGraphData } from "@/services/dashboardService";
import { useState, useEffect } from "react";
import { PieGraph } from "./base/PieGraph";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function PieGraphChart() {
	const [chartData, setChartData] = useState(null);
	const [selectedRange, setSelectedRange] = useState("11");
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getGraphData(`category/${selectedRange}`);
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
					<SelectTrigger className="w-[70px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="5">May</SelectItem>
							<SelectItem value="6">Jun</SelectItem>
							<SelectItem value="7">Jul</SelectItem>
							<SelectItem value="8">Aug</SelectItem>
							<SelectItem value="9">Sept</SelectItem>
							<SelectItem value="10">Oct</SelectItem>
							<SelectItem value="11">Nov</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{chartData && <PieGraph chartData={chartData} />}
		</div>
	);
}

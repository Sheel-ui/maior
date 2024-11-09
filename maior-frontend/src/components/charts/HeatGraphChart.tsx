import HeatGraph from "./base/HeatGraph";
import { getGraphData } from "@/services/dashboardService";
import { useState, useEffect } from "react";
import { DatePicker } from "../custom/DatePicker";

export default function HeatGraphChart() {
	const [chartData, setChartData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getGraphData("heatmap");
				setChartData(result);
			} catch (error) {
				console.error("Error fetching line graph data:", error);
			}
		};

		fetchData();
	}, []);
	return (
		<div className="relative">
			<DatePicker className="absolute right-2 top-2"/>
			<div>{chartData && <HeatGraph value={chartData} />}</div>
		</div>
	);
}

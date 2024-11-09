import HeatGraph from "./base/HeatGraph";
import { getGraphData } from "@/services/dashboardService";
import { useState, useEffect } from "react";

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
    chartData && <HeatGraph value={chartData}/>
  )
}

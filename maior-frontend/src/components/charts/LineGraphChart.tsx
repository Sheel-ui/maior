import { LineGraph } from "./base/LineGraph";
import { getGraphData } from "@/services/dashboardService";
import { useState, useEffect } from "react";

export default function LineGraphChart() {
	const [chartData, setChartData] = useState([]);
    useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getGraphData("credits");
				setChartData(result);
			} catch (error) {
				console.error("Error fetching line graph data:", error);
			}
		};

		fetchData();
	}, []);
    return (
        chartData && <LineGraph chartData={chartData}/>
      )
}

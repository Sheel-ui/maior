import { getBarGraph } from '@/services/dashboardService';
import { useState, useEffect } from 'react'
import { Bar } from './Bar';

export default function Chart() {
    const [chartData,setChartData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
            const token = localStorage.getItem("token");
			if (!token) {
				console.error("Token not found");
				return;
			}
			try {
				const result = await getBarGraph(token);
                setChartData(result?.data);
				console.log("Fetched data:", result);
			} catch (error) {
				console.error("Error fetching line graph data:", error);
			}
		};

		fetchData();
	}, []);
  return (
    <div>
        {chartData && <Bar chartData={chartData}/>}
    </div>
  )
}

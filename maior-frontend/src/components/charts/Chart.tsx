import { getBarGraph } from '@/services/dashboardService';
import { useState, useEffect } from 'react'
import { Bar } from './Bar';

export default function Chart() {
    const [chartData,setChartData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getBarGraph();
                setChartData(result?.data);
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

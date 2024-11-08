import { useState, useEffect } from "react";
import { getGraphData } from '@/services/dashboardService';
import { TimeSeries } from "./base/TimeSeries";


export default function TimeSeriesChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getGraphData("time-series");
                setChartData(result);
            } catch (error) {
                console.error("Error fetching line graph data:", error);
            }
        };
        fetchData();
    }, []);

    // Only render TimeSeries if chartData is not null
    return chartData ? <TimeSeries chartData={chartData} /> : null;
}

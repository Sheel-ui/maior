import { useState, useEffect } from "react";
import { getGraphData } from '@/services/dashboardService';
import { TimeSeries } from "./base/TimeSeries";


export default function TimeSeriesChart() {
    const [chartData, setChartData] = useState([]);

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

    return (<div>{chartData && <TimeSeries chartData={chartData} /> }</div>)
}

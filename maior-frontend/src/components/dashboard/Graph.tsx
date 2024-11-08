import { Line } from "@/components/charts/Line";
import PieGraphChart from "../charts/PieGraphChart";
import TimeSeriesChart from "../charts/TimeSeriesChart";
import BarGraphChart from "../charts/BarGraphChart";

export default function Graph() {
	return (
		<div className="overflow-y-auto max-h-[calc(100vh-150px)]">
			<div className="grid grid-cols-3 gap-8 px-8 pb-8 ">
				<Line />
				<PieGraphChart />
				<BarGraphChart />
			</div>
			<div className="grid grid-cols-1 px-8 pb-8">
				<TimeSeriesChart />
			</div>	
		</div>
	);
}

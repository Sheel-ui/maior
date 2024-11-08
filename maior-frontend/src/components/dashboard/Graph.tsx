import PieGraphChart from "../charts/PieGraphChart";
import TimeSeriesChart from "../charts/TimeSeriesChart";
import BarGraphChart from "../charts/BarGraphChart";
import RadarGraphChart from "../charts/RadarGraphChart";
import WordCloudChart from "../charts/WordCloudChart";

export default function Graph() {
	return (
		<div className="overflow-y-auto max-h-[calc(100vh-150px)]">
			<div className="grid grid-cols-3 gap-8 px-8 pb-8 ">
				<RadarGraphChart />
				<PieGraphChart />
				<BarGraphChart />
			</div>
			<div className="grid grid-cols-1 px-8 pb-8">
				<TimeSeriesChart />
			</div>	
			<div className="grid grid-cols-3 px-8 pb-8">
				<WordCloudChart />
			</div>	
		</div>
	);
}

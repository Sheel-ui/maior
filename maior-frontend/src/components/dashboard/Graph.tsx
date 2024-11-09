import PieGraphChart from "../charts/PieGraphChart";
import TimeSeriesChart from "../charts/TimeSeriesChart";
import BarGraphChart from "../charts/BarGraphChart";
import RadarGraphChart from "../charts/RadarGraphChart";
import WordCloudChart from "../charts/WordCloudChart";
import HeatGraphChart from "../charts/HeatGraphChart";
import LineGraphChart from "../charts/LineGraphChart";
import BarHorizontalGraphChart from "../charts/BarHorizontalGraphChart";

export default function Graph() {
	return (
		<div className="overflow-y-auto max-h-[calc(100vh-150px)]">
			<div className="grid grid-cols-3 gap-8 px-8 pb-8 ">
				<RadarGraphChart />
				<div className="col-span-2">
					<BarGraphChart />
				</div>
			</div>
			<div className="grid grid-cols-3 gap-8 px-8 pb-8">
				<div className="col-span-2">
					<TimeSeriesChart />
				</div>
				<PieGraphChart />
			</div>
			<div className="grid grid-cols-3 gap-8 px-8 pb-8">
				<div className="col-span-2">
					<BarHorizontalGraphChart />
				</div>
				<LineGraphChart />
			</div>
			<div className="grid grid-cols-3 gap-8 px-8 pb-8">
				<WordCloudChart />
				<div className="col-span-2">
					<HeatGraphChart />
				</div>
			</div>
		</div>
	);
}

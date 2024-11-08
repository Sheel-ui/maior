import { Line } from "@/components/charts/Line";
import Chart from "../charts/Chart";
import { TimeSeries } from "../charts/base/TimeSeries";

export default function Graph() {
	return (
		<div className="overflow-y-auto max-h-[calc(100vh-150px)]">
			<div className="grid grid-cols-3 gap-8 px-8 pb-8 ">
				<Line />
				<Chart />
				<Line />
			</div>
      <div className="grid grid-cols-1 px-8 pb-8">
				<TimeSeries />
			</div>
		</div>
	);
}

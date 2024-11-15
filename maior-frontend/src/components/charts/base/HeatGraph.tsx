import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import HeatMap, { HeatMapValue } from "@uiw/react-heat-map";
import { TrendingUp } from "lucide-react";
import { Tooltip } from "react-tooltip";

interface HeatProps {
	value: HeatMapValue[];
}
const Demo = ({ value }: HeatProps) => {
	return (
		<div>
			<Card className="flex flex-col h-[420px] pb-0">
				<CardHeader className="pb-6">
					<CardTitle className="text-md">Spend Days</CardTitle>
					<CardDescription className="text-sm">
						May - November 2024
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-4">
					<HeatMap
						className="w-full"
						value={value}
						startDate={new Date("2024/05/01")}
						rectSize={18}
						height={220}
						legendCellSize={18}
						legendRender={(props) => {
							const { key, ...restProps } = props; // Destructure to separate `key`
							return (
								<rect key={key} {...restProps} y={170} rx={4} />
							);
						}}
						rectProps={{
							rx: 4,
						}}
						rectRender={(props, data) => {
							const { key, ...restProps } = props; // Destructure to separate `key`
							if (!data.count)
								return <rect key={key} {...restProps} />; // Pass `key` directly
							return (
								<rect
									key={key} // Pass `key` directly
									{...restProps}
									data-tooltip-id="my-tooltip"
									data-tooltip-content={`${data.date.slice(
										5,
										10
									)}: ${data.count || 0}$`}
								/>
							);
						}}
						panelColors={{
							5: "#f8d3c5",
							50: "#f5b7a3",
							100: "#f29b81",
							250: "#ef7f5f",
							500: "#ec634d",
							1250: "#e7583b",
							3500: "#e0412f",
							5000: "#d92a24",
							8000: "#d5191a",
						}}
					/>
				</CardContent>
				<CardFooter className="flex-col items-start gap-2 text-sm pb-6">
					<div className="flex gap-2 font-medium leading-none">
						Trending up by 5.2% this month{" "}
						<TrendingUp className="h-4 w-4" />
					</div>
					<div className="leading-none text-muted-foreground">
						Showing top categories from the last 6 months
					</div>
				</CardFooter>
			</Card>
			<Tooltip id="my-tooltip" style={{ borderRadius: "10px" }} />
		</div>
	);
};
export default Demo;

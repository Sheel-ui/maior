import { GenGraph } from "../charts/base/GenGraph";
import { GenTable } from "../charts/base/GenTable";
import GenMessage from "./GenMessage";

interface GenerateGraphProps {
	type: "graph" | "table" | "error" | "";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
}

export default function GenerateGraph({ type, data }: GenerateGraphProps) {
  console.log(type,data)
	return (
		<div>
			{!type ? (
				<GenMessage message="" />
			) : type === "graph" ? (
				<GenGraph chartData={data} />
			) : type === "table" ? (
				<GenTable data={data} />
			) : (
				<GenMessage message="Couldn't understant the query :(" />
			)}
		</div>
	);
}

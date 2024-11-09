import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import GenerateGraph from "./GenerateGraph";
import { getAiGraphData } from "@/services/dashboardService";
import { LoadingSpinner } from "./Spinner";

export default function Query() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<{
		type: "graph" | "table" | "error" | "";
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data: any;
	}>({
		type: "",
		data: null,
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent form from refreshing the page

		const formData = new FormData(event.currentTarget);
		const query = formData.get("query") as string;
		try {
			setLoading(true);
			const response = await getAiGraphData(query);
			if (response) {
				setResult({
					type: response.type,
					data: response.data,
				});
			} else {
				setResult({
					type: "",
					data: [],
				});
			}
			setLoading(false);
		} catch (error) {
			console.error("Error fetching graph data:", error);
			setResult({
				type: "",
				data: [],
			});
			setLoading(false);
		}
	};

	return (
		<div className="">
			<div className="flex space-x-4 mb-8">
				<form onSubmit={handleSubmit} className="flex space-x-4">
					<Input
						className="w-[450px]"
						type="text"
						name="query"
						placeholder="Ask anything..."
					/>
					<Button type="submit">Submit</Button>
				</form>
			</div>

			{!loading && (
				<GenerateGraph type={result.type} data={result.data} />
			)}
			{loading && (
				<div className="h-full w-full flex justify-center items-center">
					<LoadingSpinner />
				</div>
			)}
		</div>
	);
}

import { Tag, TagCloud } from "react-tagcloud";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface WordProps {
	data: Tag[];
}

export default function WordCloud({ data }: WordProps) {
	return (
		<div className="h-[420px]">
			<Card className="flex flex-col h-full pb-8">
				<CardHeader className="pb-6">
					<CardTitle className="text-md">Top Categories</CardTitle>
					<CardDescription className="text-sm">
						May - November 2024
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 pb-0 flex justify-center items-center">
					<TagCloud
						colorOptions={{ luminosity: "dark" }}
						className="w-64 h-52"
						minSize={12}
						maxSize={35}
						tags={data}
					/>
				</CardContent>
				<CardFooter className="flex-col items-start gap-2 text-sm py-8">
					<div className="flex gap-2 font-medium leading-none">
						Trending up by 5.2% this month{" "}
						<TrendingUp className="h-4 w-4" />
					</div>
					<div className="leading-none text-muted-foreground">
						Showing top categories from the last 6 months
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}

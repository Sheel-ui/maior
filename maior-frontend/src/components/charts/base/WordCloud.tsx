import { Tag, TagCloud } from "react-tagcloud";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface WordProps {
	data: Tag[];
}

export default function WordCloud({ data }: WordProps) {
	
	return (
		<div className="h-[360px]">
			<Card className="flex flex-col h-full pb-8">
				<CardHeader className="pb-6">
					<CardTitle className="text-md">Top Category</CardTitle>
					<CardDescription className="text-sm">
						May - November 2024
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 pb-0 flex justify-center items-center">
					<TagCloud
						colorOptions={{ luminosity: "dark" }}
						className="w-64"
						minSize={12}
						maxSize={35}
						tags={data}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

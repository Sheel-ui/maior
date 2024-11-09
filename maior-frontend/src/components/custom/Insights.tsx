import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function Insights() {
	return (
		<Card className="h-[640px]">
			<CardHeader>
				<CardTitle className="text-md">Insights</CardTitle>
				<CardDescription className="text-sm">
					By ChatGpt
				</CardDescription>
			</CardHeader>
            <CardContent className="space-y-10 overflow-y-auto h-[525px]">
            </CardContent>
		</Card>
	);
}

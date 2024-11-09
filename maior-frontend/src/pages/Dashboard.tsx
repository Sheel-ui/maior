import SideNav from "@/components/navbar/SideNav";
import Nav from "@/components/navbar/Nav";
import Badge from "@/components/custom/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Graph from "@/components/dashboard/Graph";
import Llm from "@/components/dashboard/Llm";
import { useEffect, useState } from "react";
import { getAccountId } from "@/services/dashboardService";
import Error from "@/components/custom/Error";


export default function Dashboard() {
	const [accountDetails, setAccountDetails] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAccountDetails = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				setError(true);
				setLoading(false);
				return;
			}
			try {
				const accountId = await getAccountId(token);
				setAccountDetails(accountId);
				setLoading(false);
			} catch {
				setError(true);
				setLoading(false);
			}
		};

		fetchAccountDetails();
	}, []);

	return (
		<div className="flex h-screen min-w-screen relative">
			<SideNav />
			<div className="flex-1">
				<Nav />
				{loading ? (
					<div>Loading</div>
				) : error ? (
					<Error />
				) : (
					<div>
						<Badge accountId={accountDetails}/>
						<Tabs defaultValue="graphs">
							<TabsList className="m-8 mb-4 mt-6">
								<TabsTrigger className="w-32" value="graphs">
									Graphs
								</TabsTrigger>
								<TabsTrigger className="w-32" value="llm">
									LLM
								</TabsTrigger>
							</TabsList>
							<TabsContent value="graphs">
								<Graph />
							</TabsContent>
							<TabsContent value="llm">
								<Llm />
							</TabsContent>
						</Tabs>
					</div>
				)}
			</div>
		</div>
	);
}

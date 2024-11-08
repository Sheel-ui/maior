import SideNav from "@/components/navbar/SideNav";
import Nav from "@/components/navbar/Nav";
import Badge from "@/components/custom/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Graph from "@/components/dashboard/Graph";
import Llm from "@/components/dashboard/Llm";

export default function Dashboard() {
	return (
		<div className="flex h-screen min-w-screen relative">
			<SideNav />
			<div className="flex-1">
				<Nav />
				<Badge />
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
		</div>
	);
}

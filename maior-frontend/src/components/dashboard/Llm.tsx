import Insights from "../custom/Insights";
import Query from "../custom/Query";
import { FlaskConical } from "lucide-react";

export default function Llm() {
  return (
		<div className="grid grid-cols-2 gap-8 px-8 pb-8 relative">
			<div className="absolute right-10 -top-14 text-sm text-white bg-primary px-2 pr-4 py-1 rounded-md flex justify-center items-center">
				<FlaskConical className="h-4"></FlaskConical>
				<span>Experimental</span>
			</div>
			<Query />
			<Insights />
		</div>
  )
}

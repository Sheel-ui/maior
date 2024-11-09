import Insights from "../custom/Insights";
import Query from "../custom/Query";

export default function Llm() {
  return (
		<div className="grid grid-cols-2 gap-8 px-8 pb-8">
			<Query />
			<Insights />
		</div>
  )
}

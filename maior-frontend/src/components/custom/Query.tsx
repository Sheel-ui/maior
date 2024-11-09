import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import GenerateGraph from "./GenerateGraph";

export default function Query() {
	const [query, setQuery] = useState("");
    const [data,setData] = useState("");

    const handleSubmit = () => {
        setData(query);
    }

	return (
		<div className="">
			<div className="flex space-x-4 mb-8">
				<Input
					type="text"
					placeholder="Ask anything..."
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button onClick={handleSubmit}>Submit</Button>
			</div>

            <GenerateGraph message={data}/>
        </ div>
	);
}

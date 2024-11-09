import { TypewriterEffect } from "../ui/typewriter-effect";

interface InsightTextProps {
	result: string;
}

export default function InsightText({ result }: InsightTextProps) {
    if(result=="") return <></>
    function transform(input: string): { text: string }[] {
        return input.split(" ").map(word => ({ text: word, className: "text-base font-normal" }));
    }

	return (
		<div>
			<TypewriterEffect words={transform(result)} />
		</div>
	);
}

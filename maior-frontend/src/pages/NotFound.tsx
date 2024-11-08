import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="min-h-screen min-w-screen flex justify-center items-center">
			<div className="space-y-6 text-center">
				<p className="font-bold text-6xl">404</p>
				<p className="text-muted-foreground">
					Looks like you've ventured into the unknown digital realm.
				</p>
				<Button>
					<Link to="/dashboard">Return to website</Link>
				</Button>
			</div>
		</div>
	);
}

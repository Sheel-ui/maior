import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import Logout from "../custom/Logout";

export default function Nav() {
	const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
		const user = localStorage.getItem("loggedInUser") || "error";
		setLoggedInUser(user);
	}, []);
	return (
		<div className="h-16 border-b mx-6 px-6 flex items-center justify-between">
			<div className="flex space-x-12 text-sm">
				<span className="text-primary font-semibold">Overview</span>
				<span>Products</span>
				<span>Reviews</span>
				<span>Settings</span>
			</div>
			<div className="flex space-x-4 text-sm text-muted-foreground">
				<Input placeholder="Search..." />
				<Avatar>
					<AvatarFallback className="uppercase">
						{loggedInUser.substring(0, 1)}
					</AvatarFallback>
				</Avatar>
				<Logout />
			</div>
		</div>
	);
}

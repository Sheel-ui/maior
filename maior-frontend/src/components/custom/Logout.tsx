import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LoadingSpinner } from "@/components/custom/Spinner";
import { useState } from "react";
import { LogOut } from "lucide-react";

interface LogoutProps {
	text?: string;
}

export default function Logout({ text }: LogoutProps) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleLogout = () => {
		setLoading(true);
		localStorage.removeItem("token");
		localStorage.removeItem("loggedInUser");
		setTimeout(() => {
			setLoading(false);
			navigate("/login", { replace: true });
		}, 1000);
	};
	return (
		<Button
			onClick={handleLogout}
			type="submit"
			className="rounded-md"
			disabled={loading}
		>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className={"flex items-center space-x-4 p-2"}>
					<span className="text-sm">{text}</span>
					<LogOut className="w-5 h-5" />
				</div>
			)}
		</Button>
	);
}

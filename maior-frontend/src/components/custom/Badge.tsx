import { useEffect, useState } from "react";
import { getAccountId } from "@/services/dashboardService";
export default function Badge() {
	const [accountDetails, setAccountDetails] = useState(null);

	useEffect(() => {
		const fetchAccountDetails = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				console.error("Token not found");
				return;
			}
			try {
				const accountId = await getAccountId(token);
				setAccountDetails(accountId);
				console.log("Account details:", accountId);
			} catch (error) {
				console.error(error);
			}
		};

		fetchAccountDetails();
	}, []);
	return (
		<div className="absolute bottom-0 right-0 bg-secondary text-muted-foreground">
			{accountDetails && <div className="text-sm">AccountId: {accountDetails}</div>}
		</div>
	);
}

import { useEffect, useState } from "react";
import { getAccountId } from "@/services/dashboardService";
export default function Badge() {
	const [accountDetails, setAccountDetails] = useState(null);

	useEffect(() => {
		const fetchAccountDetails = async () => {
			try {
				const accountId = await getAccountId();
				setAccountDetails(accountId);
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

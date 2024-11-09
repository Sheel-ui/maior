import Logout from "@/components/custom/Logout";
export default function Error() {
	return (
		<div className="min-h-screen min-w-screen flex justify-center items-center">
			<div className="space-y-6 text-center">
				<p className="font-bold text-6xl">404</p>
				<p className="text-muted-foreground">
					We couldn't retrieve your account.
				</p>
				<Logout text={"Logout"}/>
			</div>
		</div>
	);
}

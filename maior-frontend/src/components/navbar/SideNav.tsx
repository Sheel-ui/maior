import NavItem from "@/components/custom/NavItem";
import {
	Hexagon,
	ChartLine,
	User,
	Gift,
	Search,
	Calendar,
	MessageSquare,
	Bell,
	Settings,
} from "lucide-react";
export default function SideNav() {
	return (
		<div className="border-r h-full w-1/6 px-6">
			<div className="flex items-center space-x-2 h-16 mb-8 border-b">
				<Hexagon />
				<span className="font-semibold">React.js + LLM</span>
			</div>
			<div className="space-y-4">
				<NavItem text="Dashboard" Icon={ChartLine} active={true}/>
				<NavItem text="Profile" Icon={User} />
				<NavItem text="Rewards" Icon={Gift} />
				<NavItem text="Explore" Icon={Search} />
				<NavItem text="Bookings" Icon={Calendar} />
				<NavItem text="Messages" Icon={MessageSquare} />
				<NavItem text="Notifications" Icon={Bell} />
				<NavItem text="Settings" Icon={Settings} />
			</div>
		</div>
	);
}

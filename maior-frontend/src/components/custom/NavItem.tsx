import { LucideIcon } from "lucide-react";

interface NavItemProps {
  text: string;
  Icon: LucideIcon;
  active?: boolean;
}

export default function NavItem({ text, Icon, active = false }: NavItemProps) {
  return (
    <div className={`flex items-center space-x-4 p-2 ${active ? "bg-primary text-white rounded-md" : ""}`}>
      <Icon className="w-5 h-5" />
      <span className="text-sm">{text}</span>
    </div>
  );
}

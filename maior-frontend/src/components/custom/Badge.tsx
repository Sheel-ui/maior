interface BadgeProps {
	accountId: string;
}

export default function Badge({accountId}: BadgeProps) {
	return (
		<div className="absolute bottom-0 right-0 bg-secondary px-2 text-muted-foreground">
			<div className="text-sm">AccountId: {accountId}</div>
		</div>
	);
}

export interface FreelancerProfileWorkHistoryProps {
  items?: React.ReactNode;
  emptyLabel?: string;
}

export default function FreelancerProfileWorkHistory({
  items,
  emptyLabel = "No items",
}: FreelancerProfileWorkHistoryProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-medium">Work history</h3>
      {items ?? (
        <ul className="text-sm">
          <li className="text-slate-600">{emptyLabel}</li>
        </ul>
      )}
    </div>
  );
}

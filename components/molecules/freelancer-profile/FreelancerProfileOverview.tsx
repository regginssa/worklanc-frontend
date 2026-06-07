import { IconButton } from "@/components/atoms";

export interface FreelancerProfileOverviewProps {
  overview: string;
  onEdit?: () => void;
}

export default function FreelancerProfileOverview({
  overview,
  onEdit,
}: FreelancerProfileOverviewProps) {
  return (
    <div className="flex items-start gap-8">
      <p className="text-sm">{overview}</p>
      {onEdit && (
        <IconButton
          variant="outline"
          icon="mdi:pencil-outline"
          className="p-1!"
          onClick={onEdit}
        />
      )}
    </div>
  );
}

import { IconButton } from "@/components/atoms";
import { CollapsableText } from "@/components/common";

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
      <CollapsableText text={overview} maxLength={500} />
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

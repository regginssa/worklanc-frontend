import { IconButton } from "@/components/atoms";

export interface FreelancerProfileTitleRateProps {
  title: string;
  hourlyRate: number;
  onEditTitle?: () => void;
  onEditRate?: () => void;
  onLink?: () => void;
}

export default function FreelancerProfileTitleRate({
  title,
  hourlyRate,
  onEditTitle,
  onEditRate,
  onLink,
}: FreelancerProfileTitleRateProps) {
  return (
    <div className="flex items-center gap-6 justify-between">
      <div className="flex items-center gap-4 flex-1">
        <h3 className="text-2xl font-medium">{title}</h3>
        {onEditTitle && (
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={onEditTitle}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-lg font-medium">${hourlyRate.toFixed(2)}/hr</span>
        {onEditRate && (
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={onEditRate}
          />
        )}
        {onLink && (
          <IconButton
            variant="outline"
            icon="solar:link-minimalistic-bold"
            className="p-1!"
            onClick={onLink}
          />
        )}
      </div>
    </div>
  );
}

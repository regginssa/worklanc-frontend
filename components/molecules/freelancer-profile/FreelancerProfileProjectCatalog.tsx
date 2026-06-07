import { Button } from "@/components/atoms";

export interface FreelancerProfileProjectCatalogProps {
  description?: string;
  actionLabel?: string;
  onManage?: () => void;
}

export default function FreelancerProfileProjectCatalog({
  description = "Projects are a new way to earn on Worklanc that helps you do more of the work you love to do. Create project offerings that highlight your strengths and attract more clients.",
  actionLabel = "Manage projects",
  onManage,
}: FreelancerProfileProjectCatalogProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-medium">Your project catalog</h3>
      <p className="text-sm">{description}</p>
      {onManage && (
        <Button
          type="outline"
          label={actionLabel}
          size="medium"
          classname="rounded-full! px-5! py-2! text-sm! font-medium!"
          onClick={onManage}
        />
      )}
    </div>
  );
}

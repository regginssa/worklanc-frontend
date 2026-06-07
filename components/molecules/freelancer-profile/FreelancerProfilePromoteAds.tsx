import { Icon } from "@iconify/react";

export type PromoteAdItem = {
  label: string;
  value: string;
  onEdit?: () => void;
};

export interface FreelancerProfilePromoteAdsProps {
  items: PromoteAdItem[];
}

export default function FreelancerProfilePromoteAds({
  items,
}: FreelancerProfilePromoteAdsProps) {
  return (
    <div className="space-y-4 rounded-2xl bg-slate-200 p-6">
      <h3 className="text-2xl font-medium">Promote with ads</h3>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between"
        >
          <div>
            <h4 className="text-lg font-medium">{item.label}</h4>
            <span className="text-sm text-slate-600">{item.value}</span>
          </div>
          {item.onEdit && (
            <button type="button" onClick={item.onEdit} className="cursor-pointer">
              <Icon
                icon="mdi:pencil-outline"
                className="h-5 w-5 text-slate-600"
              />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

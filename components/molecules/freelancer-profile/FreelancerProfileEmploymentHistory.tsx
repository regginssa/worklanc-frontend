import EmploymentHistoryItem, {
  EmploymentHistoryItemType,
} from "@/components/common/EmploymentHistoryItem";
import ProfileSectionActions from "./ProfileSectionActions";

export type FreelancerProfileEmploymentItem = Omit<
  EmploymentHistoryItemType,
  "onEdit" | "onDelete"
> & {
  onEdit?: () => void;
  onRemove?: () => void;
};

export interface FreelancerProfileEmploymentHistoryProps {
  items: FreelancerProfileEmploymentItem[];
  onAdd?: () => void;
}

export default function FreelancerProfileEmploymentHistory({
  items,
  onAdd,
}: FreelancerProfileEmploymentHistoryProps) {
  return (
    <div className="space-y-6 rounded-3xl border border-slate-300 p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-medium">Employment history</h3>
        <ProfileSectionActions onAdd={onAdd} />
      </div>

      <ul className="space-y-6">
        {items.map((item, index) => (
          <li key={`${item.company}-${item.title}-${index}`}>
            <EmploymentHistoryItem
              {...item}
              onEdit={item.onEdit}
              onDelete={item.onRemove}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

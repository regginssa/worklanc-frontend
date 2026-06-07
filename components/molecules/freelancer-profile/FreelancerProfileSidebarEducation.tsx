import EducationItem, { EducationItemType } from "@/components/common/EducationItem";
import ProfileSectionActions from "./ProfileSectionActions";

export type FreelancerProfileEducationItem = Omit<
  EducationItemType,
  "onEdit" | "onDelete"
> & {
  onEdit?: () => void;
  onRemove?: () => void;
};

export interface FreelancerProfileSidebarEducationProps {
  items: FreelancerProfileEducationItem[];
  onAdd?: () => void;
}

export default function FreelancerProfileSidebarEducation({
  items,
  onAdd,
}: FreelancerProfileSidebarEducationProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Education</h3>
        <ProfileSectionActions onAdd={onAdd} />
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item, index) => (
          <li key={`${item.school}-${index}`}>
            <EducationItem
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

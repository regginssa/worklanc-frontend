import { cn } from "@/lib/utils";
import SkillsGroup from "../SkillsGroup";
import ProfileSectionActions from "./ProfileSectionActions";

export interface FreelancerProfileSkillsListProps {
  id?: string;
  className?: string;
  title?: string;
  skills: string[];
  matchedSkills?: string[];
  max?: number;
  onEdit?: () => void;
  onRemove?: () => void;
}

export default function FreelancerProfileSkillsList({
  id = "skills",
  className,
  title = "Skills",
  skills,
  matchedSkills,
  max,
  onEdit,
  onRemove,
}: FreelancerProfileSkillsListProps) {
  return (
    <section
      id={id}
      className={cn(
        "space-y-6 rounded-3xl border border-slate-300 p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex-1 text-2xl font-medium">{title}</h2>
        <ProfileSectionActions onEdit={onEdit} onRemove={onRemove} />
      </div>

      <SkillsGroup skills={skills} matchedSkills={matchedSkills} max={max} />
    </section>
  );
}

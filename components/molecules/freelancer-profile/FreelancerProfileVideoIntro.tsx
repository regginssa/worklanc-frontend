import ProfileSectionActions from "./ProfileSectionActions";

export interface FreelancerProfileVideoIntroProps {
  onAdd?: () => void;
}

export default function FreelancerProfileVideoIntro({
  onAdd,
}: FreelancerProfileVideoIntroProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-medium">Video introduction</h3>
      <ProfileSectionActions onAdd={onAdd} />
    </div>
  );
}

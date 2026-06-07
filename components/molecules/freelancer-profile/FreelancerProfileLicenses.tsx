import ProfileSectionActions from "./ProfileSectionActions";

export interface FreelancerProfileLicensesProps {
  onAdd?: () => void;
}

export default function FreelancerProfileLicenses({
  onAdd,
}: FreelancerProfileLicensesProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-medium">Licenses</h3>
      <ProfileSectionActions onAdd={onAdd} />
    </div>
  );
}

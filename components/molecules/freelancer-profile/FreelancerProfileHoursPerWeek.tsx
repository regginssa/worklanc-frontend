import ProfileSectionActions from "./ProfileSectionActions";

export interface FreelancerProfileHoursPerWeekProps {
  hours: string;
  contractPreference?: string;
  onEdit?: () => void;
}

export default function FreelancerProfileHoursPerWeek({
  hours,
  contractPreference = "No contract-to-hire preference set",
  onEdit,
}: FreelancerProfileHoursPerWeekProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Hours per week</h3>
        <ProfileSectionActions onEdit={onEdit} />
      </div>
      <div className="mt-4 text-sm">
        <p>{hours}</p>
        <p className="mt-1 text-slate-600">{contractPreference}</p>
      </div>
    </div>
  );
}

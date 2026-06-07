import ProfileSectionActions from "./ProfileSectionActions";

export type FreelancerProfileLanguage = {
  name: string;
  level: string;
};

export interface FreelancerProfileLanguagesProps {
  languages: FreelancerProfileLanguage[];
  onAdd?: () => void;
  onEdit?: () => void;
}

export default function FreelancerProfileLanguages({
  languages,
  onAdd,
  onEdit,
}: FreelancerProfileLanguagesProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Languages</h3>
        <ProfileSectionActions onAdd={onAdd} onEdit={onEdit} />
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {languages.map((language) => (
          <li key={language.name} className="text-slate-600">
            <span className="font-medium text-slate-900">{language.name}: </span>
            {language.level}
          </li>
        ))}
      </ul>
    </div>
  );
}

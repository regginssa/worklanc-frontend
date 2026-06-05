export default function SkillsGroup({
  skills,
  matchedSkills,
  max = 4,
}: {
  skills: string[];
  matchedSkills?: string[];
  max?: number;
}) {
  const allMatched = matchedSkills?.every((skill) => skills.includes(skill));

  return (
    <ul className="flex items-center flex-wrap gap-2">
      {skills.slice(0, max).map((skill) => (
        <li
          key={skill}
          className={`py-0.5 px-2 rounded-md ${
            matchedSkills?.includes(skill) ? "bg-blue-200" : "bg-slate-200"
          } text-sm cursor-pointer`}
        >
          {skill}
        </li>
      ))}

      {skills.length > max && (
        <li
          className={`py-0.5 px-2 rounded-md ${
            allMatched ? "bg-blue-200" : "bg-slate-200"
          } text-sm cursor-pointer`}
        >
          +{skills.length - max}
        </li>
      )}
    </ul>
  );
}

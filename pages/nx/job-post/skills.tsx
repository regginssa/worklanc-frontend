import { AutoCompleteSelector } from "@/components/atoms";
import { JobPostLayout } from "@/components/layouts";
import { useJobPost } from "@/hooks/useJobPost";
import { MOCK_SKILLS, MockSkill } from "@/static/data/mock-skills";
import { validateSkills } from "@/utils/jobValidation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function Skills() {
  const router = useRouter();
  const { uid, job, isLoading, saving, saveStep, goBack } = useJobPost();
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState<MockSkill[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (!uid) router.replace("/nx/job-post/welcome");
  }, [router.isReady, uid, router]);

  useEffect(() => {
    if (job?.skills?.length) setSkills(job.skills);
  }, [job?.skills]);

  const addSkill = (skill: MockSkill) => {
    if (skills.some((s) => s.value === skill.value)) return;
    if (skills.length >= 10) {
      setError("You can add at most 10 skills");
      return;
    }
    setSkills((prev) => [...prev, skill]);
    setError(null);
  };

  const handleNext = async () => {
    const validationError = validateSkills(skills);
    if (validationError) {
      setError(validationError);
      return;
    }
    await saveStep({ skills }, "/nx/job-post/duration", "/nx/job-post/skills");
  };

  const handleBack = async () => {
    await goBack({ skills }, "/nx/job-post/title", "/nx/job-post/skills");
  };

  if (!uid || isLoading) return null;

  return (
    <JobPostLayout
      seo={{
        title: "Skills - Worklanc",
        description: "Skills - Worklanc",
        url: "/nx/job-post/skills",
      }}
      step={2}
      nextLabel={saving ? "Saving..." : "Next: Scope"}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={saving}
    >
      <div className="flex items-start gap-10">
        <div className="flex-1">
          <h1 className="text-3xl font-medium">
            What are the main skills required for your work?
          </h1>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <AutoCompleteSelector
              label="Search skills or add your own"
              placeholder="Enter skills here"
              name="skills"
              options={MOCK_SKILLS}
              value={search}
              selectedValues={skills}
              onChange={setSearch}
              onSelect={addSkill}
              onRemove={(skill) =>
                setSkills((prev) => prev.filter((s) => s.value !== skill.value))
              }
              error={error || undefined}
            />

            <div className="flex items-center gap-2 text-slate-600 mt-2">
              <Icon
                icon="material-symbols-light:stars-outline"
                className="w-4 h-4"
              />
              <span className="text-xs">
                For the best results, add 3-5 skills
              </span>
            </div>
          </div>

          <div className="">
            <label className="text-sm font-medium block mb-4">
              Popular skills for Full Stack Development
            </label>
            <div className="flex flex-wrap gap-2">
              {MOCK_SKILLS.slice(0, 10).map((skill) => (
                <button
                  key={skill.value}
                  type="button"
                  className="text-sm border border-slate-300 cursor-pointer rounded-full px-3 py-1.5 flex items-center gap-2"
                  onClick={() => addSkill(skill)}
                >
                  <Icon icon="mdi:plus" className="w-5 h-5 text-slate-600" />
                  {skill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </JobPostLayout>
  );
}

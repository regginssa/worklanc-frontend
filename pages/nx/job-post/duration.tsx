import { IconButton, RadioGroup } from "@/components/atoms";
import { JobPostLayout } from "@/components/layouts";
import { useJobPost } from "@/hooks/useJobPost";
import type {
  JobContractToHire,
  JobDuration,
  JobExperienceLevel,
  JobProjectSize,
} from "@/types/job";
import { validateScope } from "@/utils/jobValidation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const sizeOptions = [
  {
    title: "Large",
    description:
      "Longer term or complex initiatives (ex. design and build a full website)",
    value: "large",
  },
  {
    title: "Medium",
    description: "Well-defined projects (ex. a landing page)",
    value: "medium",
  },
  {
    title: "Small",
    description:
      "Quick and straightforward tasks (ex. update text and images on a webpage)",
    value: "small",
  },
];

const durationOptions = [
  { label: "More than 6 months", value: "6+" },
  { label: "3 to 6 months", value: "3-6" },
  { label: "1 to 3 months", value: "1-3" },
];

const levelOptions = [
  {
    title: "Entry",
    description: "Looking for someone relatively new to this field",
    value: "entry",
  },
  {
    title: "Intermediate",
    description: "Looking for substantial experience in this field",
    value: "intermediate",
  },
  {
    title: "Expert",
    description: "Looking for comprehensive and deep expertise in this field",
    value: "expert",
  },
];

const workFormatOptions = [
  {
    title: "Yes, this could become full time",
    description:
      "After a trial period, you can pay a one-time fee to convert the contract.",
    value: "yes",
  },
  { title: "No, not at this time", value: "no" },
];

export default function Duration() {
  const router = useRouter();
  const { uid, job, isLoading, saving, saveStep, goBack } = useJobPost();
  const [size, setSize] = useState<JobProjectSize | null>(null);
  const [duration, setDuration] = useState<JobDuration | null>(null);
  const [level, setLevel] = useState<JobExperienceLevel | null>(null);
  const [workFormat, setWorkFormat] = useState<JobContractToHire | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (!uid) router.replace("/nx/job-post/welcome");
  }, [router.isReady, uid, router]);

  useEffect(() => {
    if (!job) return;
    if (job.projectSize) setSize(job.projectSize);
    if (job.duration) setDuration(job.duration);
    if (job.experienceLevel) setLevel(job.experienceLevel);
    if (job.contractToHire) setWorkFormat(job.contractToHire);
  }, [job]);

  const handleNext = async () => {
    const validationError = validateScope({
      projectSize: size,
      duration,
      experienceLevel: level,
      contractToHire: workFormat,
    });
    if (validationError) {
      setError(validationError);
      return;
    }
    await saveStep(
      {
        projectSize: size!,
        duration: duration!,
        experienceLevel: level!,
        contractToHire: workFormat!,
      },
      "/nx/job-post/location",
      "/nx/job-post/duration",
    );
  };

  const handleBack = async () => {
    await goBack(
      {
        projectSize: size ?? undefined,
        duration: duration ?? undefined,
        experienceLevel: level ?? undefined,
        contractToHire: workFormat ?? undefined,
      },
      "/nx/job-post/skills",
      "/nx/job-post/duration",
    );
  };

  if (!uid || isLoading) return null;

  return (
    <JobPostLayout
      seo={{
        title: "Job details - Worklanc",
        description: "Job details - Worklanc",
        url: "/nx/job-post/duration",
      }}
      step={3}
      nextLabel={saving ? "Saving..." : "Next: Location"}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!size || !duration || !level || !workFormat || saving}
    >
      <div className="flex items-start gap-10">
        <div className="flex-1">
          <h1 className="text-3xl font-medium">
            Next, estimate the scope of your work.
          </h1>
          <p className="text-sm mt-8">
            Consider the size of your project and the time it will take.
          </p>
        </div>

        <div className="flex-1 space-y-8">
          {error && <p className="text-sm text-red-600">{error}</p>}

          {!size ? (
            <RadioGroup
              options={sizeOptions}
              value={size}
              onChange={(value) => setSize(value as JobProjectSize)}
              name="size"
            />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h4>
                    {sizeOptions.find((option) => option.value === size)?.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {
                      sizeOptions.find((option) => option.value === size)
                        ?.description
                    }
                  </p>
                </div>
                <IconButton
                  variant="outline"
                  icon="mdi:pencil-outline"
                  className="p-1!"
                  onClick={() => setSize(null)}
                />
              </div>

              <div>
                <label className="text-sm">How long will your work take?</label>
                <RadioGroup
                  options={durationOptions.map((dur) => ({
                    title: dur.label,
                    value: dur.value,
                  }))}
                  value={duration}
                  onChange={(value) => setDuration(value as JobDuration)}
                  name="duration"
                  className="mt-4"
                />
              </div>

              <div>
                <label className="text-sm">
                  What level of experience will it need?
                </label>
                <p className="mt-2 text-xs text-slate-600">
                  This won't restrict any proposals, but helps match expertise to
                  your budget.
                </p>
                <RadioGroup
                  options={levelOptions}
                  value={level}
                  onChange={(value) => setLevel(value as JobExperienceLevel)}
                  name="level"
                  className="mt-4"
                />
              </div>

              <div>
                <label className="text-sm">
                  Is this job a contract-to-hire opportunity?
                </label>
                <p className="mt-2 text-xs text-slate-600">
                  This helps set expectations with talent and won't restrict who
                  can submit proposals.
                </p>
                <RadioGroup
                  options={workFormatOptions.map((item) => ({
                    title: item.title,
                    value: item.value,
                  }))}
                  value={workFormat}
                  onChange={(value) =>
                    setWorkFormat(value as JobContractToHire)
                  }
                  name="workFormat"
                  className="mt-4"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </JobPostLayout>
  );
}

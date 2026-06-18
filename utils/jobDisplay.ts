import type {
  Job,
  JobContractToHire,
  JobDuration,
  JobExperienceLevel,
  JobProjectSize,
} from "@/types/job";

const PROJECT_SIZE_LABELS: Record<JobProjectSize, string> = {
  large: "Large",
  medium: "Medium",
  small: "Small",
};

const DURATION_LABELS: Record<JobDuration, string> = {
  "6+": "More than 6 months",
  "3-6": "3 to 6 months",
  "1-3": "1 to 3 months",
};

const LEVEL_LABELS: Record<JobExperienceLevel, string> = {
  entry: "Entry level",
  intermediate: "Intermediate level",
  expert: "Expert level",
};

const CONTRACT_LABELS: Record<JobContractToHire, string> = {
  yes: "Contract-to-hire opportunity",
  no: "No contract-to-hire",
};

export const formatScopeSummary = (job: Job) => {
  const parts: string[] = [];
  if (job.projectSize) parts.push(PROJECT_SIZE_LABELS[job.projectSize]);
  if (job.duration) parts.push(DURATION_LABELS[job.duration]);
  if (job.experienceLevel) parts.push(LEVEL_LABELS[job.experienceLevel]);
  if (job.contractToHire) parts.push(CONTRACT_LABELS[job.contractToHire]);
  return parts.join(", ");
};

export const formatLocationSummary = (job: Job) => {
  if (job.locationType === "global") {
    if (!job.locationPreferences?.length) return "Worldwide";
    return `Worldwide (${job.locationPreferences.length} preferences)`;
  }
  if (!job.locationPreferences?.length) return "U.S. only";
  return job.locationPreferences.join(", ");
};

export const formatBudgetSummary = (job: Job) => {
  if (job.budgetType === "hourly") {
    if (job.budgetMin != null && job.budgetMax != null) {
      return `$${Number(job.budgetMin).toFixed(2)} - $${Number(job.budgetMax).toFixed(2)}/hr`;
    }
    return "Hourly rate not set";
  }
  if (job.budgetFixed != null) {
    return `$${Number(job.budgetFixed).toFixed(2)}`;
  }
  return "Budget not set";
};

export const formatCategoryLabel = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const formatSkillsSummary = (job: Job) =>
  job.skills?.map((s) => s.label).join(", ") || "—";

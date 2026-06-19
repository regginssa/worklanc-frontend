import type {
  Job,
  JobContractToHire,
  JobDuration,
  JobExperienceLevel,
  JobProjectSize,
  JobStatus,
} from "@/types/job";

export interface JobCardProps {
  title: string;
  status: JobStatus;
  onFillInDraft?: () => void;
  onVerifyAndPublish?: () => void;
  onGetShortlist?: () => void;
}

const DRAFT_ACTION_ITEMS = ["Edit draft", "Remove draft"] as const;
const PENDING_ACTION_ITEMS = ["Edit draft", "Remove draft"] as const;
const OPEN_ACTION_ITEMS = [
  "View proposals",
  "View job posting",
  "Invite freelancers",
  "Edit posting",
  "Reuse posting",
  "Remove posting",
] as const;

export const getJobStatusLabel = (status: JobStatus): string => {
  switch (status) {
    case "draft":
      return "Draft job post";
    case "pending":
      return "Pending job post";
    case "open":
      return "Open job post";
    case "completed":
      return "Completed job post";
    case "cancelled":
      return "Cancelled job post";
  }
};

export const getJobStatusDescription = (status: JobStatus): string | undefined => {
  switch (status) {
    case "draft":
      return "Add details to your draft";
    case "pending":
      return "Verify and publish your job";
    case "open":
      return "Hire faster with CHRLE using AI-powered recruiting";
    default:
      return undefined;
  }
};

export const getJobActionItems = (status: JobStatus) => {
  switch (status) {
    case "draft":
      return DRAFT_ACTION_ITEMS;
    case "pending":
      return PENDING_ACTION_ITEMS;
    case "open":
      return OPEN_ACTION_ITEMS;
    default:
      return undefined;
  }
};

export const getJobPrimaryAction = (
  status: JobStatus,
  handlers: Pick<
    JobCardProps,
    "onFillInDraft" | "onVerifyAndPublish" | "onGetShortlist"
  >,
) => {
  switch (status) {
    case "draft":
      return {
        label: "Fill in draft",
        type: "outline" as const,
        onClick: handlers.onFillInDraft,
      };
    case "pending":
      return {
        label: "Verify and publish your job",
        type: "primary" as const,
        onClick: handlers.onVerifyAndPublish,
      };
    case "open":
      return {
        label: "Get a shortlist",
        type: "outline" as const,
        onClick: handlers.onGetShortlist,
      };
    default:
      return null;
  }
};

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

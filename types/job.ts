export type JobStatus =
  | "draft"
  | "pending"
  | "open"
  | "completed"
  | "cancelled";

export type JobProjectSize = "large" | "medium" | "small";
export type JobDuration = "6+" | "3-6" | "1-3";
export type JobExperienceLevel = "entry" | "intermediate" | "expert";
export type JobContractToHire = "yes" | "no";
export type JobLocationType = "local" | "global";
export type JobBudgetType = "hourly" | "fixed";

export type JobEnglishLevel =
  | "any_level"
  | "conversational_or_better"
  | "fluent_or_better"
  | "native_or_bilingual_only";

export type JobHoursPerWeek =
  | "more_than_30_hrs_week"
  | "less_than_30_hrs_week"
  | "not_sure";

export type JobTalentType = "no_preference" | "independent" | "agency";

export type JobHireDate =
  | "one_to_three_days"
  | "one_week"
  | "two_weeks"
  | "one_month";

export type JobProfessionalsNeeded = "one_person" | "more_than_one_person";

export type JobSkill = {
  label: string;
  value: string;
};

export type JobAttachment = {
  name: string;
  url?: string;
  size?: number;
  mimeType?: string;
};

export type JobPostStep =
  | "/nx/job-post/title"
  | "/nx/job-post/skills"
  | "/nx/job-post/duration"
  | "/nx/job-post/location"
  | "/nx/job-post/budget"
  | "/nx/job-post/add-description"
  | "/nx/job-post/review";

export interface Job {
  id: number;
  uid: string;
  accountId: number;
  status: JobStatus;
  currentStep: JobPostStep;
  title: string | null;
  categorySlug: string;
  skills: JobSkill[];
  projectSize: JobProjectSize | null;
  duration: JobDuration | null;
  experienceLevel: JobExperienceLevel | null;
  contractToHire: JobContractToHire | null;
  locationType: JobLocationType;
  locationPreferences: string[];
  budgetType: JobBudgetType;
  budgetCurrency: string;
  budgetMin: number | null;
  budgetMax: number | null;
  budgetFixed: number | null;
  description: string | null;
  attachments: JobAttachment[];
  umaRecruiterEnabled: boolean;
  screeningQuestions: string[];
  englishLevel: JobEnglishLevel | null;
  hoursPerWeek: JobHoursPerWeek | null;
  talentType: JobTalentType | null;
  hireDate: JobHireDate | null;
  professionalsNeeded: JobProfessionalsNeeded | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type JobPatch = Partial<{
  title: string;
  categorySlug: string;
  skills: JobSkill[];
  projectSize: JobProjectSize;
  duration: JobDuration;
  experienceLevel: JobExperienceLevel;
  contractToHire: JobContractToHire;
  locationType: JobLocationType;
  locationPreferences: string[];
  budgetType: JobBudgetType;
  budgetCurrency: string;
  budgetMin: number;
  budgetMax: number;
  budgetFixed: number;
  description: string;
  attachments: JobAttachment[];
  umaRecruiterEnabled: boolean;
  screeningQuestions: string[];
  englishLevel: JobEnglishLevel;
  hoursPerWeek: JobHoursPerWeek;
  talentType: JobTalentType;
  hireDate: JobHireDate;
  professionalsNeeded: JobProfessionalsNeeded;
  currentStep: JobPostStep;
  direction: "next" | "back";
}>;

export const JOB_POST_STEPS: JobPostStep[] = [
  "/nx/job-post/title",
  "/nx/job-post/skills",
  "/nx/job-post/duration",
  "/nx/job-post/location",
  "/nx/job-post/budget",
  "/nx/job-post/add-description",
  "/nx/job-post/review",
];

export const JOB_POST_STEP_LABELS: Record<JobPostStep, string> = {
  "/nx/job-post/title": "Title",
  "/nx/job-post/skills": "Skills",
  "/nx/job-post/duration": "Scope",
  "/nx/job-post/location": "Location",
  "/nx/job-post/budget": "Budget",
  "/nx/job-post/add-description": "Description",
  "/nx/job-post/review": "Review",
};

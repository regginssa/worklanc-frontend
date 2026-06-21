import type { ProfileKind } from "@/types/user";

export type BrowseJobClient = {
  companyName: string | null;
  companySize: string | null;
  companySizeLabel: string | null;
  countryCode: string | null;
  city: string | null;
  state: string | null;
  timezone: string | null;
  locationLabel: string | null;
  memberSince: string;
  paymentVerified: boolean;
  jobsPosted: number;
  openJobs: number;
  completedJobs: number;
  hireRate: number;
  totalSpent: number;
  hires: number;
  activeHires: number;
  avgHourlyRatePaid: number | null;
  totalHours: number;
  ratingAverage: number | null;
  reviewCount: number;
};

export type BrowseJobSkill = {
  label: string;
  value: string;
};

export type BrowseJobBase = {
  uid: string;
  title: string;
  description: string | null;
  categorySlug: string;
  skills: BrowseJobSkill[];
  projectSize: string | null;
  duration: string | null;
  durationLabel: string | null;
  experienceLevel: string | null;
  experienceLabel: string | null;
  contractToHire: string | null;
  locationType: "local" | "global";
  locationPreferences: string[];
  budgetType: "hourly" | "fixed";
  budgetCurrency: string;
  budgetMin: number | null;
  budgetMax: number | null;
  budgetFixed: number | null;
  hoursPerWeek: string | null;
  hoursPerWeekLabel: string | null;
  englishLevel: string | null;
  screeningQuestions: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  proposalCount: number;
  interviewingCount: number;
  invitesSent: number;
  unansweredInvites: number;
  requiredConnects: number;
  client: BrowseJobClient;
};

export type BrowseJobListItem = BrowseJobBase;

export type BrowseJobInProgressItem = {
  title: string;
  link: string;
  talentType: ProfileKind;
  talentFirstName: string;
  talentLastName: string;
  fromDate: string;
  toDate?: string;
  budgetType: "fixed" | "hourly";
};

export type BrowseJobClientReview = {
  title: string;
  link: string;
  talentType: ProfileKind;
  talentFirstName: string;
  talentLastName: string;
  hourlyRate?: number;
  fromDate: string;
  toDate?: string;
  budgetType: "fixed" | "hourly";
  talentReview: { rating: number; review: string };
  clientReview: { rating: number; review: string };
  hours?: number;
  billedAmount?: number;
};

export type BrowseJobDetail = BrowseJobBase & {
  attachments: { name: string; url?: string; size?: number; mimeType?: string }[];
  umaRecruiterEnabled: boolean;
  talentType: string | null;
  hireDate: string | null;
  professionalsNeeded: string | null;
  jobsInProgress: BrowseJobInProgressItem[];
  clientReviews: BrowseJobClientReview[];
};

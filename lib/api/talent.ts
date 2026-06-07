import { request } from "./client";
import type {
  EmploymentFormInput,
  LanguageLevel,
  TalentEducation,
  TalentProfile,
} from "@/types/user";

/** Wire shape for `talent_employment` rows sent to the API. */
export type EmploymentInput = Pick<
  EmploymentFormInput,
  "title" | "company" | "isCurrent" | "description"
> & {
  city?: string | null;
  country?: string | null;
  startedAt?: Date | string | null;
  endAt?: Date | string | null;
};

/** Wire shape for `talent_education` rows sent to the API. */
export type EducationInput = Pick<
  TalentEducation,
  | "school"
  | "degree"
  | "fieldOfStudy"
  | "startedYear"
  | "endYear"
  | "description"
>;

export interface LanguageInput {
  name: string;
  level: LanguageLevel;
}

/** Patch payload for an onboarding step or profile update. */
export type TalentProfilePatch = Partial<
  Pick<
    TalentProfile,
    | "title"
    | "overview"
    | "hourlyRate"
    | "experienceLevel"
    | "goal"
    | "workPreference"
    | "visibility"
    | "projectPreference"
    | "photoUrl"
    | "importSource"
    | "videoIntroUrl"
    | "hoursPerWeek"
    | "openToContractToHire"
  >
> & {
  categorySlug?: string | null;
  specialties?: string[];
  skills?: { name: string; skillId?: number }[] | string[];
  employment?: EmploymentInput[];
  education?: EducationInput[];
  languages?: LanguageInput[];
  onboardingStep?: string | null;
  onboardingCompleted?: boolean;
};

const TalentAPI = {
  getProfile: async () => await request("/talent/profile", { method: "GET" }),

  updateProfile: async (body: TalentProfilePatch) =>
    await request("/talent/profile", {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
};

export default TalentAPI;

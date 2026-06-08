import { request } from "./client";
import type {
  Certification,
  EmploymentFormInput,
  LanguageLevel,
  OtherExperience,
  TalentEducation,
  TalentProfile,
  Testimonial,
} from "@/types/user";

export type PublicFreelancer = {
  uid: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  city: string | null;
  countryCode: string;
  timezone: string | null;
  phoneVerified: boolean;
  idVerified: boolean;
  isMilitaryVeteran: boolean | null;
  militaryVeteranDeclined: boolean;
  militaryService: MilitaryService | null;
};

export type MilitaryService = {
  country: string;
  countryCode: string;
  branch: string;
  firstName?: string;
  lastName?: string;
  activeDutyStartDate?: string;
  activeDutyEndDate?: string;
};

export type MilitaryVeteranStatus =
  | "served"
  | "not_served"
  | "declined"
  | "unset";

export type MilitaryVeteranSavePayload =
  | { status: "not_served" }
  | { status: "declined" }
  | { status: "unset" }
  | {
      status: "served";
      country: string;
      countryCode: string;
      firstName: string;
      lastName: string;
      activeDutyStartDate: string;
      activeDutyEndDate: string;
      branch: string;
    };

export type FreelancerProfileResponse = {
  profile: TalentProfile;
  freelancer: PublicFreelancer;
  isOwner: boolean;
};

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
  certifications?: Omit<
    Certification,
    "id" | "uid" | "createdAt" | "updatedAt" | "sortOrder"
  >[];
  otherExperiences?: Omit<
    OtherExperience,
    "id" | "uid" | "createdAt" | "updatedAt" | "sortOrder"
  >[];
  testimonialRequest?: Omit<
    Testimonial,
    | "id"
    | "uid"
    | "status"
    | "testimonialText"
    | "createdAt"
    | "updatedAt"
    | "sortOrder"
  >;
  onboardingStep?: string | null;
  onboardingCompleted?: boolean;
};

export type TestimonialRequestInput = NonNullable<
  TalentProfilePatch["testimonialRequest"]
>;

const TalentAPI = {
  getProfile: async () => await request("/talent/profile", { method: "GET" }),

  getFreelancerByUid: async (uid: string): Promise<FreelancerProfileResponse | null> =>
    await request(`/talent/freelancers/${uid}`, { method: "GET" }),

  updateProfile: async (body: TalentProfilePatch) =>
    await request("/talent/profile", {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
};

export default TalentAPI;

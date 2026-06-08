import type { CategoryRef } from "./category";
import type {
  ISODateString,
  ISOTimestampString,
  PublicUid,
  Timestamps,
  WithPublicUid,
} from "./common";
import type { PortfolioSkill, TalentSkill } from "./skill";

export type ProfileKind = "individual" | "agency";
export type ExperienceLevel = "beginner" | "junior" | "senior";
export type GoalType =
  | "main_income"
  | "side_income"
  | "gain_experience"
  | "no_goal_yet";
export type WorkPreference = "find_jobs" | "sell_services";
/** @deprecated Use `WorkPreference`. */
export type WorkPreferenceType = WorkPreference;
export type ProfileVisibility = "public" | "private";
export type ProjectPreference = "both" | "long" | "short";
export type ImportSource = "resume" | "linkedin" | "manual";
export type LanguageLevel = "basic" | "conversational" | "fluent" | "native";
export type HoursPerWeek =
  | "more_than_30"
  | "less_than_30"
  | "as_needed"
  | "none";
export type PortfolioStatus = "published" | "draft";
export type PortfolioAssetType =
  | "image"
  | "pdf"
  | "video"
  | "text"
  | "link"
  | "audio";
export type TestimonialStatus = "pending" | "confirmed" | "declined";

/** UI-only badge; not stored in the database yet. */
export type TalentBadge =
  | "NONE"
  | "TOP_RATED_PLUS"
  | "TOP_RATED"
  | "RISING_TALENT";

/** Row in `talent_languages`. */
export interface TalentLanguage extends Partial<WithPublicUid> {
  id?: number;
  name: string;
  level: LanguageLevel;
  sortOrder?: number;
}

/** Employment form state (dates as `Date` until serialized for the API). */
export interface EmploymentFormInput {
  title: string;
  company: string;
  city: string;
  country: string;
  startedAt: Date;
  endAt: Date;
  isCurrent: boolean;
  description: string;
}

/** Row in `talent_employment`. */
export interface TalentEmployment extends Partial<WithPublicUid> {
  id?: number;
  title: string;
  company: string;
  city: string | null;
  country: string | null;
  startedAt: ISODateString | null;
  endAt: ISODateString | null;
  isCurrent: boolean;
  description: string | null;
  sortOrder?: number;
  createdAt?: ISOTimestampString;
  updatedAt?: ISOTimestampString;
}

/** Row in `talent_education`. */
export interface TalentEducation extends Partial<WithPublicUid> {
  id?: number;
  school: string;
  degree: string | null;
  fieldOfStudy: string | null;
  startedYear: number | null;
  endYear: number | null;
  description: string | null;
  sortOrder?: number;
  createdAt?: ISOTimestampString;
  updatedAt?: ISOTimestampString;
}

/** Row in `talent_certifications`. */
export interface TalentCertification extends Partial<WithPublicUid> {
  id?: number;
  name: string;
  provider: string;
  providerLogoUrl: string | null;
  issuedDate: ISODateString;
  expirationDate: ISODateString | null;
  description: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  sortOrder?: number;
  createdAt?: ISOTimestampString;
  updatedAt?: ISOTimestampString;
}

/** Row in `talent_other_experiences`. */
export interface OtherExperience extends Partial<Timestamps>, Partial<WithPublicUid> {
  id?: number;
  subject: string;
  description: string | null;
  sortOrder?: number;
}

/** Row in `talent_licenses`. */
export interface License extends Partial<Timestamps>, Partial<WithPublicUid> {
  id?: number;
  profession: string;
  jurisdiction: string;
  licenseNumber: string;
  verificationUrl: string | null;
  issuedDate: ISODateString;
  expirationDate: ISODateString | null;
  sortOrder?: number;
}

/** Row in `talent_portfolios` with nested skills and assets. */
export interface Portfolio extends Partial<Timestamps>, Partial<WithPublicUid> {
  id?: number;
  title: string;
  role: string | null;
  description: string | null;
  status: PortfolioStatus;
  sortOrder?: number;
  skills: PortfolioSkill[];
  assets: PortfolioAsset[];
}

/** Row in `talent_portfolio_assets`. */
export interface PortfolioAsset extends Partial<Timestamps>, Partial<WithPublicUid> {
  id?: number;
  assetType: PortfolioAssetType;
  fileUrl: string | null;
  fileName: string | null;
  mimeType: string | null;
  textContent: string | null;
  linkUrl: string | null;
  linkTitle: string | null;
  sortOrder?: number;
}

/** Row in `talent_testimonials`. */
export interface Testimonial extends Partial<Timestamps>, Partial<WithPublicUid> {
  id?: number;
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientLinkedinUrl: string | null;
  clientTitle: string | null;
  projectType: string | null;
  requestMessage: string | null;
  testimonialText: string | null;
  status: TestimonialStatus;
  sortOrder?: number;
}

/** Full talent profile (`talent_profiles` + child collections). */
export interface TalentProfile extends Partial<Timestamps>, WithPublicUid {
  /** Internal PK — do not use in public URLs. */
  id: number;
  accountId: number;
  kind: ProfileKind;
  title: string | null;
  overview: string | null;
  hourlyRate: number | null;
  experienceLevel: ExperienceLevel | null;
  goal: GoalType | null;
  workPreference: WorkPreference | null;
  category: CategoryRef | null;
  specialties: CategoryRef[];
  skills: TalentSkill[];
  visibility: ProfileVisibility;
  projectPreference: ProjectPreference | null;
  photoUrl: string | null;
  importSource: ImportSource | null;
  onboardingCompleted: boolean;
  videoIntroUrl: string | null;
  hoursPerWeek: HoursPerWeek | null;
  openToContractToHire: boolean | null;
  employment: TalentEmployment[];
  education: TalentEducation[];
  languages: TalentLanguage[];
  certifications: TalentCertification[];
  otherExperiences: OtherExperience[];
  licenses: License[];
  portfolios: Portfolio[];
  testimonials: Testimonial[];
}

// ---------------------------------------------------------------------------
// Backward-compatible aliases (prefer the Talent* names in new code)
// ---------------------------------------------------------------------------

/** @deprecated Use `ExperienceLevel`. */
export type ExperienceType = ExperienceLevel;

/** @deprecated Use `TalentLanguage`. */
export type Language = TalentLanguage;

/** @deprecated Use `TalentEmployment`. */
export type Employment = TalentEmployment;

/** @deprecated Use `TalentEducation`. */
export type Education = TalentEducation;

/** @deprecated Use `TalentCertification`. */
export type Certification = TalentCertification;

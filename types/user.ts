import type {
  ISODateString,
  ISOTimestampString,
  PublicUid,
} from "./common";

export type AccountType = "talent" | "client";
export type AuthProvider = "email" | "google" | "apple";
export type ClientCompanySize =
  | "just_me"
  | "2_9"
  | "10_99"
  | "100_499"
  | "500_4999"
  | "5000_plus";

/** Subscription tier on an account (`accounts.membership_tier`). */
export type MembershipTier = "basic" | "plus";

/** Row in `accounts` (public API shape). */
export interface Account {
  id: number;
  uid: PublicUid;
  type: AccountType;
  membershipTier: MembershipTier;
  companyName: string;
  companyWebsite: string;
  companySize: ClientCompanySize | null;
  onboardingCompleted: boolean;
  /** Next onboarding route to resume at; null once onboarding is complete. */
  onboardingStep: string | null;
  createdAt: ISOTimestampString;
}

/** Row in `users` (public API shape). */
export interface User {
  id: number;
  uid: PublicUid;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  signupProvider: AuthProvider;
  googleLinked: boolean;
  appleLinked: boolean;
  emailVerified: boolean;
  phone: string | null;
  phoneVerified: boolean;
  idVerified: boolean;
  /** Null when the user has not declared veteran status yet. */
  isMilitaryVeteran: boolean | null;
  /** True when the user chose not to disclose veteran status. */
  militaryVeteranDeclined: boolean;
  /** Encrypted S3 token — use resolveMediaAssetUrl() to display. */
  avatarUrl: string | null;
  dateOfBirth: ISODateString | null;
  streetAddress: string | null;
  aptSuite: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  timezone: string | null;
  marketingOptIn: boolean;
  connectsBalance: number;
  createdAt: ISOTimestampString;
  accounts: Account[];
}

/** Standard auth response shape returned by signup / signin / oauth. */
export interface AuthResponse {
  token: string;
  user: User;
  /** Backend-computed destination: next incomplete onboarding step or /dashboard. */
  redirectTo: string;
  isNewUser: boolean;
}

// Re-export talent profile types for existing `@/types/user` imports.
export type {
  Certification,
  Education,
  Employment,
  ExperienceLevel,
  ExperienceType,
  GoalType,
  HoursPerWeek,
  ImportSource,
  Language,
  LanguageLevel,
  License,
  OtherExperience,
  Portfolio,
  PortfolioAsset,
  PortfolioAssetFormInput,
  PortfolioAssetType,
  PortfolioForm,
  PortfolioStatus,
  PortfolioTextFormat,
  ProfileKind,
  ProfileVisibility,
  ProjectPreference,
  TalentBadge,
  TalentCertification,
  TalentEducation,
  TalentEmployment,
  TalentLanguage,
  TalentProfile,
  Testimonial,
  TestimonialStatus,
  WorkPreference,
  WorkPreferenceType,
  EmploymentFormInput,
} from "./talent-profile";

export type { CategoryRef } from "./category";
export type { Skill, TalentSkill, PortfolioSkill } from "./skill";

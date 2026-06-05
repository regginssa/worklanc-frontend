export type AccountType = "talent" | "client";
export type AuthProvider = "email" | "google" | "apple";
export type ExperienceType = "beginner" | "junior" | "senior";
export type GoalType =
  | "main_income"
  | "side_income"
  | "gain_experience"
  | "no_goal_yet";
export type WorkPreferenceType = "find_jobs" | "sell_services";
export type ProfileKind = "individual" | "agency";
export type ProfileVisibility = "public" | "private";
export type ProjectPreference = "both" | "long" | "short";
export type ImportSource = "resume" | "linkedin" | "manual";
export type LanguageLevel = "basic" | "conversational" | "fluent" | "native";
export type TalentBadge =
  | "NONE"
  | "TOP_RATED_PLUS"
  | "TOP_RATED"
  | "RISING_TALENT";
export type Language = {
  name: string;
  level: LanguageLevel;
};
export type Employment = {
  title: string;
  company: string;
  location: {
    city: string;
    country: string;
  };
  startedAt: Date;
  endAt: Date;
  isCurrent: boolean;
  description: string;
};

export type Education = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startedAt: number | null;
  endAt: number | null;
  description: string;
};

// A category/subcategory reference (name + slug).
export interface CategoryRef {
  name: string;
  slug: string;
}

export interface Skill {
  id?: number;
  name: string;
}

// Freelancer profile data. Lives on a talent account (not on `users`) so a
// user can hold both a talent and a client account, and a talent account can
// expose both an individual and an agency profile.
export interface TalentProfile {
  id: number;
  accountId: number;
  kind: ProfileKind;
  title: string | null;
  overview: string | null;
  hourlyRate: number | null;
  experienceLevel: ExperienceType | null;
  goal: GoalType | null;
  workPreference: WorkPreferenceType | null;
  category: CategoryRef | null;
  specialties: CategoryRef[];
  skills: Skill[];
  visibility: ProfileVisibility;
  projectPreference: ProjectPreference | null;
  photoUrl: string | null;
  importSource: ImportSource | null;
  employment: Employment[];
  education: Education[];
  languages: Language[];
  onboardingCompleted: boolean;
  createdAt: string;
}

// A talent/client account belonging to a single user. A user can hold one
// talent and one client account at the same time (just like Upwork).
export interface Account {
  id: number;
  type: AccountType;
  onboardingCompleted: boolean;
  // Next onboarding route to resume at; null once onboarding is complete.
  onboardingStep: string | null;
  createdAt: string;
}

// The login identity. Auth data + the accounts owned by this identity.
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  // How the user originally signed up.
  signupProvider: AuthProvider;
  // Whether a social provider is linked to this identity.
  googleLinked: boolean;
  appleLinked: boolean;
  emailVerified: boolean;
  phone: string | null;
  phoneVerified: boolean;
  // Identity-level personal / contact details, shared across all accounts.
  dateOfBirth: string | null;
  streetAddress: string | null;
  aptSuite: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  timezone: string | null;
  marketingOptIn: boolean;
  createdAt: string;
  accounts: Account[];
}

// Standard auth response shape returned by signup / signin / oauth.
export interface AuthResponse {
  token: string;
  user: User;
  // Backend-computed destination: next incomplete onboarding step or /dashboard.
  redirectTo: string;
  isNewUser: boolean;
}

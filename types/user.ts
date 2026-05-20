export type AccountType = "client" | "talent";
export type SigninOption = "email" | "google" | "apple";
export type ExperienceType = "beginner" | "junior" | "senior";
export type GoalType =
  | "main_income"
  | "side_income"
  | "gain_experience"
  | "no_goal_yet";
export type WorkPreferenceType = "find_jobs" | "sell_services";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  accountType: AccountType;
  signinOption: SigninOption;
  googleId: string | null;
  appleId: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
}

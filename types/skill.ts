import type { ISOTimestampString, WithPublicUid } from "./common";

/** Row in the `skills` catalogue table. */
export interface Skill {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: ISOTimestampString;
  updatedAt: ISOTimestampString;
}

/** Row in `talent_skills`. */
export interface TalentSkill extends WithPublicUid {
  id: number;
  skillId: number | null;
  name: string;
  sortOrder: number;
}

/** Row in `talent_portfolio_skills`. */
export interface PortfolioSkill extends WithPublicUid {
  id: number;
  skillId: number | null;
  name: string;
  sortOrder: number;
}

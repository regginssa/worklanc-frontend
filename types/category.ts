import type { ISOTimestampString } from "./common";

/** Full row in the `categories` table. */
export interface CategoryRecord {
  id: number;
  parentId: number | null;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: ISOTimestampString;
  updatedAt: ISOTimestampString;
}

/** Subcategory node returned by `GET /categories`. */
export interface CategoryChild {
  name: string;
  slug: string;
}

/** Top-level category with nested children (API tree shape). */
export interface Category {
  name: string;
  slug: string;
  children: CategoryChild[];
}

/** Wrapper shape returned by `GET /categories`. */
export interface CategoryGroup {
  parent: Category;
}

/** Joined category reference embedded on a talent profile. */
export interface CategoryRef {
  name: string;
  slug: string;
}

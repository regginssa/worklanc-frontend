/** ISO-8601 date string (`YYYY-MM-DD`) from Postgres `DATE` columns. */
export type ISODateString = string;

/** ISO-8601 timestamp string from Postgres `TIMESTAMPTZ` columns. */
export type ISOTimestampString = string;

/**
 * Opaque public identifier (32-char hex from `generate_public_uid()`).
 * Use in URLs like `/freelancers/:uid` — never expose internal numeric `id`.
 */
export type PublicUid = string;

/** Internal BIGINT primary key; server-side joins only. */
export interface WithInternalId {
  id: number;
}

/** Public-facing row identity for URLs and external APIs. */
export interface WithPublicUid {
  uid: PublicUid;
}

export interface Timestamps {
  createdAt: ISOTimestampString;
  updatedAt: ISOTimestampString;
}

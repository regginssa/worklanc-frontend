/** ISO-8601 date string (`YYYY-MM-DD`) from Postgres `DATE` columns. */
export type ISODateString = string;

/** ISO-8601 timestamp string from Postgres `TIMESTAMPTZ` columns. */
export type ISOTimestampString = string;

export interface Timestamps {
  createdAt: ISOTimestampString;
  updatedAt: ISOTimestampString;
}

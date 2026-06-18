export type JobStatus =
  | "draft"
  | "pending"
  | "open"
  | "completed"
  | "cancelled";

interface Job {
  id: number;
  clientId: number;
  title: string;
  description: string;
  budgetType: "fixed" | "hourly";
  budgetAmount: number;
  budgetCurrency: string;
  budgetPeriod: "hour" | "day" | "week" | "month" | "year";
  budgetPeriodUnit: "hour" | "day" | "week" | "month" | "year";
  budgetPeriodValue: number;
  createdAt: Date;
  updatedAt: Date;
}

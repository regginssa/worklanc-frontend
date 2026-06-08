import { countries } from "country-data-list";
import type { HoursPerWeek, LanguageLevel } from "@/types/user";
import type { PublicFreelancer } from "@/lib/api/talent";

export const HOURS_PER_WEEK_LABELS: Record<HoursPerWeek, string> = {
  more_than_30: "More than 30 hrs/week",
  less_than_30: "Less than 30 hrs/week",
  as_needed: "As needed - open to offers",
  none: "None",
};

export const LANGUAGE_LEVEL_LABELS: Record<LanguageLevel, string> = {
  basic: "Basic",
  conversational: "Conversational",
  fluent: "Fluent",
  native: "Native or Bilingual",
};

export function formatFreelancerDisplayName(freelancer: PublicFreelancer) {
  return `${freelancer.firstName}${
    freelancer.lastName ? ` ${freelancer.lastName[0]}.` : ""
  }`;
}

export function formatFreelancerLocation(freelancer: PublicFreelancer) {
  const countryName = freelancer.countryCode
    ? countries.all.find((c) => c.alpha2 === freelancer.countryCode)?.name
    : undefined;
  return [freelancer.city, countryName].filter(Boolean).join(", ");
}

export function formatHoursPerWeekLabel(
  hoursPerWeek?: HoursPerWeek | null,
): string {
  if (!hoursPerWeek) return "Not set";
  return HOURS_PER_WEEK_LABELS[hoursPerWeek];
}

export function formatContractToHirePreference(
  openToContractToHire?: boolean | null,
): string {
  if (openToContractToHire === true) {
    return "Open to contract-to-hire";
  }
  if (openToContractToHire === false) {
    return "Not open to contract-to-hire";
  }
  return "No contract-to-hire preference set";
}

export function formatFreelancerLocalTime(timezone?: string | null) {
  if (!timezone) return "";
  return new Date().toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
  });
}

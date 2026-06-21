import type {
  BrowseJobBase,
  BrowseJobClient,
  BrowseJobListItem,
} from "@/types/job-browse";
import { countries, timezones as Timezones } from "country-data-list";
import { City, Country, State } from "country-state-city";
import { formatTimezone } from "@/utils/date";

const REGION_LABELS: Record<string, string> = {
  oceania: "Oceania",
  americas: "Americas",
  asia: "Asia",
  europe: "Europe",
  africa: "Africa",
};

/** Non-ISO codes that may appear in stored preferences. */
const COUNTRY_CODE_ALIASES: Record<string, string> = {
  uk: "GB",
};

const isTimezonePreference = (value: string) => value.includes("/");

const isCountryCode = (value: string) => /^[A-Za-z]{2}$/.test(value);

/** Resolve a stored location preference to a human-readable label. */
export const resolveLocationPreferenceLabel = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const normalized = trimmed.toLowerCase();

  const regionLabel = REGION_LABELS[normalized];
  if (regionLabel) return regionLabel;

  if (isCountryCode(trimmed)) {
    const alpha2 = (
      COUNTRY_CODE_ALIASES[normalized] ?? trimmed.toUpperCase()
    ).toUpperCase();
    const country = countries.all.find((entry) => entry.alpha2 === alpha2);
    if (country?.name) return country.name;
  }

  if (isTimezonePreference(trimmed)) {
    return formatTimezone(trimmed);
  }

  // US state names and other plain-text labels are stored as-is.
  return trimmed;
};

export const formatLocationPreferences = (preferences: string[]) =>
  preferences.map(resolveLocationPreferenceLabel).filter(Boolean).join(", ");

export const getJobPublicUrl = (uid: string) => `/jobs/${uid}`;

export const getJobAbsoluteUrl = (uid: string) => {
  const base =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "https://www.worklanc.com";
  return `${base.replace(/\/$/, "")}/jobs/${uid}`;
};

export const formatPostedAgo = (publishedAt: string | null) => {
  if (!publishedAt) return "Posted recently";

  const date = new Date(publishedAt);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Posted just now";
  if (minutes < 60)
    return `Posted ${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Posted ${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Posted yesterday";
  if (days < 7) return `Posted ${days} days ago`;

  return `Posted on ${date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })}`;
};

export const formatProposalCount = (count: number) => {
  if (count <= 0) return "0";
  if (count < 5) return "Less than 5";
  if (count < 10) return "5 to 10";
  if (count < 20) return "10 to 15";
  if (count < 50) return "15 to 20";
  return "50+";
};

export const formatListBudgetLine = (job: BrowseJobBase) => {
  const parts: string[] = [];

  if (job.budgetType === "hourly") {
    if (job.budgetMin != null && job.budgetMax != null) {
      parts.push(`Hourly: $${job.budgetMin}-$${job.budgetMax}`);
    } else {
      parts.push("Hourly");
    }
  } else if (job.budgetFixed != null) {
    parts.push(`Fixed: $${job.budgetFixed}`);
  }

  if (job.experienceLabel) parts.push(job.experienceLabel);
  if (job.durationLabel) parts.push(`Est. Time: ${job.durationLabel}`);
  if (job.hoursPerWeekLabel) parts.push(job.hoursPerWeekLabel);

  return parts.join(" - ");
};

export const formatLocationRestriction = (job: BrowseJobBase) => {
  if (job.locationType === "global") {
    if (!job.locationPreferences.length) return "Worldwide";
    return `Worldwide (${job.locationPreferences.length} location preferences)`;
  }

  if (!job.locationPreferences.length) {
    return "Only freelancers located in the U.S. may apply.";
  }

  return `Only freelancers located in ${formatLocationPreferences(
    job.locationPreferences,
  )} may apply.`;
};

export const formatJobLocationLabel = (job: BrowseJobBase) => {
  if (job.locationType === "global") {
    return `Worldwide`;
  }
  if (!job.locationPreferences.length) return "U.S. only";
  return formatLocationPreferences(job.locationPreferences);
};

export const formatPreferredLocationQualifications = (job: BrowseJobBase) => {
  if (!job.locationPreferences.length) {
    return job.locationType === "global" ? "Worldwide" : "U.S. only";
  }

  return formatLocationPreferences(job.locationPreferences);
};

export const formatHourlyRateDetail = (job: BrowseJobBase) => {
  if (
    job.budgetType === "hourly" &&
    job.budgetMin != null &&
    job.budgetMax != null
  ) {
    return `$${Number(job.budgetMin).toFixed(2)} - $${Number(
      job.budgetMax
    ).toFixed(2)}`;
  }
  if (job.budgetType === "fixed" && job.budgetFixed != null) {
    return `$${Number(job.budgetFixed).toFixed(2)}`;
  }
  return "Not specified";
};

export const formatProjectType = (job: BrowseJobBase) => {
  if (job.contractToHire === "yes") return "Contract-to-hire opportunity";
  if (job.duration === "6+") return "Ongoing project";
  return "One-time project";
};

export const formatExperienceSubtitle = (level: string | null) => {
  switch (level) {
    case "entry":
      return "I am looking for someone relatively new to this field";
    case "intermediate":
      return "I am looking for a mix of experience and value";
    case "expert":
      return "I am looking for comprehensive expertise";
    default:
      return "";
  }
};

export const formatClientLocationLine = (client: BrowseJobClient) => {
  if (client.countryCode) {
    return (
      countries.all.find(
        (country) =>
          country.alpha2.toLowerCase() === client.countryCode?.toLowerCase()
      )?.name || client.countryCode
    );
  }
  return "Location not specified";
};

const normalizeLocationValue = (value: string) =>
  value.trim().toLowerCase().replace(/\./g, "");

const resolveStateIsoCode = (
  countryCode: string,
  state: string | null
): string | null => {
  if (!state) return null;

  const normalizedState = normalizeLocationValue(state);
  const stateMatch = State.getStatesOfCountry(countryCode).find(
    (entry) =>
      entry.isoCode.toLowerCase() === normalizedState ||
      normalizeLocationValue(entry.name) === normalizedState
  );

  return stateMatch?.isoCode ?? null;
};

const findCityEntry = (
  countryCode: string,
  stateIsoCode: string | null,
  city: string | null
) => {
  if (!city) return null;

  const normalizedCity = normalizeLocationValue(city);
  const cities =
    (stateIsoCode
      ? City.getCitiesOfState(countryCode, stateIsoCode)
      : City.getCitiesOfCountry(countryCode)) ?? [];

  return (
    cities.find(
      (entry) => normalizeLocationValue(entry.name) === normalizedCity
    ) ??
    cities.find((entry) =>
      normalizeLocationValue(entry.name).includes(normalizedCity)
    ) ??
    cities.find((entry) =>
      normalizedCity.includes(normalizeLocationValue(entry.name))
    )
  );
};

const resolveClientCoordinates = (client: BrowseJobClient) => {
  const countryCode = client.countryCode?.toUpperCase();
  if (!countryCode) return null;

  const stateIsoCode = resolveStateIsoCode(countryCode, client.state);
  const cityEntry = findCityEntry(countryCode, stateIsoCode, client.city);

  if (cityEntry) {
    return {
      latitude: Number(cityEntry.latitude),
      longitude: Number(cityEntry.longitude),
    };
  }

  if (stateIsoCode) {
    const stateEntry = State.getStateByCodeAndCountry(
      stateIsoCode,
      countryCode
    );
    if (stateEntry) {
      return {
        latitude: Number(stateEntry.latitude),
        longitude: Number(stateEntry.longitude),
      };
    }
  }

  const countryEntry = Country.getCountryByCode(countryCode);
  if (!countryEntry) return null;

  return {
    latitude: Number(countryEntry.latitude),
    longitude: Number(countryEntry.longitude),
  };
};

const getTimezoneOffsetMinutes = (timezone: string, date = new Date()) => {
  const offsetLabel =
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "longOffset",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT";

  const match = offsetLabel.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) return 0;

  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? 0);

  return sign * (hours * 60 + minutes);
};

const getCountryTimezones = (countryCode: string) => {
  const countryEntry = Country.getCountryByCode(countryCode);
  const countryTimezones =
    countryEntry?.timezones?.map((entry) => entry.zoneName).filter(Boolean) ??
    [];

  if (countryTimezones.length > 0) {
    return countryTimezones;
  }

  return Timezones.getTimezonesByCountry(countryCode) ?? [];
};

export const resolveClientTimezone = (client: BrowseJobClient) => {
  const countryCode = client.countryCode?.toUpperCase();
  if (!countryCode) return null;

  const candidateTimezones = getCountryTimezones(countryCode);
  if (candidateTimezones.length === 0) return null;
  if (candidateTimezones.length === 1) return candidateTimezones[0];

  const coordinates = resolveClientCoordinates(client);
  if (!coordinates) return candidateTimezones[0];

  const expectedOffsetMinutes = (coordinates.longitude / 15) * 60;

  return candidateTimezones.reduce((bestTimezone: string, timezone: string) => {
    const bestDiff = Math.abs(
      getTimezoneOffsetMinutes(bestTimezone) - expectedOffsetMinutes
    );
    const nextDiff = Math.abs(
      getTimezoneOffsetMinutes(timezone) - expectedOffsetMinutes
    );

    return nextDiff < bestDiff ? timezone : bestTimezone;
  });
};

export const formatClientLocalTime = (client: BrowseJobClient) => {
  const timezone = resolveClientTimezone(client);
  if (!timezone) return null;

  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .format(new Date())
      .replace(/\s/g, "")
      .toUpperCase();
  } catch {
    return null;
  }
};

export const formatMemberSince = (memberSince: string) => {
  const date = new Date(memberSince);
  return `Member since ${date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};

export const formatClientHireStats = (client: BrowseJobClient) =>
  `${client.hireRate}% hire rate, ${client.openJobs} open job${
    client.openJobs === 1 ? "" : "s"
  }`;

export const formatClientSpendStats = (client: BrowseJobClient) => {
  if (client.totalSpent > 0) {
    return `$${client.totalSpent.toLocaleString()} total spent`;
  }
  return "$0 total spent";
};

export const formatClientHiresStats = (client: BrowseJobClient) =>
  `${client.hires} hire${client.hires === 1 ? "" : "s"}, ${
    client.activeHires
  } active`;

export const getJobSkills = (job: BrowseJobListItem) =>
  job.skills.map((skill) => skill.label);

export const getJobFeedStatusLabel = () => "Reviewing Proposals";

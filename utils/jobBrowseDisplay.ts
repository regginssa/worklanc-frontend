import type { BrowseJobBase, BrowseJobClient, BrowseJobListItem } from "@/types/job-browse";

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
};

export const getJobPublicUrl = (uid: string) => `/jobs/${uid}`;

export const getJobAbsoluteUrl = (uid: string) => {
  const base = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://www.worklanc.com";
  return `${base.replace(/\/$/, "")}/jobs/${uid}`;
};

export const formatPostedAgo = (publishedAt: string | null) => {
  if (!publishedAt) return "Posted recently";

  const date = new Date(publishedAt);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Posted just now";
  if (minutes < 60) return `Posted ${minutes} minute${minutes === 1 ? "" : "s"} ago`;

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
      parts.push(
        `Hourly: $${job.budgetMin}-$${job.budgetMax}`,
      );
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

  return `Only freelancers located in ${job.locationPreferences.join(", ")} may apply.`;
};

export const formatJobLocationLabel = (job: BrowseJobBase) => {
  if (job.locationType === "global") {
    if (!job.locationPreferences.length) return "Worldwide";
    return `Worldwide (${job.locationPreferences.length} preferences)`;
  }
  if (!job.locationPreferences.length) return "U.S. only";
  return job.locationPreferences.join(", ");
};

export const formatPreferredLocationQualifications = (job: BrowseJobBase) => {
  if (!job.locationPreferences.length) {
    return job.locationType === "global" ? "Worldwide" : "U.S. only";
  }
  return job.locationPreferences.join(", ");
};

export const formatHourlyRateDetail = (job: BrowseJobBase) => {
  if (job.budgetType === "hourly" && job.budgetMin != null && job.budgetMax != null) {
    return `$${Number(job.budgetMin).toFixed(2)} - $${Number(job.budgetMax).toFixed(2)}`;
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
  if (client.locationLabel) return client.locationLabel;
  if (client.countryCode) {
    return COUNTRY_NAMES[client.countryCode] || client.countryCode;
  }
  return "Location not specified";
};

export const formatClientLocalTime = (client: BrowseJobClient) => {
  if (!client.timezone) return null;

  try {
    const time = new Intl.DateTimeFormat("en-US", {
      timeZone: client.timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

    const city = client.city || client.timezone.split("/").pop()?.replace(/_/g, " ");
    return city ? `${city} ${time}` : time;
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
  `${client.hireRate}% hire rate, ${client.openJobs} open job${client.openJobs === 1 ? "" : "s"}`;

export const formatClientSpendStats = (client: BrowseJobClient) => {
  if (client.totalSpent > 0) {
    return `$${client.totalSpent.toLocaleString()} total spent`;
  }
  return "$0 total spent";
};

export const formatClientHiresStats = (client: BrowseJobClient) =>
  `${client.hires} hire${client.hires === 1 ? "" : "s"}, ${client.activeHires} active`;

export const getJobSkills = (job: BrowseJobListItem) =>
  job.skills.map((skill) => skill.label);

export const getJobFeedStatusLabel = () => "Open";

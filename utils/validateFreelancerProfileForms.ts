import type { CertificationFormData } from "@/components/molecules/dialogs/CertificationDialog";
import type { OtherExperienceFormData } from "@/components/molecules/dialogs/OtherExperienceDialog";
import type { LanguageDraft } from "@/hooks/useFreelancerProfilePage";
import type {
  AvailabilityFormData,
} from "@/components/molecules/dialogs/AvailabilityDialog";
import type { Education, LanguageLevel } from "@/types/user";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const TITLE_MIN_LENGTH = 4;
export const TITLE_MAX_LENGTH = 62;
const OVERVIEW_MAX_LENGTH = 5000;
const MAX_SKILLS = 15;
const MAX_HOURLY_RATE = 9999;

export type ValidationResult<T extends string = string> = {
  isValid: boolean;
  errors: Partial<Record<T, string>>;
};

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function isValidLinkedInUrl(url: string): boolean {
  if (!isValidHttpUrl(url)) return false;

  try {
    const host = new URL(url.trim()).hostname.replace(/^www\./, "");
    return host === "linkedin.com" || host.endsWith(".linkedin.com");
  } catch {
    return false;
  }
}

function optionalUrlError(
  value: string | undefined | null,
  fieldLabel = "URL",
): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  if (!isValidHttpUrl(trimmed)) {
    return `Enter a valid ${fieldLabel}`;
  }
  return undefined;
}

function optionalLinkedInUrlError(
  value: string | undefined | null,
): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  if (!isValidLinkedInUrl(trimmed)) {
    return "Enter a valid LinkedIn profile URL";
  }
  return undefined;
}

function isValidDate(value: Date | string | null | undefined): value is Date {
  if (!value) return false;
  const date = value instanceof Date ? value : new Date(value);
  return !Number.isNaN(date.getTime());
}

export function validateTitleForm(title: string): ValidationResult<"title"> {
  const errors: Partial<Record<"title", string>> = {};
  const trimmed = title.trim();

  if (!trimmed) {
    errors.title = "Title is required";
  } else if (trimmed.length < TITLE_MIN_LENGTH) {
    errors.title = `Enter a title with at least ${TITLE_MIN_LENGTH} characters`;
  } else if (trimmed.length > TITLE_MAX_LENGTH) {
    errors.title = `Title must be ${TITLE_MAX_LENGTH} characters or less`;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateHourlyRateForm(
  rate: string | number,
): ValidationResult<"rate"> {
  const errors: Partial<Record<"rate", string>> = {};
  const raw = typeof rate === "number" ? String(rate) : rate.trim();

  if (!raw) {
    errors.rate = "Hourly rate is required";
  } else {
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      errors.rate = "Enter a valid hourly rate greater than 0";
    } else if (parsed > MAX_HOURLY_RATE) {
      errors.rate = `Hourly rate must be ${MAX_HOURLY_RATE} or less`;
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateOverviewForm(
  overview: string,
): ValidationResult<"overview"> {
  const errors: Partial<Record<"overview", string>> = {};
  const trimmed = overview.trim();

  if (!trimmed) {
    errors.overview = "Profile overview is required";
  } else if (trimmed.length > OVERVIEW_MAX_LENGTH) {
    errors.overview = `Overview must be ${OVERVIEW_MAX_LENGTH} characters or less`;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export type EmploymentFormErrors = {
  title?: string;
  company?: string;
  city?: string;
  country?: string;
  startedAt?: string;
  endAt?: string;
};

export function validateEmploymentForm(form: {
  title?: string;
  company?: string;
  location?: { city?: string; country?: string };
  startedAt?: Date | string | null;
  endAt?: Date | string | null;
  isCurrent?: boolean;
}): ValidationResult<keyof EmploymentFormErrors> {
  const errors: EmploymentFormErrors = {};

  if (!form.title?.trim()) {
    errors.title = "Title is required";
  }

  if (!form.company?.trim()) {
    errors.company = "Company is required";
  }

  if (!form.location?.city?.trim()) {
    errors.city = "City is required";
  }

  if (!form.location?.country?.trim()) {
    errors.country = "Country is required";
  }

  if (!isValidDate(form.startedAt)) {
    errors.startedAt = "Start date is required";
  }

  if (!form.isCurrent) {
    if (!isValidDate(form.endAt)) {
      errors.endAt = "End date is required";
    } else if (isValidDate(form.startedAt)) {
      const start = form.startedAt instanceof Date ? form.startedAt : new Date(form.startedAt);
      const end = form.endAt instanceof Date ? form.endAt : new Date(form.endAt);
      if (end < start) {
        errors.endAt = "End date must be after the start date";
      }
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export type EducationFormErrors = {
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  startedYear?: string;
  endYear?: string;
};

export function validateEducationForm(
  form: Education,
): ValidationResult<keyof EducationFormErrors> {
  const errors: EducationFormErrors = {};

  if (!form.school?.trim()) {
    errors.school = "School is required";
  }

  if (!form.degree?.trim()) {
    errors.degree = "Degree is required";
  }

  if (!form.fieldOfStudy?.trim()) {
    errors.fieldOfStudy = "Field of study is required";
  }

  if (form.startedYear == null) {
    errors.startedYear = "Start year is required";
  }

  if (form.endYear == null) {
    errors.endYear = "End year is required";
  } else if (
    form.startedYear != null &&
    form.endYear < form.startedYear
  ) {
    errors.endYear = "End year must be after the start year";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export type CertificationFormErrors = {
  name?: string;
  provider?: string;
  issueDate?: string;
  expirationDate?: string;
  credentialUrl?: string;
};

export function validateCertificationForm(
  form: CertificationFormData,
): ValidationResult<keyof CertificationFormErrors> {
  const errors: CertificationFormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Certification name is required";
  }

  if (!form.provider.trim()) {
    errors.provider = "Provider is required";
  }

  if (!form.issueDate || !isValidDate(form.issueDate)) {
    errors.issueDate = "Issue date is required";
  }

  if (form.expirationDate) {
    if (!isValidDate(form.expirationDate)) {
      errors.expirationDate = "Enter a valid expiration date";
    } else if (isValidDate(form.issueDate)) {
      const issue = form.issueDate instanceof Date ? form.issueDate : new Date(form.issueDate);
      const expiration =
        form.expirationDate instanceof Date
          ? form.expirationDate
          : new Date(form.expirationDate);
      if (expiration < issue) {
        errors.expirationDate = "Expiration date must be after the issue date";
      }
    }
  }

  const credentialUrlError = optionalUrlError(
    form.credentialUrl,
    "certification URL",
  );
  if (credentialUrlError) {
    errors.credentialUrl = credentialUrlError;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

const HOURS_PER_WEEK_VALUES = [
  "more_than_30",
  "less_than_30",
  "as_needed",
  "none",
] as const;

export function validateAvailabilityForm(
  form: AvailabilityFormData,
): ValidationResult<"hoursPerWeek"> {
  const errors: Partial<Record<"hoursPerWeek", string>> = {};

  if (!form.hoursPerWeek) {
    errors.hoursPerWeek = "Select how many hours per week you can work";
  } else if (
    !HOURS_PER_WEEK_VALUES.includes(
      form.hoursPerWeek as (typeof HOURS_PER_WEEK_VALUES)[number],
    )
  ) {
    errors.hoursPerWeek = "Select a valid availability option";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateOtherExperienceForm(
  form: OtherExperienceFormData,
): ValidationResult<"subject"> {
  const errors: Partial<Record<"subject", string>> = {};

  if (!form.subject.trim()) {
    errors.subject = "Subject is required";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export type LanguageFormErrors = {
  englishLevel?: string;
  languages?: string;
  [key: `name-${number}`]: string | undefined;
  [key: `level-${number}`]: string | undefined;
};

export function validateLanguagesForm(
  englishLevel: LanguageLevel | "",
  additionalLanguages: LanguageDraft[],
): ValidationResult<string> {
  const errors: LanguageFormErrors = {};

  if (!englishLevel) {
    errors.englishLevel = "English proficiency is required";
  }

  additionalLanguages.forEach((language, index) => {
    if (!language.name.trim()) {
      errors[`name-${index}`] = "Language name is required";
    }

    if (!language.level) {
      errors[`level-${index}`] = "Proficiency level is required";
    }
  });

  return { isValid: Object.keys(errors).length === 0, errors };
}

/** @deprecated Use validateLanguagesForm instead. */
export function validateLanguageDrafts(
  drafts: LanguageDraft[],
): ValidationResult<string> {
  const english = drafts.find((language) => language.name === "English");
  const additional = drafts.filter((language) => language.name !== "English");

  return validateLanguagesForm(
    (english?.level ?? "") as LanguageLevel | "",
    additional,
  );
}

export function validateSkillsForm(
  skills: { value: string }[],
): ValidationResult<"skills"> {
  const errors: Partial<Record<"skills", string>> = {};

  if (!skills.length) {
    errors.skills = "Add at least one skill";
  } else if (skills.length > MAX_SKILLS) {
    errors.skills = `Must be ${MAX_SKILLS} skills or fewer`;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

export type TestimonialFormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  linkedinUrl?: string;
  message?: string;
};

export function validateTestimonialForm(form: {
  firstName: string;
  lastName: string;
  email: string;
  linkedinUrl: string;
  message: string;
}): ValidationResult<keyof TestimonialFormErrors> {
  const errors: TestimonialFormErrors = {};

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!form.email.trim()) {
    errors.email = "Business email is required";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!form.linkedinUrl.trim()) {
    errors.linkedinUrl = "LinkedIn profile URL is required";
  } else {
    const linkedInError = optionalLinkedInUrlError(form.linkedinUrl);
    if (linkedInError) {
      errors.linkedinUrl = linkedInError;
    }
  }

  if (!form.message.trim()) {
    errors.message = "Message is required";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

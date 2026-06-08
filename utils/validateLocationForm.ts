import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import { countries } from "country-data-list";

export type LocationFormData = {
  birthday: Date | null;
  country: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  /** ISO 3166-1 alpha-2 for the phone input country selector. */
  phoneCountryCode?: string;
  photo?: File | null;
};

export type LocationFormField =
  | "avatar"
  | "birthday"
  | "country"
  | "address"
  | "city"
  | "state"
  | "zip"
  | "phone";

export type LocationFormErrors = Partial<Record<LocationFormField, string>>;

const MIN_AGE = 18;

const resolveCountryCode = (countryName: string): CountryCode | undefined => {
  const code = countries.all.find((c) => c.name === countryName)?.alpha2;
  return code as CountryCode | undefined;
};

const countryLabel = (code: string) =>
  countries.all.find((c) => c.alpha2 === code)?.name || code;

/** Validate phone against the phone input's selected country code (not address country). */
export function validatePhoneForCountry(
  phone: string | undefined,
  phoneCountryCode: string | undefined,
): string | undefined {
  const trimmed = phone?.trim();

  if (!trimmed) {
    return "Phone number is required";
  }

  if (!phoneCountryCode) {
    return "Phone country is required";
  }

  const code = phoneCountryCode as CountryCode;

  if (!isValidPhoneNumber(trimmed, code)) {
    return `Enter a valid phone number for ${countryLabel(code)}`;
  }

  const parsed = parsePhoneNumberFromString(trimmed, code);
  if (parsed?.country && parsed.country !== code) {
    return `Phone number does not match the selected country (${countryLabel(code)})`;
  }

  return undefined;
}

export function validateLocationForm(
  formData: LocationFormData,
  options: { hasSavedAvatar?: boolean } = {},
): { isValid: boolean; errors: LocationFormErrors } {
  const errors: LocationFormErrors = {};
  const hasAvatar = !!formData.photo || !!options.hasSavedAvatar;

  if (!hasAvatar) {
    errors.avatar = "Profile photo is required";
  }

  if (!formData.birthday) {
    errors.birthday = "Date of birth is required";
  } else {
    const dob =
      formData.birthday instanceof Date
        ? formData.birthday
        : new Date(formData.birthday);

    if (Number.isNaN(dob.getTime())) {
      errors.birthday = "Enter a valid date of birth";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const normalizedDob = new Date(dob);
      normalizedDob.setHours(0, 0, 0, 0);

      if (normalizedDob > today) {
        errors.birthday = "Date of birth cannot be in the future";
      } else {
        const minBirthDate = new Date(
          today.getFullYear() - MIN_AGE,
          today.getMonth(),
          today.getDate(),
        );
        if (normalizedDob > minBirthDate) {
          errors.birthday = `You must be at least ${MIN_AGE} years old`;
        }
      }
    }
  }

  if (!formData.country?.trim()) {
    errors.country = "Country is required";
  }

  if (!formData.address?.trim()) {
    errors.address = "Street address is required";
  }

  if (!formData.city?.trim()) {
    errors.city = "City is required";
  }

  if (!formData.state?.trim()) {
    errors.state = "State/Province is required";
  }

  if (!formData.zip?.trim()) {
    errors.zip = "ZIP/Postal code is required";
  }

  const phoneCountryCode =
    formData.phoneCountryCode || resolveCountryCode(formData.country);

  const phoneError = validatePhoneForCountry(formData.phone, phoneCountryCode);
  if (phoneError) {
    errors.phone = phoneError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

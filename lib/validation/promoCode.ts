export const PROMO_CODE_INPUT_PATTERN = /^[A-Za-z0-9_-]*$/;

export function getPromoCodeFormatError(value: string): string | null {
  if (!value) return null;

  if (!PROMO_CODE_INPUT_PATTERN.test(value)) {
    return "Promo code can only contain letters, numbers, hyphens, and underscores.";
  }

  if (value.trim().length > 64) {
    return "Promo code must be 64 characters or fewer.";
  }

  return null;
}

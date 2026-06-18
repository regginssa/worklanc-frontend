export { getVerifiedUserDestination } from "@/utils/onboardingRedirect";

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function formatName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return capitalize(parts[0]) + ".";
  }

  if (parts.length === 2) {
    return `${capitalize(parts[0])} ${capitalize(parts[1][0])}.`;
  }

  const lastInitial = capitalize(parts[2][0]) + ".";
  return `${capitalize(parts[0])} ${capitalize(parts[1])} ${lastInitial}`;
}

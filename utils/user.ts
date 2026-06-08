import type { User } from "@/types/user";

/** Where to send a user after email verification (or when landing on please-verify). */
export function getVerifiedUserDestination(user: User): string | null {
  if (!user.emailVerified) return null;

  const talent = user.accounts.find((account) => account.type === "talent");
  const client = user.accounts.find((account) => account.type === "client");

  if (talent?.onboardingCompleted) return "/nx/find-work";

  // Client onboarding is not implemented; client accounts start completed.
  if (client) return "/nx/client/dashboard";

  return null;
}

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

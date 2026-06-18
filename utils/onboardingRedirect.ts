import type { Account, AccountType, User } from "@/types/user";

const CLIENT_ONBOARDING_START = "/nx/client-onboarding/company-size";
const TALENT_ONBOARDING_START = "/nx/create-profile";

export function getIncompleteAccount(
  accounts: Account[] = [],
  preferredType?: AccountType,
): Account | undefined {
  if (preferredType) {
    const preferred = accounts.find(
      (account) => account.type === preferredType && !account.onboardingCompleted,
    );
    if (preferred) return preferred;
  }

  return accounts.find((account) => !account.onboardingCompleted);
}

export function getOnboardingDestinationForAccount(
  account: Account | undefined,
): string | null {
  if (!account || account.onboardingCompleted) return null;

  if (account.type === "client") {
    return account.onboardingStep || CLIENT_ONBOARDING_START;
  }

  if (account.type === "talent") {
    return account.onboardingStep || TALENT_ONBOARDING_START;
  }

  return null;
}

export function getOnboardingDestination(
  user: User | null | undefined,
  preferredType?: AccountType,
): string | null {
  if (!user) return null;

  const incomplete = getIncompleteAccount(user.accounts, preferredType);
  const destination = getOnboardingDestinationForAccount(incomplete);
  if (destination) return destination;

  const client = user.accounts.find((account) => account.type === "client");
  const talent = user.accounts.find((account) => account.type === "talent");

  if (talent?.onboardingCompleted) return "/nx/find-work";
  if (client) return "/nx/client/dashboard";

  return null;
}

export function getVerifiedUserDestination(user: User): string | null {
  if (!user.emailVerified) return null;
  return getOnboardingDestination(user);
}

import type { Account, AccountType, User } from "@/types/user";

export type HeaderVariant = "intro" | "create-profile" | "client" | "talent";

const ONBOARDING_PATH_PREFIXES = ["/nx/create-profile", "/nx/client-onboarding"];

const CLIENT_PATH_PREFIXES = [
  "/nx/client",
  "/nx/job-post",
  "/nx/plans/client",
  "/nx/org-management",
  "/nx/wm",
  "/nx/client-onboarding",
  "/nx/client-info",
  "/nx/payments",
  "/nx/search",
  "/nx/tax",
  "/nx/connected-services",
];

const TALENT_PATH_PREFIXES = [
  "/nx/find-work",
  "/nx/my-stats",
  "/nx/plans/connects",
  "/nx/plans/membership",
  "/freelancers",
  "/nx/create-profile",
];

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isOnboardingPath(pathname: string) {
  return matchesPrefix(pathname, ONBOARDING_PATH_PREFIXES);
}

function accountForType(user: User, type: AccountType): Account | undefined {
  return user.accounts.find((account) => account.type === type);
}

function inferAccountTypeFromPath(pathname: string): AccountType | null {
  if (matchesPrefix(pathname, CLIENT_PATH_PREFIXES)) return "client";
  if (matchesPrefix(pathname, TALENT_PATH_PREFIXES)) return "talent";
  return null;
}

function activeAccount(user: User, pathname: string): Account | undefined {
  const fromPath = inferAccountTypeFromPath(pathname);
  if (fromPath) return accountForType(user, fromPath);

  return user.accounts[0];
}

export function resolveHeaderVariant({
  pathname,
  user,
  isAuthenticated,
  forcedVariant,
}: {
  pathname: string;
  user: User | null;
  isAuthenticated: boolean;
  forcedVariant?: HeaderVariant;
}): HeaderVariant {
  if (forcedVariant) return forcedVariant;

  if (!isAuthenticated || !user) return "intro";

  if (isOnboardingPath(pathname)) return "create-profile";

  const account = activeAccount(user, pathname);

  if (account && !account.onboardingCompleted) {
    return "create-profile";
  }

  if (account?.type === "client") return "client";
  if (account?.type === "talent") return "talent";

  const client = accountForType(user, "client");
  const talent = accountForType(user, "talent");

  if (client && !client.onboardingCompleted) return "create-profile";
  if (talent && !talent.onboardingCompleted) return "create-profile";
  if (client) return "client";
  if (talent) return "talent";

  return "intro";
}

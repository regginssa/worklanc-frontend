import type { AuthResponse } from "@/types/user";

const pickActiveAccount = (accounts: AuthResponse["user"]["accounts"] = []) =>
  accounts.find((account) => !account.onboardingCompleted) ?? accounts[0];

export function getPostLoginRedirect(data: AuthResponse): string {
  const redirectTo = data.redirectTo || "";

  if (redirectTo.startsWith("/nx/create-profile")) {
    return redirectTo;
  }

  const activeAccount = pickActiveAccount(data.user?.accounts);

  if (activeAccount?.type === "talent") {
    return "/nx/find-work";
  }

  if (activeAccount?.type === "client") {
    return "/nx/client/dashboard";
  }

  return "/nx/client/dashboard";
}

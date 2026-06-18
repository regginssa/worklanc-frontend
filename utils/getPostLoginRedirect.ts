import type { AuthResponse } from "@/types/user";
import { getOnboardingDestination } from "@/utils/onboardingRedirect";

export function getPostLoginRedirect(data: AuthResponse): string {
  const redirectTo = data.redirectTo || "";

  if (
    redirectTo.startsWith("/nx/create-profile") ||
    redirectTo.startsWith("/nx/client-onboarding") ||
    redirectTo.startsWith("/nx/plans/client/business-plus")
  ) {
    return redirectTo;
  }

  const destination = getOnboardingDestination(data.user);
  if (destination) return destination;

  return redirectTo || "/nx/client/dashboard";
}

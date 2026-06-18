import { request } from "./client";
import type { ClientCompanySize, MembershipTier } from "@/types/user";

export type AccountOnboardingPatch = {
  step?: string | null;
  completed?: boolean;
  companyName?: string;
  companyWebsite?: string;
  companySize?: ClientCompanySize;
  membershipTier?: MembershipTier;
};

const AccountsAPI = {
  list: async () => request("/accounts", { method: "GET" }),

  updateOnboarding: async (accountId: number, patch: AccountOnboardingPatch) =>
    request(`/accounts/${accountId}/onboarding`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
};

export default AccountsAPI;

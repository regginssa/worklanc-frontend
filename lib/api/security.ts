import { request } from "./client";

type RiskResponse = {
  requiresTurnstile: boolean;
  reason: "vpn" | null;
};

const SecurityAPI = {
  getRisk: async (): Promise<RiskResponse | null> =>
    request("/security/risk", { method: "GET" }, { silent: true }),

  verifyTurnstile: async (
    token: string,
  ): Promise<{ success: boolean } | null> =>
    request(
      "/security/turnstile/verify",
      {
        method: "POST",
        body: JSON.stringify({ token }),
      },
      { silent: true },
    ),
};

export default SecurityAPI;

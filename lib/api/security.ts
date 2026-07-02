import { request } from "./client";
import type { TurnstileScope } from "@/lib/security/turnstile";

type TurnstileVerifyResponse = {
  token: string;
  expiresIn: number;
  scope: TurnstileScope;
};

const SecurityAPI = {
  verifyTurnstile: async (
    token: string,
    scope: TurnstileScope
  ): Promise<TurnstileVerifyResponse | null> =>
    request("/security/turnstile/verify", {
      method: "POST",
      body: JSON.stringify({ token, scope }),
    }),
};

export default SecurityAPI;

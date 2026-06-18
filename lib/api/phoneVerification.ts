import { request } from "./client";
import type { User } from "@/types/user";

type SendPhoneVerificationResponse = {
  status: "pending";
  phone: string;
  message: string;
};

type VerifyPhoneVerificationResponse = {
  status: "approved";
  user: User;
};

const PhoneVerificationAPI = {
  send: async (
    phone: string,
  ): Promise<SendPhoneVerificationResponse | null> =>
    await request("/phone-verification/send", {
      method: "POST",
      body: JSON.stringify({ phone }),
    }),

  verify: async (
    phone: string,
    code: string,
  ): Promise<VerifyPhoneVerificationResponse | null> =>
    await request("/phone-verification/verify", {
      method: "POST",
      body: JSON.stringify({ phone, code }),
    }),
};

export default PhoneVerificationAPI;

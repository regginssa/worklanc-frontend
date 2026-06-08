import { request } from "./client";
import type { OAuthProfile } from "@/types/oauth";

const AuthAPI = {
  signup: async (body: any) =>
    await request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  signin: async (body: any) =>
    await request("/auth/signin", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // Social sign-in / sign-up. Posts the decoded provider profile and gets back
  // { token, user, redirectTo, isNewUser } — redirectTo is the next incomplete
  // onboarding step, or /dashboard when onboarding is already done.
  oauth: async (body: OAuthProfile) =>
    await request("/auth/oauth", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  me: async () => await request("/auth/me", { method: "GET" }),

  updateMe: async (body: any) =>
    await request("/auth/me", {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  logout: async () => {
    const token = getAuthToken();
    if (!token) {
      return { ok: true };
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      return { ok: res.ok };
    } catch {
      return { ok: false };
    }
  },
};

export const TOKEN_KEY = "Authenticate-Token";

export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export default AuthAPI;

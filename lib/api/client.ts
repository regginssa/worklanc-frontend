import { toast } from "sonner";
import { getAuthToken, removeAuthToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<any> {
  const token = getAuthToken();

  const res = await fetch(`${BASE_URL}/api${endpoint}`, {
    headers: {
      "Content-Type": "application/json",

      // add token automatically
      ...(token
        ? {
            Authorization: token,
          }
        : {}),

      ...(options.headers || {}),
    },

    ...options,
  });

  if (res.status === 401) {
    removeAuthToken();
    toast.error("Session expired");
    window.location.href = "/auth/login";
    return null;
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    toast.error(data?.message || data?.msg || "API Error", {
      position: "top-center",
    });
    // throw new Error(data?.message || data?.msg || "API Error");
  }

  return data;
}

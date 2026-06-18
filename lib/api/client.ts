import { toast } from "sonner";
import { getAuthToken, removeAuthToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  config?: { silent?: boolean },
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
    window.location.href = "/nx/login";
    return null;
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (!config?.silent) {
      toast.error(data?.message || data?.msg || "API Error", {
        position: "top-center",
      });
    }
    // throw new Error(data?.message || data?.msg || "API Error");
  }

  return data;
}

export async function uploadRequest(
  endpoint: string,
  formData: FormData,
): Promise<any> {
  const token = getAuthToken();

  const res = await fetch(`${BASE_URL}/api${endpoint}`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: token } : {}),
    },
    body: formData,
  });

  if (res.status === 401) {
    removeAuthToken();
    toast.error("Session expired");
    window.location.href = "/nx/login";
    return null;
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    toast.error(data?.message || data?.msg || "Upload failed", {
      position: "top-center",
    });
    return null;
  }

  return data;
}

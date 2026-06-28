import { getAuthToken } from "./auth";
import { toast } from "sonner";

export async function localRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T | null> {
  const token = getAuthToken();

  let res: Response;

  try {
    res = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
        ...(options.headers || {}),
      },
    });
  } catch {
    toast.error("Unable to reach Worklanc server. Please try again.", {
      position: "top-center",
    });
    return null;
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    toast.error(data?.message || data?.msg || "Request failed", {
      position: "top-center",
    });
    return null;
  }

  return data;
}

export type TurnstileScope = "find_work" | "freelancer_profile";

const TURNSTILE_SESSION_KEY = "turnstile-sessions";

type TurnstileSessionRecord = {
  token: string;
  expiresAt: number;
};

type TurnstileSessionMap = Partial<Record<TurnstileScope, TurnstileSessionRecord>>;

const hasWindow = () => typeof window !== "undefined";

const readSessionMap = (): TurnstileSessionMap => {
  if (!hasWindow()) return {};
  const raw = window.sessionStorage.getItem(TURNSTILE_SESSION_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as TurnstileSessionMap;
  } catch {
    return {};
  }
};

const writeSessionMap = (value: TurnstileSessionMap) => {
  if (!hasWindow()) return;
  window.sessionStorage.setItem(TURNSTILE_SESSION_KEY, JSON.stringify(value));
};

export const setTurnstileSession = (
  scope: TurnstileScope,
  token: string,
  expiresInSeconds: number
) => {
  const next = readSessionMap();
  next[scope] = {
    token,
    expiresAt: Date.now() + Math.max(expiresInSeconds - 30, 1) * 1000,
  };
  writeSessionMap(next);
};

export const getTurnstileSession = (scope: TurnstileScope): string | null => {
  const all = readSessionMap();
  const current = all[scope];
  if (!current) return null;
  if (Date.now() >= current.expiresAt) {
    delete all[scope];
    writeSessionMap(all);
    return null;
  }
  return current.token;
};

export const getAnyTurnstileSession = (): string | null => {
  const scopes: TurnstileScope[] = ["find_work", "freelancer_profile"];
  for (const scope of scopes) {
    const token = getTurnstileSession(scope);
    if (token) return token;
  }
  return null;
};

export const getTurnstileSessionForEndpoint = (
  endpoint: string
): string | null => {
  if (endpoint.startsWith("/jobs/browse")) {
    return getTurnstileSession("find_work");
  }
  if (endpoint.startsWith("/talent/freelancers/")) {
    return getTurnstileSession("freelancer_profile");
  }
  return getAnyTurnstileSession();
};

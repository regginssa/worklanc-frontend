import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Turnstile from "react-turnstile";
import SecurityAPI from "@/lib/api/security";
import {
  setTurnstileSession,
  type TurnstileScope,
} from "@/lib/security/turnstile";

const SCOPE_TEXT: Record<
  TurnstileScope,
  { title: string; description: string }
> = {
  find_work: {
    title: "Security Check",
    description:
      "We run this verification before loading find-work jobs to protect freelancers and clients from automated abuse.",
  },
  freelancer_profile: {
    title: "Security Check",
    description:
      "We run this verification before opening freelancer profile pages to protect account and profile traffic.",
  },
};

const isValidScope = (value: string): value is TurnstileScope =>
  value === "find_work" || value === "freelancer_profile";

export default function SecurityCheckPage() {
  const router = useRouter();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scope = useMemo(() => {
    const raw = String(router.query.scope || "");
    return isValidScope(raw) ? raw : null;
  }, [router.query.scope]);

  const nextPath = useMemo(() => {
    const raw = String(router.query.next || "/");
    if (!raw.startsWith("/")) return "/";
    return raw;
  }, [router.query.next]);

  const copy = scope ? SCOPE_TEXT[scope] : null;

  const handleVerify = async (challengeToken: string) => {
    if (!scope) {
      setError("Invalid security scope.");
      return;
    }

    setError(null);
    setIsVerifying(true);
    try {
      const response = await SecurityAPI.verifyTurnstile(challengeToken, scope);
      if (!response?.token || !response?.expiresIn) {
        setError("Verification failed. Please retry.");
        return;
      }
      setTurnstileSession(scope, response.token, response.expiresIn);
      router.replace(nextPath);
    } catch {
      setError("Verification failed. Please retry.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl lg:p-20 p-6">
      <section className="w-full">
        <h1 className="text-2xl font-semibold text-slate-900">
          {copy?.title || "Security Check"}
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          {copy?.description ||
            "Please complete this challenge before continuing."}
        </p>

        <div className="mt-6">
          {!siteKey ? (
            <p className="text-sm text-red-600">
              Turnstile is not configured. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY.
            </p>
          ) : (
            <Turnstile
              sitekey={siteKey}
              theme="light"
              size="flexible"
              onVerify={handleVerify}
              onError={() =>
                setError("Turnstile challenge failed. Please retry.")
              }
            />
          )}
        </div>

        {isVerifying && (
          <p className="mt-3 text-sm text-slate-600">Verifying challenge...</p>
        )}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </section>
    </main>
  );
}

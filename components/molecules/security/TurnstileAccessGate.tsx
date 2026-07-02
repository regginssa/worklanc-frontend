import { useMemo, useState } from "react";
import Turnstile from "react-turnstile";
import WorklancLogo from "@/components/atoms/WorkLancLogo";
import SecurityAPI from "@/lib/api/security";
import { setTurnstileSession, type TurnstileScope } from "@/lib/security/turnstile";

type TurnstileAccessGateProps = {
  scope: TurnstileScope;
};

export default function TurnstileAccessGate({ scope }: TurnstileAccessGateProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const description = useMemo(() => {
    if (scope === "find_work") {
      return "This website uses a security service to protect against malicious bots. This page is displayed while the website verifies you are not a bot.";
    }
    return "This website uses a security service to protect against malicious bots. This page is displayed while the website verifies your profile traffic is safe.";
  }, [scope]);

  const handleVerify = async (challengeToken: string) => {
    setError(null);
    setIsVerifying(true);
    try {
      const response = await SecurityAPI.verifyTurnstile(challengeToken, scope);
      if (!response?.token || !response?.expiresIn) {
        setError("Verification failed. Please retry.");
        return;
      }
      setTurnstileSession(scope, response.token, response.expiresIn);
      window.location.reload();
    } catch {
      setError("Verification failed. Please retry.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-6">
      <section className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <WorklancLogo href="/" className="gap-1!" />
          <span className="text-sm text-slate-600">www.worklanc.com</span>
        </div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Performing security verification
        </h1>
        <p className="mt-4 text-sm text-slate-600">{description}</p>

        <div className="mt-8">
          {!siteKey ? (
            <p className="text-sm text-red-600">
              Turnstile is not configured. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY.
            </p>
          ) : (
            <Turnstile
              sitekey={siteKey}
              options={{ theme: "light", size: "flexible" }}
              onVerify={handleVerify}
              onError={() => setError("Turnstile challenge failed. Please retry.")}
              onExpire={() => setError("Challenge expired. Please verify again.")}
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

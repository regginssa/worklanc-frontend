import { useState } from "react";
import Image from "next/image";
import Turnstile from "react-turnstile";
import Logo from "@/public/assets/logos/logo.png";
import SecurityAPI from "@/lib/api/security";
import { WorklancLogo } from "@/components/atoms";

const SITE_DOMAIN = "www.worklanc.com";

type TurnstileAccessGateProps = {
  onVerified?: () => void;
};

export default function TurnstileAccessGate({
  onVerified,
}: TurnstileAccessGateProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (challengeToken: string) => {
    setError(null);
    setIsVerifying(true);
    try {
      const response = await SecurityAPI.verifyTurnstile(challengeToken);
      if (!response?.success) {
        setError("Verification failed. Please retry.");
        return;
      }
      onVerified?.();
    } catch {
      setError("Verification failed. Please retry.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto mt-32 w-full max-w-xl px-6">
        <div className="mb-6 flex items-center gap-2.5 justify-between">
          <WorklancLogo />
          <h1 className="text-base text-slate-800">www.worklanc.com</h1>
        </div>

        <h1 className="text-base font-normal leading-relaxed text-[#313131]">
          Verifying you are human. This may take a few seconds.
        </h1>

        <p className="mt-5 text-sm leading-relaxed text-[#666666]">
          {SITE_DOMAIN} needs to review the security of your connection before
          proceeding.
        </p>

        <div className="mt-6">
          <Turnstile
            sitekey={siteKey}
            theme="light"
            size="normal"
            onVerify={handleVerify}
            onError={() =>
              setError("Turnstile challenge failed. Please retry.")
            }
            onExpire={() => setError("Challenge expired. Please verify again.")}
          />
        </div>

        {isVerifying && (
          <p className="mt-3 text-sm text-[#666666]">Verifying challenge...</p>
        )}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <footer className="mt-10 border-t border-[#e5e5e5] pt-4">
          <p className="text-xs text-[#999999]">
            Performance &amp; security by{" "}
            <span className="font-semibold tracking-wide text-[#f38020]">
              CLOUDFLARE
            </span>
          </p>
        </footer>
      </section>
    </main>
  );
}

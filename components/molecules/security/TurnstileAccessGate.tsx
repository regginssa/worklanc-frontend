import { type ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { getTurnstileSession, type TurnstileScope } from "@/lib/security/turnstile";

type TurnstileAccessGateProps = {
  scope: TurnstileScope;
  children: ReactNode;
};

export default function TurnstileAccessGate({
  scope,
  children,
}: TurnstileAccessGateProps) {
  const router = useRouter();
  const verified = Boolean(getTurnstileSession(scope));

  useEffect(() => {
    if (!router.isReady || verified) return;
    const nextPath = router.asPath || "/";
    const query = new URLSearchParams({
      scope,
      next: nextPath,
    }).toString();
    router.replace(`/nx/security-check?${query}`);
  }, [router, scope, verified]);

  if (verified) {
    return <>{children}</>;
  }

  return null;
}

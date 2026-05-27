import AuthAPI, { setAuthToken } from "@/lib/api/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";

export function OAuthSyncProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { accountType, countryCode } = router.query;

  useEffect(() => {
    const syncUser = async () => {
      if (!router.isReady) return;
      if (status !== "authenticated") return;
      const user = session?.user as any;
      const ses = session as any;
      if (!user) return;

      const data = await AuthAPI.oauth({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        image: user?.image,
        signinOption: ses?.provider,
        googleId: user.googleId,
        appleId: user.appleId,
        accountType,
        countryCode,
      });

      if (!data?.token)
        return toast.error(data?.message || "Authentication failed");
      setAuthToken(data.token);
      router.push("/nx/create-profile");
    };

    syncUser();
  }, [status, accountType, router.isReady]);

  return children;
}

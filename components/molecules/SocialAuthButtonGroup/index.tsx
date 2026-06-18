import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { countries } from "country-data-list";
import type { AccountType, AuthIntent, OAuthProvider } from "@/types/oauth";
import { signInWithProvider } from "@/lib/oauth/providers";
import AuthAPI, { setAuthToken } from "@/lib/api/auth";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";
import { getPostLoginRedirect } from "@/utils/getPostLoginRedirect";

// `countryCode` may arrive as a full country name (sign-up form) or an alpha-2
// code. Normalize to alpha-2 so it fits users.country_code.
const toAlpha2 = (value?: string) => {
  if (!value) return "US";
  if (value.length === 2) return value.toUpperCase();
  return countries.all.find((c) => c.name === value)?.alpha2 || "US";
};

const SocialAuthButtonGroup = ({
  vertical,
  intent = "login",
  accountType,
  countryCode = "US",
}: {
  vertical?: boolean;
  intent?: AuthIntent;
  accountType?: AccountType;
  countryCode?: string;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<OAuthProvider | null>(null);

  const handleOAuth = async (provider: OAuthProvider) => {
    if (loading) return;
    setLoading(provider);

    try {
      const profile = await signInWithProvider(provider);

      if (!profile.providerId || !profile.email) {
        toast.error("Could not read your account details from the provider", {
          position: "top-center",
        });
        return;
      }

      const data = await AuthAPI.oauth({
        ...profile,
        intent,
        accountType,
        countryCode: toAlpha2(countryCode),
      });

      if (!data?.token) return;

      setAuthToken(data.token);
      dispatch(setUser(data.user));
      router.push(getPostLoginRedirect(data));
    } catch (error: any) {
      // A user closing the popup is not an error worth surfacing.
      const message = String(error?.message || "");
      if (!/popup|cancel|closed|abort/i.test(message)) {
        toast.error("Social sign in failed. Please try again.", {
          position: "top-center",
        });
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className={`flex items-center gap-6 ${vertical && "flex-col"}`}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        disabled={!!loading}
        className={`rounded-full border border-black flex items-center p-2 flex-1 justify-center gap-2 transition-all duration-200 group hover:bg-black cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
          vertical && "w-full!"
        }`}
        onClick={() => handleOAuth("apple")}
      >
        <Icon
          icon={loading === "apple" ? "mdi:loading" : "mdi:apple"}
          width={20}
          className={`group-hover:text-white transition-all duration-200 ${
            loading === "apple" ? "animate-spin" : ""
          }`}
        />
        <span className="text-sm group-hover:text-white transition-all duration-200">
          Continue with Apple
        </span>
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        disabled={!!loading}
        className={`rounded-full flex items-center text-blue-600 justify-center gap-2 p-2 flex-1 border border-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
          vertical && "w-full!"
        }`}
        onClick={() => handleOAuth("google")}
      >
        <Icon
          icon={loading === "google" ? "mdi:loading" : "mdi:google"}
          width={20}
          className={loading === "google" ? "animate-spin" : ""}
        />
        <span className="text-sm">Continue with Google</span>
      </motion.button>
    </div>
  );
};

export default SocialAuthButtonGroup;

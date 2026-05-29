import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import type { AccountType, AuthIntent } from "@/lib/oauth/types";

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
  const buildProviderUrl = (provider: "google" | "apple") => {
    const params = new URLSearchParams({ intent });

    if (accountType) {
      params.set("accountType", accountType);
    }

    if (countryCode) {
      params.set("countryCode", countryCode);
    }

    return `/api/auth/${provider}?${params.toString()}`;
  };

  const startOAuth = (provider: "google" | "apple") => {
    window.location.href = buildProviderUrl(provider);
  };

  return (
    <div className={`flex items-center gap-6 ${vertical && "flex-col"}`}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        className={`rounded-full border border-black flex items-center p-2 flex-1 justify-center gap-2 transition-all duration-200 group hover:bg-black cursor-pointer ${
          vertical && "w-full!"
        }`}
        onClick={() => startOAuth("apple")}
      >
        <Icon
          icon="mdi:apple"
          width={20}
          className="group-hover:text-white transition-all duration-200"
        />
        <span className="text-sm group-hover:text-white transition-all duration-200">
          Continue with Apple
        </span>
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        className={`rounded-full flex items-center text-blue-600 justify-center gap-2 p-2 flex-1 border border-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer ${
          vertical && "w-full!"
        }`}
        onClick={() => startOAuth("google")}
      >
        <Icon icon="mdi:google" width={20} className="" />
        <span className="text-sm">Continue with Google</span>
      </motion.button>
    </div>
  );
};

export default SocialAuthButtonGroup;

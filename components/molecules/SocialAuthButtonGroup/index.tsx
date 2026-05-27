import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { signIn } from "next-auth/react";

type AuthIntent = "login" | "signup";
type AccountType = "client" | "talent";

const SocialAuthButtonGroup = ({
  vertical,
  intent = "login",
  accountType,
  countryCode,
}: {
  vertical?: boolean;
  intent?: AuthIntent;
  accountType?: AccountType;
  countryCode?: string;
}) => {
  const callbackUrl = `/nx/oauth-callback?intent=${intent}${
    accountType ? `&accountType=${accountType}` : ""
  }${countryCode ? `&countryCode=${countryCode}` : ""}`;

  return (
    <div className={`flex items-center gap-6 ${vertical && "flex-col"}`}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`rounded-full border border-black flex items-center p-2 flex-1 justify-center gap-2 transition-all duration-200 group hover:bg-black cursor-pointer ${
          vertical && "w-full!"
        }`}
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
        whileTap={{ scale: 0.95 }}
        className={`rounded-full flex items-center text-blue-600 justify-center gap-2 p-2 flex-1 border border-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer ${
          vertical && "w-full!"
        }`}
        onClick={() => signIn("google", { callbackUrl })}
      >
        <Icon icon="mdi:google" width={20} className="" />
        <span className="text-sm">Continue with Google</span>
      </motion.button>
    </div>
  );
};

export default SocialAuthButtonGroup;

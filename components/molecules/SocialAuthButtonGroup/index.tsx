import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { signIn } from "next-auth/react";

const SocialAuthButtonGroup = ({ vertical }: { vertical?: boolean }) => {
  return (
    <div className={`flex items-center gap-6 ${vertical && "flex-col"}`}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`rounded-full border border-black flex items-center p-2 flex-1 justify-center gap-2 transition-all duration-200 group hover:bg-black cursor-pointer ${vertical && "w-full!"}`}
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
        className={`rounded-full flex items-center justify-center gap-2 p-2 flex-1 border border-sky-600 bg-sky-500 hover:bg-sky-600 transition-all duration-200 cursor-pointer ${vertical && "w-full!"}`}
        onClick={() => signIn("google")}
      >
        <Icon icon="mdi:google" width={20} className="text-white" />
        <span className="text-sm text-white">Continue with Google</span>
      </motion.button>
    </div>
  );
};

export default SocialAuthButtonGroup;

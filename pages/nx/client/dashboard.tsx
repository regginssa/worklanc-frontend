import { Button } from "@/components/atoms";
import { ClientLayout } from "@/components/layouts";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import MailCheckIcon from "@/public/assets/svgs/icons/icons/mail_check.svg";
import DollarSheldIcon from "@/public/assets/svgs/icons/icons/dollar_sheld.svg";

export default function Dashboard() {
  return (
    <ClientLayout
      seo={{
        title: "Your dashboard - Worklanc",
        description: "Your dashboard - Worklanc",
        url: "/nx/client/dashboard",
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-8 freelancer-plus-alert p-4 rounded-md text-white">
          <div className="flex items-center gap-2">
            <Icon
              icon="material-symbols-light:diamond-outline"
              className="size-6"
            />
            <p className="text-sm font-light">
              Make hiring easier from day one. Try Business Plus for 30 days on
              us.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="underline text-sm cursor-pointer"
            >
              Upgrade now
            </motion.button>
            <button>
              <Icon icon="mdi:close" className="size-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-8">
          <h1 className="text-2xl font-medium">Welcome back, John</h1>
          <Button
            type="primary"
            label="Post a job"
            icon="mdi:plus"
            classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-medium">Last steps before you can hire</h2>
        <div className="grid grid-cols-3 gap-8">
          <Link
            href="#"
            className="border border-slate-300 cursor-pointer rounded-3xl p-6 flex items-start justify-between gap-6"
          >
            <div className="space-y-4">
              <p className="text-sm font-light">Required to hire</p>
              <h4 className="text-xl font-medium underline">
                Verify your email
              </h4>
              <p className="text-sm font-light">
                Confirm it's you and establish trust with freelancers
              </p>
            </div>

            <Image src={MailCheckIcon} alt="Mail check" className="w-12 h-12" />
          </Link>

          <Link
            href="#"
            className="border border-slate-300 cursor-pointer rounded-3xl p-6 flex items-start justify-between gap-6"
          >
            <div className="space-y-4">
              <p className="text-sm font-light">Required to hire</p>
              <h4 className="text-xl font-medium underline">
                Add a billing method
              </h4>
              <p className="text-sm font-light">
                Confirm it's you and establish trust with freelancers
              </p>
            </div>

            <Image
              src={DollarSheldIcon}
              alt="Dollar sheld"
              className="w-12 h-12"
            />
          </Link>
        </div>
      </div>
    </ClientLayout>
  );
}

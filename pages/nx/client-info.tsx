import { Button, IconButton } from "@/components/atoms";
import { ClientSettingsLayout } from "@/components/layouts";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Info() {
  return (
    <ClientSettingsLayout
      seo={{
        title: "Account Settings - My Info - Worklane",
        description: "Manage your account settings and preferences",
        url: "https://worklane.com/account/settings/info",
      }}
    >
      <div>
        <h2 className="text-3xl font-medium">My Info</h2>
        <p className="text-sm mt-2">This is a client account</p>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Account</h3>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="flex items-start gap-16">
          <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center">
            <Icon
              icon="mdi:account-circle-outline"
              className="size-6 text-slate-600"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium">J*** S****</h4>

            <div className="space-y-1 text-sm">
              <p className="text-slate-600">Basic</p>
              <h4>John S</h4>
            </div>

            <div className="space-y-1 text-sm">
              <p className="text-slate-600">Email</p>
              <h4>d*******@charlieunicornai.eu</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Company details</h3>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="flex items-start gap-16">
          <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center">
            <Icon icon="mdi:building" className="size-6 text-slate-600" />
          </div>

          <div className="space-y-4">
            <div className="space-y-1 text-sm">
              <h4 className="font-medium text-base">John S</h4>
              <Link
                href="http://charlieunicornai.eu"
                target="_blank"
                className="underline cursor-pointer"
              >
                http://charlieunicornai.eu
              </Link>
            </div>

            <div className="space-y-1 text-sm">
              <p className="text-slate-600">Size</p>
              <h4>It's just me</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Company contacts</h3>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-1 text-sm">
            <p className="text-slate-600">Owner</p>
            <h4>J***mthi</h4>
          </div>

          <div className="space-y-1 text-sm">
            <p className="text-slate-600">Phone</p>
            <h4>+1 777 123 456</h4>
          </div>

          <div className="space-y-1 text-sm">
            <p className="text-slate-600">Time Zone</p>
            <h4>UTC-05:00 Central Time (US & Canada)</h4>
          </div>

          <div className="space-y-1 text-sm">
            <p className="text-slate-600">Address</p>
            <h4>United States</h4>
          </div>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <p className="text-sm">This is a client account</p>
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            label="Create New Account"
            classname="py-2! px-5! rounded-full! text-sm! font-medium!"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 py-2 px-5 text-sm font-medium cursor-pointer hover:underline"
          >
            Close account
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 py-2 px-5 text-sm font-medium cursor-pointer hover:underline"
          >
            Transfer ownership
          </motion.button>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">AI preference</h3>
          <p className="text-sm text-slate-600">
            Choose how your Worklanc data is used for AI training and
            improvement.{" "}
            <Link href="#" className="text-black underline cursor-pointer">
              Learn more
            </Link>
          </p>
        </div>

        <Button
          type="outline"
          label="Set preference"
          size="medium"
          classname="py-2! px-5! rounded-full! text-sm! font-medium!"
        />
      </div>
    </ClientSettingsLayout>
  );
}

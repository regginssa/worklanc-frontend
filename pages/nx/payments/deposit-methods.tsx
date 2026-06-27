import { Button } from "@/components/atoms";
import { ClientSettingsLayout } from "@/components/layouts";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { AddBillingMethodSection } from "@/components/organisms";

export default function DepositMethods() {
  const [showAddBillingMethodSection, setShowAddBillingMethodSection] =
    useState(false);
  const accountType = "talent";

  return (
    <ClientSettingsLayout
      seo={{
        title: "Billing & Payments - Worklanc",
        description: "Billing & Payments - Worklanc",
        url: "nx/payments/deposit-methods",
      }}
    >
      <h2 className="text-3xl font-medium">Billing & payments</h2>

      {accountType !== "talent" && (
        <div className="grid grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl border border-slate-300 flex flex-col items-start justify-between gap-6">
            <div>
              <h3 className="text-2xl font-medium">Outstanding balance</h3>
              <p className="text-2xl font-medium mt-4">$0.00</p>
            </div>
            <Button
              type="primary"
              label="Pay now"
              classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
              disabled
            />
          </div>

          <div className="p-8 rounded-3xl border border-slate-300 flex flex-col items-start justify-between gap-6">
            <div>
              <h3 className="text-2xl font-medium">Company billing cycle</h3>
              <p className="text-sm text-slate-600 mt-4">Weekly</p>
            </div>
            <p className="text-sm text-slate-800">
              Terms: <strong className="font-medium">Standard</strong>
            </p>
          </div>
        </div>
      )}

      {showAddBillingMethodSection ? (
        <AddBillingMethodSection
          onCancel={() => setShowAddBillingMethodSection(false)}
        />
      ) : (
        <div className="p-8 rounded-3xl border border-slate-300">
          <div className="mb-10">
            <h3 className="text-2xl font-medium">Billing methods</h3>
            <p className="text-sm text-slate-600 mt-4">
              You haven’t set up any billing methods yet. Add a method so you
              can hire when you’re ready.
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 cursor-pointer hover:underline text-sm font-medium flex items-center gap-2"
            onClick={() => setShowAddBillingMethodSection(true)}
          >
            <Icon icon="mdi:plus" className="size-5" />
            Add a billing method
          </motion.button>
        </div>
      )}
    </ClientSettingsLayout>
  );
}

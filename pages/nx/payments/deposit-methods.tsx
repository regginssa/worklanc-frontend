import { Button } from "@/components/atoms";
import {
  ClientSettingsLayout,
  FreelancerSettingsLayout,
} from "@/components/layouts";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { AddBillingMethodSection } from "@/components/organisms";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSavedCards } from "@/lib/api/payments";
import CardBillingSection from "@/components/molecules/CardBillingSection";
import { SavedCardsListSkeleton } from "@/components/molecules";
import { getEmptyBillingMethodsDescription } from "@/types/payment";

export default function DepositMethods() {
  const [showAddBillingMethodSection, setShowAddBillingMethodSection] =
    useState(false);
  const accountType = "talent";
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["payment-methods", "cards"],
    queryFn: fetchSavedCards,
  });

  const cards = data?.cards ?? [];

  const refreshCards = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["payment-methods", "cards"],
    });
  };

  const hasBillingMethods = cards.length > 0;

  return (
    <Layout accountType={"talent"}>
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
          cards={cards}
          accountType={accountType}
          isLoadingCards={isLoading}
          onCardsChange={refreshCards}
          onCancel={() => setShowAddBillingMethodSection(false)}
        />
      ) : (
        <div className="p-8 rounded-3xl border border-slate-300">
          <div className="mb-10">
            <h3 className="text-2xl font-medium">Billing methods</h3>
            {isLoading ? (
              <div className="mt-6">
                <SavedCardsListSkeleton />
              </div>
            ) : hasBillingMethods ? (
              <div className="mt-6">
                <CardBillingSection
                  cards={cards}
                  onCardsChange={refreshCards}
                />
              </div>
            ) : (
              <p className="text-sm text-slate-600 mt-4">
                {getEmptyBillingMethodsDescription(accountType)}
              </p>
            )}
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
    </Layout>
  );
}

const Layout = ({
  children,
  accountType,
}: {
  children: React.ReactNode;
  accountType: "talent" | "client";
}) => {
  if (accountType === "talent") {
    return (
      <FreelancerSettingsLayout
        seo={{
          title: "Billing & Payments - Worklanc",
          description: "Billing & Payments - Worklanc",
          url: "nx/payments/deposit-methods",
        }}
      >
        {children}
      </FreelancerSettingsLayout>
    );
  }
  return (
    <ClientSettingsLayout
      seo={{
        title: "Billing & Payments - Worklanc",
        description: "Billing & Payments - Worklanc",
        url: "nx/payments/deposit-methods",
      }}
    >
      {children}
    </ClientSettingsLayout>
  );
};

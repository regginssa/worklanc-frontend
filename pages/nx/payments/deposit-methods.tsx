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
import { fetchPaymentMethods } from "@/lib/api/payments";
import CardBillingSection from "@/components/molecules/CardBillingSection";
import CryptoBillingSection from "@/components/molecules/CryptoBillingSection";
import { SavedCardsListSkeleton } from "@/components/molecules/SavedCardsList";
import { SavedCryptoWalletListSkeleton } from "@/components/molecules/SavedCryptoWalletList";
import { getEmptyBillingMethodsDescription } from "@/types/payment";

export default function DepositMethods() {
  const [showAddBillingMethodSection, setShowAddBillingMethodSection] =
    useState(false);
  const accountType = "talent";
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: fetchPaymentMethods,
  });

  const cards = data?.cards ?? [];
  const cryptoWallets = data?.cryptoWallets ?? [];

  const refreshPaymentMethods = async () => {
    await queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
  };

  const hasBillingMethods = cards.length > 0 || cryptoWallets.length > 0;

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
          cryptoWallets={cryptoWallets}
          accountType={accountType}
          isLoading={isLoading}
          onCardsChange={refreshPaymentMethods}
          onCryptoChange={refreshPaymentMethods}
          onCancel={() => setShowAddBillingMethodSection(false)}
        />
      ) : (
        <div className="p-8 rounded-3xl border border-slate-300">
          <div className="mb-10">
            <h3 className="text-2xl font-medium">Billing methods</h3>
            {isLoading ? (
              <div className="mt-6 space-y-6">
                <SavedCardsListSkeleton />
                <SavedCryptoWalletListSkeleton />
              </div>
            ) : hasBillingMethods ? (
              <div className="mt-6 space-y-8">
                {cards.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-700">
                      Debit or credit card
                    </p>
                    <CardBillingSection
                      cards={cards}
                      onCardsChange={refreshPaymentMethods}
                    />
                  </div>
                )}
                {cryptoWallets.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-700">
                      Cryptocurrency
                    </p>
                    <CryptoBillingSection
                      wallets={cryptoWallets}
                      onWalletsChange={refreshPaymentMethods}
                    />
                  </div>
                )}
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

"use client";

import { Button } from "@/components/atoms";
import { FreelancerSettingsLayout } from "@/components/layouts";
import { AddWithdrawalMethodSection } from "@/components/organisms";
import CryptoWithdrawalSection from "@/components/molecules/CryptoWithdrawalSection";
import { SavedCryptoWithdrawalListSkeleton } from "@/components/molecules/SavedCryptoWithdrawalList";
import SavedPayoneerWithdrawalList, {
  SavedPayoneerWithdrawalListSkeleton,
} from "@/components/molecules/SavedPayoneerWithdrawalList";
import WithdrawalScheduleSection from "@/components/molecules/WithdrawalScheduleSection";
import { useWithdrawalMethods } from "@/hooks/useWithdrawalMethods";
import { CRYPTO_CHAINS } from "@/lib/crypto/assets";
import {
  getEmptyWithdrawalMethodsDescription,
  hasWithdrawalMethods,
} from "@/types/disbursement";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function DisbursementMethods() {
  const {
    methods,
    taxProfileComplete,
    hydrated,
    connectPayoneer,
    disconnectPayoneer,
    saveCrypto,
    updateCrypto,
    removeCrypto,
    setDefaultPayoneer,
    setDefaultCrypto,
    updateSchedule,
  } = useWithdrawalMethods();

  const [showAddSection, setShowAddSection] = useState(false);

  const { payoneer, cryptoWallets, schedule } = methods;
  const hasMethods = hasWithdrawalMethods(methods);
  const canAddPayoneer = !payoneer;
  const canAddCrypto = cryptoWallets.length < CRYPTO_CHAINS.length;
  const canAddMore = canAddPayoneer || canAddCrypto;
  const payoutOptionCount = (payoneer ? 1 : 0) + cryptoWallets.length;
  const showDefaultControl = payoutOptionCount > 1;
  const canManageWithdrawals = taxProfileComplete;

  const handlePayoneerConnect = async (email: string) => {
    await connectPayoneer(email);
    setShowAddSection(false);
  };

  const handleCryptoSave = async (body: {
    address: string;
    chain: string;
    label?: string;
  }) => {
    await saveCrypto({
      address: body.address,
      chain: body.chain as "solana" | "ethereum" | "bnb",
      label: body.label,
    });
    setShowAddSection(false);
    return true;
  };

  const handleCryptoUpdate = async (
    uid: string,
    body: { address: string; label?: string }
  ) => {
    await updateCrypto(uid, body);
    return true;
  };

  return (
    <FreelancerSettingsLayout
      seo={{
        title: "Withdrawals - Worklanc",
        description: "Withdrawals - Worklanc",
        url: "/nx/payments/disbursement-methods",
      }}
    >
      <h2 className="text-3xl font-medium">Withdrawals</h2>

      <div className="grid grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl border border-slate-300 flex flex-col justify-between gap-2">
          <div className="space-y-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-medium">Available balance</h4>
                <Icon icon="mdi:dollar" className="size-6" />
              </div>

              <p className="text-2xl font-medium text-blue-600">$0.00</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">+$0.00 pending</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Icon
                      icon="mdi:information-outline"
                      className="size-4 cursor-pointer text-slate-600"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-sm p-2">
                      Pending payments become available for you after
                      they&apos;ve successfully passed through the security
                      period.
                      <br />
                      <Link href="#" className="underline cursor-pointer">
                        Learn more
                      </Link>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {!canManageWithdrawals && (
              <div className="p-4 rounded-lg bg-yellow-50 flex items-start gap-2">
                <Icon
                  icon="mdi:information"
                  className="size-5 text-yellow-500"
                />
                <p className="flex-1 text-sm font-medium">
                  To withdraw earnings, please update your{" "}
                  <Link href="#" className="underline cursor-pointer">
                    tax information
                  </Link>
                  . For more details, read our{" "}
                  <Link href="#" className="underline cursor-pointer">
                    FAQs
                  </Link>
                  .
                </p>
              </div>
            )}

            {canManageWithdrawals && hasMethods && (
              <div className="p-4 rounded-lg bg-emerald-50 flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle-outline"
                  className="size-5 text-emerald-600"
                />
                <p className="flex-1 text-sm font-medium text-emerald-900">
                  Your withdrawal method is set up. Earnings will be sent to
                  your default method when you withdraw or on your schedule.
                </p>
              </div>
            )}
          </div>

          <Link
            href="#"
            className="block text-sm underline cursor-pointer hover:text-blue-600"
          >
            View my earnings
          </Link>
        </div>

        <div className="p-8 rounded-3xl border border-slate-300 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium">Withdrawal schedule</h4>
            <Icon icon="mdi:clock-outline" className="size-5" />
          </div>

          <WithdrawalScheduleSection
            schedule={schedule}
            disabled={!canManageWithdrawals || !hasMethods}
            onSave={async (nextSchedule) => {
              await updateSchedule(nextSchedule);
            }}
          />
        </div>
      </div>

      <div className="p-8 rounded-3xl border border-slate-300 space-y-4">
        <h4 className="text-xl font-medium">Recent withdrawals</h4>
        <p className="text-sm text-slate-600 font-light">
          You haven&apos;t made any withdrawals yet.
        </p>
      </div>

      {showAddSection ? (
        <AddWithdrawalMethodSection
          payoneer={payoneer}
          cryptoWallets={cryptoWallets}
          showDefaultControl={showDefaultControl}
          onCancel={() => setShowAddSection(false)}
          onPayoneerConnect={handlePayoneerConnect}
          onPayoneerDelete={async () => {
            await disconnectPayoneer();
          }}
          onCryptoSave={handleCryptoSave}
          onCryptoUpdate={handleCryptoUpdate}
          onCryptoDelete={async (wallet) => {
            await removeCrypto(wallet.uid);
          }}
          onSetDefaultPayoneer={async () => {
            await setDefaultPayoneer();
          }}
          onSetDefaultCrypto={async (wallet) => {
            await setDefaultCrypto(wallet.uid);
          }}
        />
      ) : (
        <div className="p-8 rounded-3xl border border-slate-300 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <h4 className="text-xl font-medium">Withdrawal methods</h4>
              {!hydrated ? (
                <div className="mt-4 space-y-6">
                  <SavedPayoneerWithdrawalListSkeleton />
                  <SavedCryptoWithdrawalListSkeleton rows={2} />
                </div>
              ) : hasMethods ? (
                <div className="mt-6 space-y-8">
                  {payoneer && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-slate-700">
                        Payoneer
                      </p>
                      <SavedPayoneerWithdrawalList
                        account={payoneer}
                        onDelete={async () => {
                          await disconnectPayoneer();
                        }}
                        onSetDefault={async () => {
                          await setDefaultPayoneer();
                        }}
                        showDefaultControl={showDefaultControl}
                      />
                    </div>
                  )}
                  {cryptoWallets.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-slate-700">
                        Cryptocurrency
                      </p>
                      <CryptoWithdrawalSection
                        wallets={cryptoWallets}
                        onSave={handleCryptoSave}
                        onUpdate={handleCryptoUpdate}
                        onDelete={async (wallet) => {
                          await removeCrypto(wallet.uid);
                        }}
                        onSetDefault={async (wallet) => {
                          await setDefaultCrypto(wallet.uid);
                        }}
                        showDefaultControl={showDefaultControl}
                        showAddNewWallet={canAddCrypto}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-600 font-light mt-2">
                  {getEmptyWithdrawalMethodsDescription()}
                </p>
              )}
            </div>

            {canAddMore && (
              <Button
                type="primary"
                label="Add a method"
                classname="px-5! py-2.5! rounded-full! text-sm! font-medium! shrink-0"
                disabled={!canManageWithdrawals}
                onClick={() => setShowAddSection(true)}
              />
            )}
          </div>

          {canAddMore && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`text-sm font-medium flex items-center gap-2 ${
                canManageWithdrawals
                  ? "text-blue-600 cursor-pointer hover:underline"
                  : "text-slate-400 cursor-not-allowed"
              }`}
              onClick={() => setShowAddSection(true)}
              disabled={!canManageWithdrawals}
            >
              <Icon icon="mdi:plus" className="size-5" />
              Add a withdrawal method
            </motion.button>
          )}
        </div>
      )}
    </FreelancerSettingsLayout>
  );
}

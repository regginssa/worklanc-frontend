"use client";

import { Button, Dropdown, Input } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import { ConnectBuyPageSkeleton } from "@/components/molecules/connects/ConnectCheckoutSkeletons";
import { getPromoCodeFormatError } from "@/lib/validation/promoCode";
import { createConnectCheckout, fetchConnectBundles } from "@/lib/api/connects";
import {
  formatCentsToUsd,
  formatConnectBundleLabel,
  type ConnectBundleOption,
} from "@/types/connect";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { addYears, formatDate } from "date-fns";
import { ArrowRight, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import { selectConnectsBalance } from "@/store/slices/userSlice";

export default function Buy() {
  const router = useRouter();
  const [connectAmount, setConnectAmount] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["connect-bundles"],
    queryFn: fetchConnectBundles,
  });

  const currentConnectsBalance = useAppSelector(selectConnectsBalance);

  const bundles = data?.bundles ?? [];

  const selectedBundle = useMemo<ConnectBundleOption | undefined>(() => {
    if (bundles.length === 0) return undefined;
    const amount = connectAmount ?? bundles[0]?.connectAmount;
    return (
      bundles.find(
        (bundle: ConnectBundleOption) => bundle.connectAmount === amount
      ) ?? bundles[0]
    );
  }, [bundles, connectAmount]);

  const dropdownOptions = useMemo(
    () =>
      bundles.map((bundle: ConnectBundleOption) => ({
        label: formatConnectBundleLabel(bundle),
        value: bundle.connectAmount,
      })),
    [bundles]
  );

  const handleApplyPromo = () => {
    const trimmed = promoCode.trim();
    const formatError = getPromoCodeFormatError(promoCode);

    if (formatError) {
      setPromoError(formatError);
      return;
    }

    setPromoError(null);

    if (!trimmed) {
      setAppliedPromoCode(null);
      toast.success("Promo code removed.");
      return;
    }

    setAppliedPromoCode(trimmed.toUpperCase());
    toast.success("Promo code applied.");
  };

  const handlePromoChange = (value: string) => {
    setPromoCode(value);
    setPromoError(getPromoCodeFormatError(value));
  };

  const handleBuyConnects = async () => {
    if (!selectedBundle) return;

    setIsSubmitting(true);

    const result = await createConnectCheckout({
      connectAmount: selectedBundle.connectAmount,
      promoCode: appliedPromoCode ?? undefined,
    });

    setIsSubmitting(false);

    if (!result?.checkout?.uid) return;

    if (result.reused) {
      toast.message("Resuming your previous checkout.");
    }

    await router.push(`/nx/payments/checkout/${result.checkout.uid}`);
  };

  if (isLoading) {
    return (
      <FreelancerLayout
        seo={{
          title: "Buy Connects - Worklanc",
          description: "Buy Connects - Worklanc",
          url: "nx/plans/connects/buy",
        }}
      >
        <ConnectBuyPageSkeleton />
      </FreelancerLayout>
    );
  }

  return (
    <FreelancerLayout
      seo={{
        title: "Buy Connects - Worklanc",
        description: "Buy Connects - Worklanc",
        url: "nx/plans/connects/buy",
      }}
    >
      <div className="rounded-3xl border border-slate-300 p-8 space-y-8">
        <div className="flex items-start justify-between">
          <div className="space-y-8">
            <h1 className="text-3xl font-medium">Buy Connects</h1>
            <div className="text-sm">
              <p>Your available Connects</p>
              <p className="mt-2 text-slate-600">{currentConnectsBalance}</p>
            </div>
          </div>

          <div className="max-w-md cursor-pointer freelancer-plus-alert text-white rounded-lg shadow-lg p-4 gap-3 flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Star className="size-4" />
                <span className="uppercase text-xs">
                  Get 50% off one month of freelancer plus
                </span>
              </div>

              <p className="text-sm">
                100 Connects included monthly. Plus members win 40% more
                contracts on average. Limited time offer.
              </p>
            </div>

            <Link href="#">
              <ArrowRight className="size-6" />
            </Link>
          </div>
        </div>

        <Dropdown
          label="Select the amount to buy"
          labelClassName="mb-2"
          name="amount"
          options={dropdownOptions}
          value={selectedBundle?.connectAmount}
          classname="w-1/3!"
          disabled={dropdownOptions.length === 0}
          onSelect={(value) => setConnectAmount(Number(value))}
        />

        <div className="text-sm">
          <p>Your account will be charged</p>
          <p className="mt-2 text-slate-600">
            {selectedBundle
              ? formatCentsToUsd(selectedBundle.priceCents)
              : "--"}
          </p>
        </div>

        <div className="text-sm">
          <p>Your new Connects balance will be</p>
          <p className="mt-2 text-slate-600">
            {selectedBundle
              ? currentConnectsBalance + selectedBundle.connectAmount
              : "--"}
          </p>
        </div>

        <div className="text-sm">
          <p>These Connects will expire on</p>
          <p className="mt-2 text-slate-600">
            {formatDate(addYears(new Date(), 1), "MMM d, yyyy")}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-end gap-6">
            <Input
              type="text"
              label="Promo code"
              name="promoCode"
              placeholder="Enter code"
              classname="w-1/3!"
              labelClassName="text-sm! mb-2! font-medium!"
              value={promoCode}
              error={promoError ?? undefined}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlePromoChange(e.target.value)
              }
            />

            <Button
              type="outline"
              label="Apply"
              size="medium"
              classname="py-0! h-10! px-5! rounded-full! text-sm! font-medium! border!"
              disabled={Boolean(promoError)}
              onClick={handleApplyPromo}
            />
          </div>

          {appliedPromoCode && (
            <p className="text-sm text-green-700">
              Promo code applied: {appliedPromoCode}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <p className="text-slate-600">
            This bundle of Connects will expire 1 year from today. Unused
            Connects rollover to the next month.
          </p>
          <Link href="#" className="underline text-slate-900">
            Learn more
          </Link>
        </div>

        <p className="text-sm text-slate-600">
          You&apos;re authorizing Worklanc to charge your account. If you have
          sufficient funds, we will withdraw from your account balance. If not,
          the full amount will be charged to your primary billing method.{" "}
          <Link href="#" className="underline text-slate-900">
            Learn more
          </Link>
        </p>

        <div className="flex items-center justify-end">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 cursor-pointer text-sm font-medium py-2.5! px-5!"
            onClick={() => router.push("/nx/find-work")}
          >
            Cancel
          </motion.button>

          <Button
            type="primary"
            label="Buy Connects"
            classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
            loading={isSubmitting}
            disabled={!selectedBundle || isSubmitting}
            onClick={handleBuyConnects}
          />
        </div>
      </div>
    </FreelancerLayout>
  );
}

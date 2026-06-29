import { Button, Input } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import { ConnectCheckoutPageSkeleton } from "@/components/molecules/connects/ConnectCheckoutSkeletons";
import { CheckoutBillingMethodSection } from "@/components/organisms";
import {
  applyConnectCheckoutPromo,
  fetchConnectCheckout,
  payConnectCheckoutWithCard,
} from "@/lib/api/connects";
import { fetchCryptoPrices, fetchPaymentMethods } from "@/lib/api/payments";
import {
  getChainById,
  getPrimaryTokenOption,
  getTokenOption,
} from "@/lib/crypto/assets";
import {
  convertUsdToCryptoAmount,
  formatCryptoAmount,
  formatUsdAmount,
} from "@/lib/crypto/pricing";
import { formatCentsToUsd } from "@/types/connect";
import { getPromoCodeFormatError } from "@/lib/validation/promoCode";
import type { CheckoutBillingSelection, PaymentMethod } from "@/types/payment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/store/hooks";
import { setConnectsBalance } from "@/store/slices/userSlice";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { formatDate } from "date-fns";
import CoinsIcon from "@/public/assets/svgs/icons/other/coins.svg";

export default function CheckoutPage() {
  const router = useRouter();
  const { uid } = router.query as { uid?: string };
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const [selectedBillingMethod, setSelectedBillingMethod] =
    useState<PaymentMethod>("card");
  const [billingSelection, setBillingSelection] =
    useState<CheckoutBillingSelection>({
      method: "card",
      isReady: false,
    });
  const [isPaying, setIsPaying] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const { data: checkoutData, isLoading: isCheckoutLoading } = useQuery({
    queryKey: ["connect-checkout", uid],
    queryFn: () => fetchConnectCheckout(uid!),
    enabled: Boolean(uid),
    retry: false,
  });

  const { data: paymentMethodsData, isLoading: isPaymentMethodsLoading } =
    useQuery({
      queryKey: ["payment-methods"],
      queryFn: fetchPaymentMethods,
      enabled: Boolean(uid),
    });

  const { data: cryptoPriceData, isLoading: isCryptoPricesLoading } = useQuery({
    queryKey: ["crypto-prices"],
    queryFn: fetchCryptoPrices,
    enabled: selectedBillingMethod === "crypto" && Boolean(uid),
    staleTime: 60_000,
  });

  const checkout = checkoutData?.checkout;
  const cards = paymentMethodsData?.cards ?? [];
  const cryptoWallets = paymentMethodsData?.cryptoWallets ?? [];
  const paypalAccounts = paymentMethodsData?.paypalAccounts ?? [];

  const estimatedTotalUsd = checkout ? checkout.totalCents / 100 : 0;

  const cryptoTokenId = billingSelection.cryptoTokenId;
  const cryptoToken =
    billingSelection.wallet && cryptoTokenId
      ? getTokenOption(billingSelection.wallet.chain, cryptoTokenId)
      : cryptoTokenId
      ? getPrimaryTokenOption(cryptoTokenId)
      : undefined;
  const cryptoChain = billingSelection.wallet
    ? getChainById(billingSelection.wallet.chain)
    : undefined;
  const cryptoPriceUsd = cryptoTokenId
    ? cryptoPriceData?.prices?.[cryptoTokenId]
    : undefined;

  const subtotalLabel = useMemo(() => {
    if (!checkout) return "--";

    if (selectedBillingMethod !== "crypto") {
      return formatCentsToUsd(checkout.subtotalCents);
    }

    if (isCryptoPricesLoading || !cryptoToken || !cryptoPriceUsd) {
      return "Calculating...";
    }

    return formatCryptoAmount(
      convertUsdToCryptoAmount(
        estimatedTotalUsd,
        cryptoToken.id,
        cryptoPriceUsd
      ),
      cryptoToken.id,
      cryptoToken.symbol
    );
  }, [
    checkout,
    cryptoPriceUsd,
    cryptoToken,
    estimatedTotalUsd,
    isCryptoPricesLoading,
    selectedBillingMethod,
  ]);

  const estimatedTotalLabel = useMemo(() => {
    if (!checkout) return "--";

    if (selectedBillingMethod !== "crypto") {
      return formatCentsToUsd(checkout.totalCents);
    }

    if (isCryptoPricesLoading || !cryptoToken || !cryptoPriceUsd) {
      return "Calculating...";
    }

    return formatCryptoAmount(
      convertUsdToCryptoAmount(
        estimatedTotalUsd,
        cryptoToken.id,
        cryptoPriceUsd
      ),
      cryptoToken.id,
      cryptoToken.symbol
    );
  }, [
    checkout,
    cryptoPriceUsd,
    cryptoToken,
    estimatedTotalUsd,
    isCryptoPricesLoading,
    selectedBillingMethod,
  ]);

  useEffect(() => {
    if (!checkout?.promoCode) return;
    setPromoCode(checkout.promoCode);
  }, [checkout?.promoCode]);

  useEffect(() => {
    if (!checkoutData) return;

    if (
      checkoutData.alreadyPaid ||
      checkoutData.checkout?.status === "completed"
    ) {
      router.replace("/nx/find-work");
    }
  }, [checkoutData, router]);

  const handleApplyPromo = async () => {
    if (!uid) return;

    const trimmed = promoCode.trim();
    const formatError = getPromoCodeFormatError(promoCode);

    if (formatError) {
      setPromoError(formatError);
      return;
    }

    setPromoError(null);
    setIsApplyingPromo(true);

    const result = await applyConnectCheckoutPromo(uid, trimmed || undefined);

    setIsApplyingPromo(false);

    if (result?.existingCheckoutUid && result.existingCheckoutUid !== uid) {
      toast.message("Redirecting to your existing checkout for this promo.");
      await router.replace(
        `/nx/payments/checkout/${result.existingCheckoutUid}`
      );
      return;
    }

    if (!result?.checkout) return;

    await queryClient.invalidateQueries({
      queryKey: ["connect-checkout", uid],
    });
    toast.success(trimmed ? "Promo code applied." : "Promo code removed.");
  };

  const handlePromoChange = (value: string) => {
    setPromoCode(value);
    setPromoError(getPromoCodeFormatError(value));
  };

  const isPromoApplyDisabled = isApplyingPromo || Boolean(promoError);

  useEffect(() => {
    if (!uid || isCheckoutLoading) return;

    if (!checkoutData?.checkout) {
      setCheckoutError(
        checkoutData?.message ?? "This checkout was not found or has expired."
      );
      return;
    }

    const current = checkoutData.checkout;

    if (current.status === "expired") {
      setCheckoutError(
        "This checkout has expired. Start again from the buy page."
      );
      return;
    }

    if (
      current.status !== "pending" &&
      current.status !== "failed" &&
      current.status !== "completed"
    ) {
      setCheckoutError("This checkout is no longer available for payment.");
      return;
    }

    setCheckoutError(null);
  }, [checkoutData, isCheckoutLoading, uid]);

  const refreshPaymentMethods = async () => {
    await queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
  };

  const handlePay = async () => {
    if (!uid || !checkout || !billingSelection.isReady) return;

    if (selectedBillingMethod !== "card") {
      toast.message("PayPal and crypto checkout are coming soon.");
      return;
    }

    if (!billingSelection.card) return;

    setIsPaying(true);

    const result = await payConnectCheckoutWithCard(
      uid,
      billingSelection.card.uid
    );

    setIsPaying(false);

    if (!result?.checkout) return;

    if (result.checkout.status === "completed" || result.alreadyPaid) {
      toast.success("Connects purchased successfully.");
      if (typeof result.connectsBalance === "number") {
        dispatch(setConnectsBalance(result.connectsBalance));
      }
      await router.replace("/nx/find-work");
    }
  };

  const isPageLoading =
    !uid || isCheckoutLoading || (isPaymentMethodsLoading && !checkout);

  if (isPageLoading) {
    return (
      <FreelancerLayout
        seo={{
          title: "Buy Connects - Worklanc",
          description: "Buy Connects - Worklanc",
          url: `/nx/payments/checkout/${uid ?? ""}`,
        }}
      >
        <ConnectCheckoutPageSkeleton />
      </FreelancerLayout>
    );
  }

  if (checkoutError || !checkout) {
    return (
      <FreelancerLayout
        seo={{
          title: "Buy Connects - Worklanc",
          description: "Buy Connects - Worklanc",
          url: `/nx/payments/checkout/${uid}`,
        }}
      >
        <div className="rounded-3xl border border-slate-300 p-8 space-y-4 max-w-xl">
          <h1 className="text-2xl font-medium">Checkout unavailable</h1>
          <p className="text-sm text-slate-600">
            {checkoutError ?? "This checkout could not be loaded."}
          </p>
          <Link
            href="/nx/plans/connects/buy"
            className="inline-flex text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Buy Connects
          </Link>
        </div>
      </FreelancerLayout>
    );
  }

  const discountLabel =
    checkout.discountCents > 0
      ? `-${formatCentsToUsd(checkout.discountCents)}`
      : null;

  const authorizationMessage =
    selectedBillingMethod === "crypto" && cryptoToken
      ? `You're authorizing Worklanc to charge ${estimatedTotalLabel} from your connected wallet.`
      : selectedBillingMethod === "paypal"
      ? "You're authorizing Worklanc to charge your PayPal account."
      : `You're authorizing Worklanc to charge ${formatCentsToUsd(
          checkout.totalCents
        )} to your debit or credit card.`;

  const connectsExpireLabel = checkout.connectsExpireAt
    ? formatDate(new Date(checkout.connectsExpireAt), "MMM d, yyyy")
    : null;

  return (
    <FreelancerLayout
      seo={{
        title: "Buy Connects - Worklanc",
        description: "Buy Connects - Worklanc",
        url: `/nx/payments/checkout/${uid}`,
      }}
    >
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">Buy Connects</h1>
        <div>
          <Link
            href="/nx/plans/connects/buy"
            className="text-sm font-light cursor-pointer underline hover:text-blue-600"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="flex border border-slate-300 rounded-3xl">
        <div className="flex-1 p-8 space-y-6">
          <h2 className="text-2xl font-medium">
            Add or Choose a billing method
          </h2>

          <CheckoutBillingMethodSection
            cards={cards}
            cryptoWallets={cryptoWallets}
            paypalAccounts={paypalAccounts}
            isLoading={isPaymentMethodsLoading}
            selectedMethod={selectedBillingMethod}
            onMethodChange={setSelectedBillingMethod}
            onSelectionChange={setBillingSelection}
            onPaymentMethodsChange={refreshPaymentMethods}
          />
        </div>

        <div className="w-1/3 space-y-6 p-8 border-l border-slate-300">
          <div className="flex items-center gap-4">
            <Image src={CoinsIcon} alt="Coins" className="w-[60px] h-auto" />
            <h1 className="text-2xl font-medium">
              Buy {checkout.connectAmount} Connects
            </h1>
          </div>

          <div className="flex items-end gap-4">
            <Input
              type="text"
              label="Promo code"
              name="promoCode"
              placeholder="Enter promo code"
              classname="flex-1!"
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
              classname="py-0! h-10! px-5! rounded-full! text-sm! font-medium! border! shrink-0"
              loading={isApplyingPromo}
              disabled={isPromoApplyDisabled}
              onClick={handleApplyPromo}
            />
          </div>

          {checkout.promoCode && (
            <p className="text-sm text-green-700">
              Promo code applied: {checkout.promoCode}
            </p>
          )}

          <div className="text-sm">
            <p>These Connects will expire on</p>
            <p className="mt-2 text-slate-600">
              {connectsExpireLabel ?? "1 year after you complete purchase"}
            </p>
          </div>

          <div className="w-full h-[1px] bg-slate-300" />

          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span className="text-sm text-slate-600 font-light">
                Subtotal
              </span>
              <span className="text-sm text-slate-600 font-light">
                {subtotalLabel}
              </span>
            </li>

            {discountLabel && (
              <li className="flex items-center justify-between">
                <span className="text-sm text-slate-600 font-light">
                  Promo discount
                </span>
                <span className="text-sm text-green-700 font-light">
                  {discountLabel}
                </span>
              </li>
            )}

            <li className="flex items-center justify-between">
              <span className="text-sm text-slate-600 font-light">
                Estimated taxes
              </span>
              <span className="text-sm text-slate-600 font-light">
                {selectedBillingMethod === "crypto" ? "—" : "--"}
              </span>
            </li>

            <li className="flex items-center justify-between">
              <span className="text-sm font-light">Estimated total</span>
              <span className="text-sm font-light">{estimatedTotalLabel}</span>
            </li>
          </ul>

          {selectedBillingMethod === "crypto" && cryptoToken && (
            <p className="text-xs text-slate-500">
              Price shown in {cryptoToken.symbol}
              {cryptoChain ? ` on ${cryptoChain.label}` : ""}. USD equivalent:{" "}
              {formatUsdAmount(estimatedTotalUsd)}.
            </p>
          )}

          <div className="w-full h-[1px] bg-slate-300" />

          <p className="text-sm text-slate-600 font-light">
            Learn about{" "}
            <Link
              href="#"
              className="underline text-slate-900 cursor-pointer hover:text-blue-600"
            >
              estimated taxes
            </Link>
          </p>

          <div className="space-y-4 text-center">
            <Button
              type="primary"
              label="Buy Connects"
              classname="py-2.5! w-full! rounded-full! text-sm! font-medium!"
              loading={isPaying}
              disabled={
                !billingSelection.isReady ||
                isPaying ||
                estimatedTotalUsd === 0 ||
                estimatedTotalLabel === "Calculating..."
              }
              onClick={handlePay}
            />
            <p className="text-xs text-slate-600">{authorizationMessage}</p>
            <p className="text-xs text-slate-600">
              {connectsExpireLabel
                ? `These Connects expire on ${connectsExpireLabel}.`
                : "This bundle of Connects will expire 1 year after you complete purchase. Unused Connects "}
              {!connectsExpireLabel && (
                <>
                  <Link
                    href="#"
                    className="underline text-slate-900 cursor-pointer hover:text-blue-600"
                  >
                    rollover to the next month
                  </Link>
                  .
                </>
              )}
            </p>

            <div className="flex items-center justify-center gap-2 text-slate-600">
              <Icon icon="lineicons:shield-dollar" className="size-6" />
              <span className="text-base font-light">
                Worklanc Payment Protection
              </span>
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
}

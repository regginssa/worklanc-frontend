import { Button, Input } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import { CheckoutBillingMethodSection } from "@/components/organisms";
import { fetchCryptoPrices, fetchPaymentMethods } from "@/lib/api/payments";
import { getChainById, getPrimaryTokenOption, getTokenOption } from "@/lib/crypto/assets";
import {
  convertUsdToCryptoAmount,
  formatCryptoAmount,
  formatUsdAmount,
} from "@/lib/crypto/pricing";
import type { CheckoutBillingSelection, PaymentMethod } from "@/types/payment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import CoinsIcon from "@/public/assets/svgs/icons/other/coins.svg";

const SUBTOTAL_USD = 15;

export default function CheckoutPage() {
  const [promoCode, setPromoCode] = useState("");
  const [selectedBillingMethod, setSelectedBillingMethod] =
    useState<PaymentMethod>("card");
  const [billingSelection, setBillingSelection] =
    useState<CheckoutBillingSelection>({
      method: "card",
      isReady: false,
    });
  const { uid } = useRouter().query as { uid: string };
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: fetchPaymentMethods,
  });

  const { data: cryptoPriceData, isLoading: isCryptoPricesLoading } = useQuery(
    {
      queryKey: ["crypto-prices"],
      queryFn: fetchCryptoPrices,
      enabled: selectedBillingMethod === "crypto",
      staleTime: 60_000,
    },
  );

  const cards = data?.cards ?? [];
  const cryptoWallets = data?.cryptoWallets ?? [];
  const paypalAccounts = data?.paypalAccounts ?? [];

  const refreshPaymentMethods = async () => {
    await queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
  };

  const estimatedTotalUsd = SUBTOTAL_USD;

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
  const cryptoTotalAmount =
    selectedBillingMethod === "crypto" &&
    cryptoTokenId &&
    typeof cryptoPriceUsd === "number"
      ? convertUsdToCryptoAmount(estimatedTotalUsd, cryptoTokenId, cryptoPriceUsd)
      : null;

  const subtotalLabel = useMemo(() => {
    if (selectedBillingMethod !== "crypto") {
      return formatUsdAmount(SUBTOTAL_USD);
    }

    if (isCryptoPricesLoading || !cryptoToken || !cryptoPriceUsd) {
      return "Calculating...";
    }

    return formatCryptoAmount(
      convertUsdToCryptoAmount(SUBTOTAL_USD, cryptoToken.id, cryptoPriceUsd),
      cryptoToken.id,
      cryptoToken.symbol,
    );
  }, [
    cryptoPriceUsd,
    cryptoToken,
    isCryptoPricesLoading,
    selectedBillingMethod,
  ]);

  const estimatedTotalLabel = useMemo(() => {
    if (selectedBillingMethod !== "crypto") {
      return formatUsdAmount(estimatedTotalUsd);
    }

    if (isCryptoPricesLoading || !cryptoToken || !cryptoPriceUsd) {
      return "Calculating...";
    }

    return formatCryptoAmount(
      convertUsdToCryptoAmount(
        estimatedTotalUsd,
        cryptoToken.id,
        cryptoPriceUsd,
      ),
      cryptoToken.id,
      cryptoToken.symbol,
    );
  }, [
    cryptoPriceUsd,
    cryptoToken,
    estimatedTotalUsd,
    isCryptoPricesLoading,
    selectedBillingMethod,
  ]);

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
            isLoading={isLoading}
            selectedMethod={selectedBillingMethod}
            onMethodChange={setSelectedBillingMethod}
            onSelectionChange={setBillingSelection}
            onPaymentMethodsChange={refreshPaymentMethods}
          />
        </div>

        <div className="w-1/3 space-y-6 p-8 border-l border-slate-300">
          <div className="flex items-center gap-4">
            <Image src={CoinsIcon} alt="Coins" className="w-[60px] h-auto" />
            <h1 className="text-2xl font-medium">Buy 100 Connects</h1>
          </div>

          <div className="flex items-center gap-4">
            <Input
              type="text"
              name="promoCode"
              placeholder="Enter promo code"
              classname="flex-1!"
              value={promoCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPromoCode(e.target.value)
              }
            />
            <Button
              type="outline"
              label="Apply"
              size="medium"
              classname="py-0! h-10! px-5! rounded-full! text-sm! font-medium! border!"
            />
          </div>

          <div className="w-full h-[1px] bg-slate-300"></div>

          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span className="text-sm text-slate-600 font-light">
                Subtotal
              </span>
              <span className="text-sm text-slate-600 font-light">
                {subtotalLabel}
              </span>
            </li>

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
              {cryptoChain ? ` on ${cryptoChain.name}` : ""}. USD equivalent:{" "}
              {formatUsdAmount(estimatedTotalUsd)}.
            </p>
          )}

          <div className="w-full h-[1px] bg-slate-300"></div>

          <p className="text-sm text-slate-600 font-light">
            Learn about{" "}
            <Link
              href="$"
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
              disabled={!billingSelection.isReady}
            />
            <p className="text-xs text-slate-600">
              {selectedBillingMethod === "crypto" && cryptoTotalAmount
                ? `You're authorizing Worklanc to charge ${estimatedTotalLabel} from your connected wallet.`
                : "You're authorizing Worklanc to charge your account."}
            </p>
            <p className="text-xs text-slate-600">
              This bundle of Connects will expire 1 year from today. Unused
              Connects{" "}
              <Link
                href=""
                className="underline text-slate-900 cursor-pointer hover:text-blue-600"
              >
                rollover to the next month
              </Link>
              .
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

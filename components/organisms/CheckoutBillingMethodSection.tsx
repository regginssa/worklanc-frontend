"use client";

import {
  CheckoutCardBillingSection,
  CheckoutCryptoBillingSection,
  PaypalBillingForm,
  SavedCardsListSkeleton,
  SavedCryptoWalletListSkeleton,
  SavedPayPalList,
} from "@/components/molecules";
import type { CryptoTokenId } from "@/lib/crypto/assets";
import {
  type CheckoutBillingSelection,
  type PaymentMethod,
  type SavedCard,
  type SavedCryptoWallet,
  type SavedPayPal,
} from "@/types/payment";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import PaypalLogo from "@/public/assets/svgs/icons/logos/paypal.svg";
import EthLogo from "@/public/assets/svgs/icons/logos/eth.svg";
import SolLogo from "@/public/assets/svgs/icons/logos/sol.svg";
import UsdcLogo from "@/public/assets/svgs/icons/logos/usdc.svg";
import UsdtLogo from "@/public/assets/svgs/icons/logos/usdt.svg";
import BnbLogo from "@/public/assets/svgs/icons/logos/bnb.svg";
import ChrleLogo from "@/public/assets/svgs/icons/logos/chrle.png";
import BabyuLogo from "@/public/assets/svgs/icons/logos/babyu.png";

interface CheckoutBillingMethodSectionProps {
  cards: SavedCard[];
  cryptoWallets: SavedCryptoWallet[];
  paypalAccounts: SavedPayPal[];
  isLoading?: boolean;
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  onSelectionChange: (selection: CheckoutBillingSelection) => void;
  onPaymentMethodsChange: () => void | Promise<void>;
}

export default function CheckoutBillingMethodSection({
  cards,
  cryptoWallets,
  paypalAccounts,
  isLoading = false,
  selectedMethod,
  onMethodChange,
  onSelectionChange,
  onPaymentMethodsChange,
}: CheckoutBillingMethodSectionProps) {
  const [selectedCardUid, setSelectedCardUid] = useState<string | null>(null);
  const [selectedWalletUid, setSelectedWalletUid] = useState<string | null>(
    null,
  );
  const [selectedPaypalUid, setSelectedPaypalUid] = useState<string | null>(
    null,
  );
  const [activeCryptoTokenId, setActiveCryptoTokenId] =
    useState<CryptoTokenId>("chrle");
  const [showAddPayPalForm, setShowAddPayPalForm] = useState(
    paypalAccounts.length === 0,
  );

  useEffect(() => {
    if (paypalAccounts.length === 0) {
      setShowAddPayPalForm(true);
      return;
    }

    if (!selectedPaypalUid) {
      setSelectedPaypalUid(paypalAccounts[0]?.uid ?? null);
    }
  }, [paypalAccounts, selectedPaypalUid]);

  useEffect(() => {
    const selectedCard = cards.find((card) => card.uid === selectedCardUid);
    const selectedWallet = cryptoWallets.find(
      (wallet) => wallet.uid === selectedWalletUid,
    );
    const selectedPaypal = paypalAccounts.find(
      (account) => account.uid === selectedPaypalUid,
    );

    const isReady =
      selectedMethod === "card"
        ? Boolean(selectedCard)
        : selectedMethod === "paypal"
          ? Boolean(selectedPaypal)
          : selectedMethod === "crypto"
            ? Boolean(selectedWallet)
            : false;

    onSelectionChange({
      method: selectedMethod,
      card: selectedCard,
      wallet: selectedWallet,
      paypal: selectedPaypal,
      cryptoTokenId:
        selectedMethod === "crypto" ? activeCryptoTokenId : undefined,
      isReady,
    });
  }, [
    activeCryptoTokenId,
    cards,
    cryptoWallets,
    onSelectionChange,
    paypalAccounts,
    selectedCardUid,
    selectedMethod,
    selectedPaypalUid,
    selectedWalletUid,
  ]);

  const handlePayPalSuccess = async () => {
    setShowAddPayPalForm(false);
    await onPaymentMethodsChange();
  };

  return (
    <ul className="text-sm space-y-4">
      <li className="space-y-6">
        <div className="flex items-center gap-2">
          <Radio
            checked={selectedMethod === "card"}
            onCheck={() => onMethodChange("card")}
          />
          <span>Debit or credit card</span>
          <div className="flex items-center gap-2">
            <Icon icon="logos:visa" className="size-8" />
            <Icon icon="logos:mastercard" className="size-8" />
            <Icon
              icon="streamline-logos:american-express-logo-block"
              className="size-8 text-sky-600"
            />
            <Icon icon="logos:discover" className="size-8" />
            <Icon
              icon="fa7-brands:cc-diners-club"
              className="size-8 text-sky-800"
            />
          </div>
        </div>

        {selectedMethod === "card" &&
          (isLoading ? (
            <SavedCardsListSkeleton />
          ) : (
            <CheckoutCardBillingSection
              cards={cards}
              selectedUid={selectedCardUid}
              onSelect={(card) => setSelectedCardUid(card.uid)}
              onCardsChange={onPaymentMethodsChange}
            />
          ))}
      </li>

      <li className="space-y-6">
        <div className="flex items-center gap-2">
          <Radio
            checked={selectedMethod === "paypal"}
            onCheck={() => onMethodChange("paypal")}
          />
          <Image src={PaypalLogo} alt="Paypal" width={80} height={20} />
        </div>

        {selectedMethod === "paypal" &&
          (isLoading ? (
            <SavedCardsListSkeleton rows={1} />
          ) : paypalAccounts.length > 0 && !showAddPayPalForm ? (
            <div className="space-y-4">
              <SavedPayPalList
                accounts={paypalAccounts}
                selectable
                selectedUid={selectedPaypalUid}
                onSelect={(account) => setSelectedPaypalUid(account.uid)}
              />
              <button
                type="button"
                onClick={() => setShowAddPayPalForm(true)}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Use a different PayPal account
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <PaypalBillingForm onSuccess={handlePayPalSuccess} />
              {paypalAccounts.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAddPayPalForm(false)}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Choose a saved PayPal account
                </button>
              )}
            </div>
          ))}
      </li>

      <li className="space-y-6">
        <div className="flex items-center gap-2">
          <Radio
            checked={selectedMethod === "crypto"}
            onCheck={() => onMethodChange("crypto")}
          />
          <span>Cryptocurrency</span>
          <div className="flex items-center gap-2">
            <Image src={ChrleLogo} alt="CHRLE" width={24} height={24} />
            <Image src={BabyuLogo} alt="BABYU" width={24} height={24} />
            <Image src={EthLogo} alt="Ethereum" width={24} height={24} />
            <Image src={BnbLogo} alt="BNB" width={24} height={24} />
            <Image src={SolLogo} alt="Solana" width={24} height={24} />
            <Image src={UsdtLogo} alt="USDT" width={24} height={24} />
            <Image src={UsdcLogo} alt="USDC" width={24} height={24} />
          </div>
        </div>

        {selectedMethod === "crypto" &&
          (isLoading ? (
            <SavedCryptoWalletListSkeleton />
          ) : (
            <CheckoutCryptoBillingSection
              wallets={cryptoWallets}
              selectedUid={selectedWalletUid}
              selectedTokenId={activeCryptoTokenId}
              onSelect={(wallet) => setSelectedWalletUid(wallet.uid)}
              onTokenChange={setActiveCryptoTokenId}
              onWalletsChange={onPaymentMethodsChange}
            />
          ))}
      </li>
    </ul>
  );
}

function Radio({
  checked,
  onCheck,
}: {
  checked: boolean;
  onCheck: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      onClick={onCheck}
      className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer relative overflow-hidden ${
        checked
          ? "border-black bg-white"
          : "border-slate-400 bg-slate-50 hover:bg-white transition-colors duration-200"
      }`}
    >
      <div
        className={`absolute inset-1 rounded-full transition-all duration-300 ease-out ${
          checked ? "scale(1)" : "scale(0)"
        } ${checked ? "bg-black" : "bg-transparent"}`}
      />
    </motion.div>
  );
}

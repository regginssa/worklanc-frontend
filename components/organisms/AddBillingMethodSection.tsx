import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import PaypalLogo from "@/public/assets/svgs/icons/logos/paypal.svg";
import VenmoLogo from "@/public/assets/svgs/icons/logos/venmo.svg";
import EthLogo from "@/public/assets/svgs/icons/logos/eth.svg";
import SolLogo from "@/public/assets/svgs/icons/logos/sol.svg";
import UsdcLogo from "@/public/assets/svgs/icons/logos/usdc.svg";
import UsdtLogo from "@/public/assets/svgs/icons/logos/usdt.svg";
import BnbLogo from "@/public/assets/svgs/icons/logos/bnb.svg";
import ChrleLogo from "@/public/assets/svgs/icons/logos/chrle.png";
import BabyuLogo from "@/public/assets/svgs/icons/logos/babyu.png";
import { useState } from "react";
import {
  PaymentMethod,
  type SavedCard,
  type SavedCryptoWallet,
} from "@/types/payment";
import {
  CardBillingSection,
  CryptoBillingSection,
  PaypalBillingForm,
  SavedCardsListSkeleton,
  SavedCryptoWalletListSkeleton,
} from "../molecules";

export default function AddBillingMethodSection({
  onCancel,
  cards,
  cryptoWallets,
  onCardsChange,
  onCryptoChange,
  accountType,
  isLoading = false,
}: {
  onCancel: () => void;
  cards: SavedCard[];
  cryptoWallets: SavedCryptoWallet[];
  onCardsChange: () => void | Promise<void>;
  onCryptoChange: () => void | Promise<void>;
  accountType: "talent" | "client";
  isLoading?: boolean;
}) {
  const [selectedBillingMethod, setSelectedBillingMethod] =
    useState<PaymentMethod | null>(
      cards.length > 0 ? "card" : cryptoWallets.length > 0 ? "crypto" : null
    );

  return (
    <section
      id="add-billing-method-section"
      className="p-8 rounded-3xl border border-slate-300 space-y-8"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium">Add a billing method</h3>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="border border-slate-400 cursor-pointer font-medium text-sm hover:bg-slate-50 transition-colors duration-200 rounded-full px-4 py-2"
          onClick={onCancel}
        >
          Cancel
        </motion.button>
      </div>

      <ul className="text-sm space-y-6">
        <li className="space-y-6">
          <div className="flex items-center gap-2">
            <Radio
              checked={selectedBillingMethod === "card"}
              onCheck={() => setSelectedBillingMethod("card")}
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

          {selectedBillingMethod === "card" &&
            (isLoading ? (
              <SavedCardsListSkeleton />
            ) : (
              <CardBillingSection cards={cards} onCardsChange={onCardsChange} />
            ))}
        </li>

        <li className="space-y-6">
          <div className="flex items-center gap-2">
            <Radio
              checked={selectedBillingMethod === "paypal"}
              onCheck={() => setSelectedBillingMethod("paypal")}
            />
            <Image src={PaypalLogo} alt="Paypal" width={80} height={20} />
          </div>

          {selectedBillingMethod === "paypal" && (
            <PaypalBillingForm onSuccess={onCancel} />
          )}
        </li>

        {accountType !== "talent" && (
          <li className="flex items-center gap-2">
            <Radio
              checked={selectedBillingMethod === "venmo"}
              onCheck={() => setSelectedBillingMethod("venmo")}
            />
            <Image src={VenmoLogo} alt="Venmo" width={80} height={10} />
          </li>
        )}

        <li className="space-y-6">
          <div className="flex items-center gap-2">
            <Radio
              checked={selectedBillingMethod === "crypto"}
              onCheck={() => setSelectedBillingMethod("crypto")}
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

          {selectedBillingMethod === "crypto" &&
            (isLoading ? (
              <SavedCryptoWalletListSkeleton />
            ) : (
              <CryptoBillingSection
                wallets={cryptoWallets}
                onWalletsChange={onCryptoChange}
                showAddNewWallet={true}
              />
            ))}
        </li>
      </ul>
    </section>
  );
}

const Radio = ({
  checked,
  onCheck,
}: {
  checked: boolean;
  onCheck: () => void;
}) => {
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
      ></div>
    </motion.div>
  );
};

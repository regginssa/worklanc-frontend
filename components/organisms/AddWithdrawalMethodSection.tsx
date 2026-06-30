"use client";

import type {
  SavedCryptoWithdrawal,
  SavedPayoneerWithdrawal,
} from "@/types/disbursement";
import { CRYPTO_CHAINS } from "@/lib/crypto/assets";
import { motion } from "motion/react";
import Image from "next/image";
import PayoneerLogo from "@/public/assets/svgs/icons/logos/payoneer.svg";
import EthLogo from "@/public/assets/svgs/icons/logos/eth.svg";
import SolLogo from "@/public/assets/svgs/icons/logos/sol.svg";
import UsdcLogo from "@/public/assets/svgs/icons/logos/usdc.svg";
import UsdtLogo from "@/public/assets/svgs/icons/logos/usdt.svg";
import BnbLogo from "@/public/assets/svgs/icons/logos/bnb.svg";
import ChrleLogo from "@/public/assets/svgs/icons/logos/chrle.png";
import BabyuLogo from "@/public/assets/svgs/icons/logos/babyu.png";
import { useMemo, useState } from "react";
import CryptoWithdrawalSection from "../molecules/CryptoWithdrawalSection";
import PayoneerWithdrawalSection from "../molecules/PayoneerWithdrawalSection";

type WithdrawalPickerType = "payoneer" | "crypto";

type CryptoSaveBody = {
  address: string;
  chain: string;
  label?: string;
  message: string;
  signature: string;
};

export default function AddWithdrawalMethodSection({
  onCancel,
  payoneer,
  cryptoWallets,
  onPayoneerRegister,
  onPayoneerDelete,
  onPayoneerRefresh,
  onCryptoSave,
  onCryptoUpdate,
  onCryptoDelete,
  onSetDefaultPayoneer,
  onSetDefaultCrypto,
  showDefaultControl = false,
}: {
  onCancel: () => void;
  payoneer: SavedPayoneerWithdrawal | null;
  cryptoWallets: SavedCryptoWithdrawal[];
  onPayoneerRegister: (
    email: string,
  ) => Promise<{ registrationLink: string } | null | void>;
  onPayoneerDelete: () => void | Promise<void>;
  onPayoneerRefresh?: () => void | Promise<void>;
  onCryptoSave: (
    body: CryptoSaveBody,
  ) => boolean | void | Promise<boolean | void>;
  onCryptoUpdate?: (
    uid: string,
    body: CryptoSaveBody,
  ) => boolean | void | Promise<boolean | void>;
  onCryptoDelete: (wallet: SavedCryptoWithdrawal) => void | Promise<void>;
  onSetDefaultPayoneer?: () => void | Promise<void>;
  onSetDefaultCrypto?: (wallet: SavedCryptoWithdrawal) => void | Promise<void>;
  showDefaultControl?: boolean;
}) {
  const canAddPayoneer = !payoneer;
  const canAddCrypto = cryptoWallets.length < CRYPTO_CHAINS.length;

  const initialMethod = useMemo<WithdrawalPickerType | null>(() => {
    if (canAddPayoneer) return "payoneer";
    if (canAddCrypto) return "crypto";
    return null;
  }, [canAddCrypto, canAddPayoneer]);

  const [selectedMethod, setSelectedMethod] =
    useState<WithdrawalPickerType | null>(initialMethod);

  const nothingToAdd = !canAddPayoneer && !canAddCrypto;

  return (
    <section
      id="add-withdrawal-method-section"
      className="p-8 rounded-3xl border border-slate-300 space-y-8"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium">Add a withdrawal method</h3>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="border border-slate-400 cursor-pointer font-medium text-sm hover:bg-slate-50 transition-colors duration-200 rounded-full px-4 py-2"
          onClick={onCancel}
        >
          Cancel
        </motion.button>
      </div>

      {nothingToAdd ? (
        <p className="text-sm text-slate-600">
          You have already added all available withdrawal methods. Remove a
          method from the list below to replace it.
        </p>
      ) : (
        <ul className="text-sm space-y-6">
          <li className="space-y-6">
            <div className="flex items-center gap-2">
              <Radio
                checked={selectedMethod === "payoneer"}
                disabled={!canAddPayoneer}
                onCheck={() => setSelectedMethod("payoneer")}
              />
              <Image
                src={PayoneerLogo}
                alt="Payoneer"
                width={100}
                height={24}
                className="h-5 w-auto"
              />
              {!canAddPayoneer && (
                <span className="text-xs text-slate-500">Already connected</span>
              )}
            </div>

            {selectedMethod === "payoneer" && canAddPayoneer && (
              <PayoneerWithdrawalSection
                account={null}
                onRegister={onPayoneerRegister}
                onDelete={onPayoneerDelete}
                onRefresh={onPayoneerRefresh}
              />
            )}
          </li>

          <li className="space-y-6">
            <div className="flex items-center gap-2">
              <Radio
                checked={selectedMethod === "crypto"}
                disabled={!canAddCrypto}
                onCheck={() => setSelectedMethod("crypto")}
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
              {!canAddCrypto && (
                <span className="text-xs text-slate-500">All networks added</span>
              )}
            </div>

            {selectedMethod === "crypto" && canAddCrypto && (
              <CryptoWithdrawalSection
                wallets={cryptoWallets}
                onSave={onCryptoSave}
                onUpdate={onCryptoUpdate}
                onDelete={onCryptoDelete}
                onSetDefault={onSetDefaultCrypto}
                showDefaultControl={showDefaultControl}
                showAddNewWallet
              />
            )}
          </li>
        </ul>
      )}

      {showDefaultControl && (payoneer || cryptoWallets.length > 0) && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
          <p className="text-sm font-medium text-slate-900">Default method</p>
          <p className="text-xs text-slate-600">
            Choose which method receives scheduled withdrawals by default.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {payoneer && (
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-sm ${
                  payoneer.isDefault
                    ? "border-black bg-black text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                onClick={() => onSetDefaultPayoneer?.()}
              >
                Payoneer
              </button>
            )}
            {cryptoWallets.map((wallet) => (
              <button
                key={wallet.uid}
                type="button"
                className={`rounded-full border px-4 py-2 text-sm ${
                  wallet.isDefault
                    ? "border-black bg-black text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                onClick={() => onSetDefaultCrypto?.(wallet)}
              >
                Crypto ({wallet.chain})
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const Radio = ({
  checked,
  disabled = false,
  onCheck,
}: {
  checked: boolean;
  disabled?: boolean;
  onCheck: () => void;
}) => {
  return (
    <motion.div
      whileTap={disabled ? undefined : { scale: 0.95 }}
      onClick={disabled ? undefined : onCheck}
      className={`w-5 h-5 rounded-full border flex items-center justify-center relative overflow-hidden ${
        disabled
          ? "border-slate-200 bg-slate-100 cursor-not-allowed opacity-50"
          : checked
            ? "border-black bg-white cursor-pointer"
            : "border-slate-400 bg-slate-50 hover:bg-white transition-colors duration-200 cursor-pointer"
      }`}
    >
      <div
        className={`absolute inset-1 rounded-full transition-all duration-300 ease-out ${
          checked ? "scale(1)" : "scale(0)"
        } ${checked ? "bg-black" : "bg-transparent"}`}
      />
    </motion.div>
  );
};

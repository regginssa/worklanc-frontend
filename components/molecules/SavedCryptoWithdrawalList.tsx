"use client";

import { IconButton } from "@/components/atoms";
import {
  getChainById,
  getTokenOption,
  shortenAddress,
  type CryptoChainId,
  type CryptoTokenId,
} from "@/lib/crypto/assets";
import type { SavedCryptoWithdrawal } from "@/types/disbursement";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion } from "motion/react";

interface SavedCryptoWithdrawalListProps {
  wallets: SavedCryptoWithdrawal[];
  onEdit?: (wallet: SavedCryptoWithdrawal) => void;
  onDelete?: (wallet: SavedCryptoWithdrawal) => void;
  deletingUid?: string | null;
  onSetDefault?: (wallet: SavedCryptoWithdrawal) => void;
  showDefaultControl?: boolean;
}

export default function SavedCryptoWithdrawalList({
  wallets,
  onEdit,
  onDelete,
  deletingUid = null,
  onSetDefault,
  showDefaultControl = true,
}: SavedCryptoWithdrawalListProps) {
  if (wallets.length === 0) return null;

  return (
    <ul className="space-y-3">
      {wallets.map((wallet) => {
        const chain = getChainById(wallet.chain as CryptoChainId);
        const token = wallet.token
          ? getTokenOption(wallet.chain, wallet.token as CryptoTokenId)
          : null;

        return (
          <li
            key={wallet.uid}
            className="flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {chain?.icon ? (
                <Image
                  src={chain.icon}
                  alt={chain.label}
                  width={32}
                  height={32}
                  className="size-8 shrink-0 rounded-full"
                />
              ) : (
                <Icon
                  icon="mdi:wallet-outline"
                  className="size-8 shrink-0 text-slate-600"
                />
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-slate-900">
                    {wallet.label || chain?.label || "Crypto wallet"}
                  </p>
                  {wallet.isDefault && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-slate-600 font-mono text-sm">
                  {shortenAddress(wallet.address)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {chain?.label ?? wallet.chain}
                  {token ? ` · ${token.symbol}` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {showDefaultControl && !wallet.isDefault && onSetDefault && (
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:underline px-2"
                  onClick={() => onSetDefault(wallet)}
                  disabled={deletingUid === wallet.uid}
                >
                  Set as default
                </button>
              )}
              {onEdit && (
                <IconButton
                  variant="text"
                  icon="mdi:pencil-outline"
                  onClick={() => onEdit(wallet)}
                  disabled={deletingUid === wallet.uid}
                />
              )}
              {onDelete && (
                <IconButton
                  variant="text"
                  icon="mdi:delete-outline"
                  onClick={() => onDelete(wallet)}
                  loading={deletingUid === wallet.uid}
                  disabled={
                    deletingUid !== null && deletingUid !== wallet.uid
                  }
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function SavedCryptoWithdrawalListSkeleton({ rows = 1 }: { rows?: number }) {
  return (
    <ul className="space-y-3" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <li
          key={index}
          className="flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0"
        >
          <div className="size-8 shrink-0 rounded-full bg-slate-200 animate-pulse" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-36 rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
            <div className="h-3 w-28 rounded bg-slate-200 animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function SelectionRadio({ checked }: { checked: boolean }) {
  return (
    <motion.div
      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 relative overflow-hidden ${
        checked ? "border-black bg-white" : "border-slate-400 bg-slate-50"
      }`}
    >
      <div
        className={`absolute inset-1 rounded-full transition-all duration-300 ease-out ${
          checked ? "scale(1) bg-black" : "scale(0) bg-transparent"
        }`}
      />
    </motion.div>
  );
}

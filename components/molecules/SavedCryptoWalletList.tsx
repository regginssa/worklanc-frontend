import { IconButton } from "@/components/atoms";
import {
  getChainById,
  shortenAddress,
  type CryptoChainId,
} from "@/lib/crypto/assets";
import type { SavedCryptoWallet } from "@/types/payment";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion } from "motion/react";

interface SavedCryptoWalletListProps {
  wallets: SavedCryptoWallet[];
  onEdit?: (wallet: SavedCryptoWallet) => void;
  onDelete?: (wallet: SavedCryptoWallet) => void;
  deletingUid?: string | null;
  selectable?: boolean;
  selectedUid?: string | null;
  onSelect?: (wallet: SavedCryptoWallet) => void;
}

export default function SavedCryptoWalletList({
  wallets,
  onEdit,
  onDelete,
  deletingUid = null,
  selectable = false,
  selectedUid = null,
  onSelect,
}: SavedCryptoWalletListProps) {
  if (wallets.length === 0) return null;

  return (
    <ul className="space-y-3">
      {wallets.map((wallet) => {
        const chain = getChainById(wallet.chain as CryptoChainId);

        return (
          <li
            key={wallet.uid}
            className={`flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0 ${
              selectable ? "cursor-pointer" : ""
            }`}
            onClick={selectable ? () => onSelect?.(wallet) : undefined}
          >
            {selectable && (
              <SelectionRadio checked={selectedUid === wallet.uid} />
            )}

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
                <p className="font-medium text-slate-900">
                  {wallet.label || chain?.label || "Crypto wallet"}
                </p>
                <p className="text-slate-600 font-mono text-sm">
                  {shortenAddress(wallet.address)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {chain?.label ?? wallet.chain}
                </p>
              </div>
            </div>

            {!selectable && onEdit && onDelete && (
              <div className="flex items-center gap-1 shrink-0">
                <IconButton
                  variant="text"
                  icon="mdi:pencil-outline"
                  onClick={() => {
                    onEdit(wallet);
                  }}
                  disabled={deletingUid === wallet.uid}
                />
                <IconButton
                  variant="text"
                  icon="mdi:delete-outline"
                  onClick={() => {
                    onDelete(wallet);
                  }}
                  loading={deletingUid === wallet.uid}
                  disabled={deletingUid !== null && deletingUid !== wallet.uid}
                />
              </div>
            )}
          </li>
        );
      })}
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

export function SavedCryptoWalletListSkeleton({ rows = 1 }: { rows?: number }) {
  return (
    <ul className="space-y-3" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <li
          key={index}
          className="flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0"
        >
          <div className="size-8 shrink-0 rounded-full bg-slate-200 animate-pulse" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-28 rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-36 rounded bg-slate-200 animate-pulse" />
            <div className="h-3 w-24 rounded bg-slate-200 animate-pulse" />
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <div className="size-9 rounded-full bg-slate-200 animate-pulse" />
            <div className="size-9 rounded-full bg-slate-200 animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
}

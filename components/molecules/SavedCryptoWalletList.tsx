"use client";

import { IconButton } from "@/components/atoms";
import {
  getChainById,
  getTokenOption,
  shortenAddress,
  type CryptoChainId,
  type CryptoTokenId,
} from "@/lib/crypto/assets";
import type { SavedCryptoWallet } from "@/types/payment";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface SavedCryptoWalletListProps {
  wallets: SavedCryptoWallet[];
  onEdit: (wallet: SavedCryptoWallet) => void;
  onDelete: (wallet: SavedCryptoWallet) => void;
  deletingUid?: string | null;
}

export default function SavedCryptoWalletList({
  wallets,
  onEdit,
  onDelete,
  deletingUid = null,
}: SavedCryptoWalletListProps) {
  if (wallets.length === 0) return null;

  return (
    <ul className="space-y-3">
      {wallets.map((wallet) => {
        const chain = getChainById(wallet.chain as CryptoChainId);
        const token = getTokenOption(
          wallet.chain as CryptoChainId,
          wallet.token as CryptoTokenId,
        );

        return (
          <li
            key={wallet.uid}
            className="flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {token?.icon ? (
                <Image
                  src={token.icon}
                  alt={token.symbol}
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
                  {wallet.label || token?.label || "Crypto wallet"}
                </p>
                <p className="text-slate-600 font-mono text-sm">
                  {shortenAddress(wallet.address)}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {chain?.label ?? wallet.chain} ·{" "}
                  {token?.symbol ?? wallet.token.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <IconButton
                variant="text"
                icon="mdi:pencil-outline"
                onClick={() => onEdit(wallet)}
                disabled={deletingUid === wallet.uid}
              />
              <IconButton
                variant="text"
                icon="mdi:delete-outline"
                onClick={() => onDelete(wallet)}
                loading={deletingUid === wallet.uid}
                disabled={deletingUid !== null && deletingUid !== wallet.uid}
              />
            </div>
          </li>
        );
      })}
    </ul>
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

"use client";

import type { SavedPayPal } from "@/types/payment";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion } from "motion/react";
import PaypalLogo from "@/public/assets/svgs/icons/logos/paypal.svg";

interface SavedPayPalListProps {
  accounts: SavedPayPal[];
  selectable?: boolean;
  selectedUid?: string | null;
  onSelect?: (account: SavedPayPal) => void;
}

export default function SavedPayPalList({
  accounts,
  selectable = false,
  selectedUid = null,
  onSelect,
}: SavedPayPalListProps) {
  if (accounts.length === 0) return null;

  return (
    <ul className="space-y-3">
      {accounts.map((account) => (
        <li
          key={account.uid}
          className={`flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0 ${
            selectable ? "cursor-pointer" : ""
          }`}
          onClick={selectable ? () => onSelect?.(account) : undefined}
        >
          {selectable && (
            <SelectionRadio checked={selectedUid === account.uid} />
          )}

          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Image
              src={PaypalLogo}
              alt="PayPal"
              width={64}
              height={16}
              className="h-4 w-auto shrink-0"
            />
            <div className="min-w-0">
              <p className="text-slate-900">
                {account.email ?? "PayPal account"}
              </p>
              {!account.email && (
                <p className="text-xs text-slate-500 mt-0.5">
                  Connected PayPal account
                </p>
              )}
            </div>
          </div>

          {!selectable && (
            <Icon
              icon="mdi:check-circle-outline"
              className="size-5 shrink-0 text-emerald-600"
            />
          )}
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

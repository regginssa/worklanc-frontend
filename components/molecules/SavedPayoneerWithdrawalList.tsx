"use client";

import { IconButton } from "@/components/atoms";
import type { SavedPayoneerWithdrawal } from "@/types/disbursement";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion } from "motion/react";
import PayoneerLogo from "@/public/assets/svgs/icons/logos/payoneer.svg";

interface SavedPayoneerWithdrawalListProps {
  account: SavedPayoneerWithdrawal;
  onDelete?: () => void;
  deleting?: boolean;
  onSetDefault?: () => void;
  showDefaultControl?: boolean;
}

export default function SavedPayoneerWithdrawalList({
  account,
  onDelete,
  deleting = false,
  onSetDefault,
  showDefaultControl = true,
}: SavedPayoneerWithdrawalListProps) {
  return (
    <ul className="space-y-3">
      <li className="flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Image src={PayoneerLogo} alt="Payoneer" width={80} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-slate-900">{account.email}</p>
              {account.isDefault && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  Default
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 capitalize">
              {account.status === "active"
                ? "Connected"
                : "Pending verification"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {showDefaultControl && !account.isDefault && onSetDefault && (
            <button
              type="button"
              className="text-xs text-blue-600 hover:underline px-2"
              onClick={onSetDefault}
              disabled={deleting}
            >
              Set as default
            </button>
          )}
          {onDelete && (
            <IconButton
              variant="text"
              icon="mdi:delete-outline"
              onClick={onDelete}
              loading={deleting}
              disabled={deleting}
            />
          )}
          {!onDelete && (
            <Icon
              icon="mdi:check-circle-outline"
              className="size-5 shrink-0 text-emerald-600"
            />
          )}
        </div>
      </li>
    </ul>
  );
}

export function SavedPayoneerWithdrawalListSkeleton() {
  return (
    <ul className="space-y-3" aria-hidden="true">
      <li className="flex items-center gap-4 py-3 border-b border-slate-200">
        <div className="h-5 w-24 rounded bg-slate-200 animate-pulse" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
          <div className="h-3 w-24 rounded bg-slate-200 animate-pulse" />
        </div>
      </li>
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

export function SavedPayoneerWithdrawalSelectable({
  account,
  selected,
  onSelect,
}: {
  account: SavedPayoneerWithdrawal;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0 cursor-pointer text-left"
      onClick={onSelect}
    >
      <SelectionRadio checked={selected} />
      <Image
        src={PayoneerLogo}
        alt="Payoneer"
        width={96}
        height={24}
        className="h-5 w-auto shrink-0"
      />
      <span className="text-slate-900">{account.email}</span>
    </button>
  );
}

"use client";

import { IconButton } from "@/components/atoms";
import type { SavedPayoneerWithdrawal } from "@/types/disbursement";
import { Icon } from "@iconify/react";
import Image from "next/image";
import PayoneerLogo from "@/public/assets/svgs/icons/logos/payoneer.svg";

interface SavedPayoneerWithdrawalListProps {
  account: SavedPayoneerWithdrawal;
  onDelete?: () => void;
  deleting?: boolean;
  onSetDefault?: () => void;
  onRefresh?: () => void;
  showDefaultControl?: boolean;
}

const STATUS_LABELS: Record<SavedPayoneerWithdrawal["status"], string> = {
  pending: "Pending verification",
  active: "Connected",
  inactive: "Inactive",
  declined: "Declined",
};

export default function SavedPayoneerWithdrawalList({
  account,
  onDelete,
  deleting = false,
  onSetDefault,
  onRefresh,
  showDefaultControl = true,
}: SavedPayoneerWithdrawalListProps) {
  const isPending = account.status === "pending";

  return (
    <ul className="space-y-3">
      <li className="flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Image
            src={PayoneerLogo}
            alt="Payoneer"
            width={96}
            height={24}
            className="h-5 w-auto shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium text-slate-900">{account.email}</p>
              {account.isDefault && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  Default
                </span>
              )}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  account.status === "active"
                    ? "bg-emerald-50 text-emerald-700"
                    : account.status === "pending"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {STATUS_LABELS[account.status]}
              </span>
            </div>
            {isPending && account.registrationLink && (
              <a
                href={account.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 underline mt-1 inline-block"
              >
                Complete Payoneer setup
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {isPending && onRefresh && (
            <button
              type="button"
              className="text-xs text-blue-600 hover:underline px-2"
              onClick={onRefresh}
              disabled={deleting}
            >
              Refresh status
            </button>
          )}
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
          {!onDelete && account.status === "active" && (
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

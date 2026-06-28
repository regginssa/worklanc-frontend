"use client";

import { IconButton } from "@/components/atoms";
import {
  formatCardBrand,
  formatCardNumber,
  getCardBrandIcon,
  type SavedCard,
} from "@/types/payment";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

interface SavedCardsListProps {
  cards: SavedCard[];
  onEdit: (card: SavedCard) => void;
  onDelete: (card: SavedCard) => void;
  deletingUid?: string | null;
}

export default function SavedCardsList({
  cards,
  onEdit,
  onDelete,
  deletingUid = null,
}: SavedCardsListProps) {
  if (cards.length === 0) return null;

  return (
    <ul className="space-y-3">
      {cards.map((card) => (
        <li
          key={card.uid}
          className="flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Icon
              icon={getCardBrandIcon(card.brand)}
              className="size-8 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-slate-600 tabular-nums tracking-wide">
                {formatCardNumber(card.last4)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <IconButton
              variant="text"
              icon="mdi:pencil-outline"
              onClick={() => onEdit(card)}
              disabled={deletingUid === card.uid}
            />
            <IconButton
              variant="text"
              icon="mdi:delete-outline"
              onClick={() => onDelete(card)}
              loading={deletingUid === card.uid}
              disabled={deletingUid !== null && deletingUid !== card.uid}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

interface AddNewCardButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function AddNewCardButton({ onClick, disabled }: AddNewCardButtonProps) {
  return (
    <motion.button
      type="button"
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className="text-blue-600 cursor-pointer hover:underline text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon icon="mdi:plus" className="size-5" />
      Add new card
    </motion.button>
  );
}

export function SavedCardsListSkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <ul className="space-y-3" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <li
          key={index}
          className="flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0"
        >
          <div className="size-8 shrink-0 rounded bg-slate-200 animate-pulse" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
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

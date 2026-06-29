import { IconButton } from "@/components/atoms";
import {
  formatCardNumber,
  getCardBrandIcon,
  type SavedCard,
} from "@/types/payment";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

interface SavedCardsListProps {
  cards: SavedCard[];
  onEdit?: (card: SavedCard) => void;
  onDelete?: (card: SavedCard) => void;
  deletingUid?: string | null;
  selectable?: boolean;
  selectedUid?: string | null;
  onSelect?: (card: SavedCard) => void;
}

export default function SavedCardsList({
  cards,
  onEdit,
  onDelete,
  deletingUid = null,
  selectable = false,
  selectedUid = null,
  onSelect,
}: SavedCardsListProps) {
  if (cards.length === 0) return null;

  return (
    <ul className="space-y-3">
      {cards.map((card) => (
        <li
          key={card.uid}
          className={`flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0 ${
            selectable ? "cursor-pointer" : ""
          }`}
          onClick={selectable ? () => onSelect?.(card) : undefined}
        >
          {selectable && (
            <SelectionRadio checked={selectedUid === card.uid} />
          )}

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

          {!selectable && onEdit && onDelete && (
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

export function SavedCardsListSkeleton({ rows = 1 }: { rows?: number }) {
  return (
    <ul className="space-y-3" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <li
          key={index}
          className="flex items-center gap-4 py-3 border-b border-slate-200 last:border-b-0"
        >
          <div className="size-8 shrink-0 rounded bg-slate-200 animate-pulse" />
          <div className="min-w-0 flex-1 space-y-2">
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

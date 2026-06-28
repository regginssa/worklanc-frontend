"use client";

import {
  deletePaymentMethod,
  saveStripePaymentMethod,
  updateStripePaymentMethod,
} from "@/lib/api/payments";
import type { SavedCard } from "@/types/payment";
import { useState } from "react";
import { toast } from "sonner";
import SavedCardsList from "./SavedCardsList";
import StripeBillingForm from "./StripeBillingForm";

interface CardBillingSectionProps {
  cards: SavedCard[];
  onCardsChange: () => void | Promise<void>;
}

export default function CardBillingSection({
  cards,
  onCardsChange,
}: CardBillingSectionProps) {
  const [editingCard, setEditingCard] = useState<SavedCard | null>(null);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);

  const handleSave = async (paymentMethodId: string) => {
    const result = editingCard
      ? await updateStripePaymentMethod(editingCard.uid, paymentMethodId)
      : await saveStripePaymentMethod(paymentMethodId);

    if (!result?.card) return;

    toast.success(editingCard ? "Card updated." : "Card saved.");
    setEditingCard(null);
    await onCardsChange();
  };

  const handleDelete = async (card: SavedCard) => {
    setDeletingUid(card.uid);
    const result = await deletePaymentMethod(card.uid);
    setDeletingUid(null);

    if (!result?.success) return;

    toast.success("Card removed.");
    if (editingCard?.uid === card.uid) {
      setEditingCard(null);
    }
    await onCardsChange();
  };

  const handleCancelForm = () => {
    setEditingCard(null);
  };

  if (cards.length === 0 || editingCard) {
    return (
      <StripeBillingForm
        onSave={handleSave}
        onCancel={cards.length > 0 ? handleCancelForm : undefined}
        saveLabel={editingCard ? "Update card" : "Save"}
      />
    );
  }

  return (
    <SavedCardsList
      cards={cards}
      onEdit={setEditingCard}
      onDelete={handleDelete}
      deletingUid={deletingUid}
    />
  );
}

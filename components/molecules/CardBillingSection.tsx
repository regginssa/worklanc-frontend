"use client";

import {
  deletePaymentMethod,
  saveStripePaymentMethod,
  updateStripePaymentMethod,
} from "@/lib/api/payments";
import type { SavedCard } from "@/types/payment";
import { useState } from "react";
import { toast } from "sonner";
import SavedCardsList, { AddNewCardButton } from "./SavedCardsList";
import StripeBillingForm from "./StripeBillingForm";

interface CardBillingSectionProps {
  cards: SavedCard[];
  onCardsChange: () => void | Promise<void>;
}

export default function CardBillingSection({
  cards,
  onCardsChange,
}: CardBillingSectionProps) {
  const [showAddForm, setShowAddForm] = useState(cards.length === 0);
  const [editingCard, setEditingCard] = useState<SavedCard | null>(null);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);

  const handleSave = async (paymentMethodId: string) => {
    const result = editingCard
      ? await updateStripePaymentMethod(editingCard.uid, paymentMethodId)
      : await saveStripePaymentMethod(paymentMethodId);

    if (!result?.card) return;

    toast.success(editingCard ? "Card updated." : "Card saved.");
    setShowAddForm(false);
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
      setShowAddForm(cards.length <= 1);
    }
    await onCardsChange();
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingCard(null);
  };

  if (showAddForm || editingCard) {
    return (
      <StripeBillingForm
        onSave={handleSave}
        onCancel={cards.length > 0 || editingCard ? handleCancelForm : undefined}
        saveLabel={editingCard ? "Update card" : "Save"}
      />
    );
  }

  return (
    <div className="space-y-4">
      <SavedCardsList
        cards={cards}
        onEdit={(card) => {
          setEditingCard(card);
          setShowAddForm(false);
        }}
        onDelete={handleDelete}
        deletingUid={deletingUid}
      />
      <AddNewCardButton onClick={() => setShowAddForm(true)} />
    </div>
  );
}

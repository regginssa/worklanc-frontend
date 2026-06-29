"use client";

import { saveStripePaymentMethod } from "@/lib/api/payments";
import type { SavedCard } from "@/types/payment";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SavedCardsList from "./SavedCardsList";
import StripeBillingForm from "./StripeBillingForm";

interface CheckoutCardBillingSectionProps {
  cards: SavedCard[];
  selectedUid: string | null;
  onSelect: (card: SavedCard) => void;
  onCardsChange: () => void | Promise<void>;
}

export default function CheckoutCardBillingSection({
  cards,
  selectedUid,
  onSelect,
  onCardsChange,
}: CheckoutCardBillingSectionProps) {
  const [showAddForm, setShowAddForm] = useState(cards.length === 0);

  useEffect(() => {
    if (cards.length === 0) {
      setShowAddForm(true);
      return;
    }

    if (!selectedUid && cards[0]) {
      onSelect(cards[0]);
    }
  }, [cards, selectedUid]);

  const handleSave = async (paymentMethodId: string) => {
    const result = await saveStripePaymentMethod(paymentMethodId);
    if (!result?.card) return;

    toast.success("Card saved.");
    setShowAddForm(false);
    await onCardsChange();
    onSelect(result.card);
  };

  if (showAddForm || cards.length === 0) {
    return (
      <div className="space-y-4">
        <StripeBillingForm
          onSave={handleSave}
          onCancel={cards.length > 0 ? () => setShowAddForm(false) : undefined}
          saveLabel="Save card"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SavedCardsList
        cards={cards}
        selectable
        selectedUid={selectedUid}
        onSelect={onSelect}
      />
      {/* <button
        type="button"
        onClick={() => setShowAddForm(true)}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Use a different card
      </button> */}
    </div>
  );
}

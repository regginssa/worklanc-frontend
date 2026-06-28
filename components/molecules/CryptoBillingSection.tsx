"use client";

import {
  deletePaymentMethod,
  saveCryptoWallet,
  updateCryptoWallet,
} from "@/lib/api/payments";
import type { SavedCryptoWallet } from "@/types/payment";
import { useState } from "react";
import { toast } from "sonner";
import CryptoBillingForm from "./CryptoBillingForm";
import SavedCryptoWalletList from "./SavedCryptoWalletList";

interface CryptoBillingSectionProps {
  wallets: SavedCryptoWallet[];
  onWalletsChange: () => void | Promise<void>;
}

export default function CryptoBillingSection({
  wallets,
  onWalletsChange,
}: CryptoBillingSectionProps) {
  const [editingWallet, setEditingWallet] = useState<SavedCryptoWallet | null>(
    null,
  );
  const [deletingUid, setDeletingUid] = useState<string | null>(null);

  const handleSave = async (body: {
    address: string;
    chain: string;
    token: string;
    label?: string;
    message: string;
    signature: string;
  }) => {
    const result = editingWallet
      ? await updateCryptoWallet(editingWallet.uid, body)
      : await saveCryptoWallet(body);

    if (!result?.wallet) return false;

    toast.success(editingWallet ? "Wallet updated." : "Crypto wallet connected.");
    setEditingWallet(null);
    await onWalletsChange();
    return true;
  };

  const handleDelete = async (wallet: SavedCryptoWallet) => {
    setDeletingUid(wallet.uid);
    const result = await deletePaymentMethod(wallet.uid);
    setDeletingUid(null);

    if (!result?.success) return;

    toast.success("Wallet removed.");
    if (editingWallet?.uid === wallet.uid) {
      setEditingWallet(null);
    }
    await onWalletsChange();
  };

  const handleCancelForm = () => {
    setEditingWallet(null);
  };

  if (wallets.length === 0 || editingWallet) {
    return (
      <CryptoBillingForm
        editingWallet={editingWallet}
        onSave={handleSave}
        onCancel={wallets.length > 0 ? handleCancelForm : undefined}
        saveLabel={editingWallet ? "Update wallet" : "Verify and save wallet"}
      />
    );
  }

  return (
    <SavedCryptoWalletList
      wallets={wallets}
      onEdit={setEditingWallet}
      onDelete={handleDelete}
      deletingUid={deletingUid}
    />
  );
}

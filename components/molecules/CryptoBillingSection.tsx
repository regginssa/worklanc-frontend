"use client";

import {
  deletePaymentMethod,
  saveCryptoWallet,
  updateCryptoWallet,
} from "@/lib/api/payments";
import { CRYPTO_CHAINS } from "@/lib/crypto/assets";
import type { SavedCryptoWallet } from "@/types/payment";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import CryptoBillingForm from "./CryptoBillingForm";
import SavedCryptoWalletList from "./SavedCryptoWalletList";

interface CryptoBillingSectionProps {
  wallets: SavedCryptoWallet[];
  onWalletsChange: () => void | Promise<void>;
  showAddNewWallet?: boolean;
}

export default function CryptoBillingSection({
  wallets,
  onWalletsChange,
  showAddNewWallet = false,
}: CryptoBillingSectionProps) {
  const [editingWallet, setEditingWallet] = useState<SavedCryptoWallet | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState(wallets.length === 0);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);

  const handleSave = async (body: {
    address: string;
    chain: string;
    label?: string;
    message: string;
    signature: string;
  }) => {
    const result = editingWallet
      ? await updateCryptoWallet(editingWallet.uid, body)
      : await saveCryptoWallet(body);

    if (!result?.wallet) return false;

    toast.success(
      editingWallet ? "Wallet updated." : "Crypto wallet connected."
    );
    setEditingWallet(null);
    setShowAddForm(false);
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

  const handleEdit = (wallet: SavedCryptoWallet) => {
    setShowAddForm(false);
    setEditingWallet(wallet);
  };

  const handleCancelEdit = () => {
    setEditingWallet(null);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {wallets.length > 0 && (
        <SavedCryptoWalletList
          wallets={wallets}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingUid={deletingUid}
        />
      )}

      {editingWallet && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
          <CryptoBillingForm
            key={`edit-${editingWallet.uid}`}
            editingWallet={editingWallet}
            lockNetwork
            existingWallets={wallets}
            onSave={handleSave}
            onCancel={handleCancelEdit}
            saveLabel="Update wallet"
          />
        </div>
      )}

      {!editingWallet && (showAddForm || wallets.length === 0) && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
          <CryptoBillingForm
            key="add"
            existingWallets={wallets}
            onSave={handleSave}
            onCancel={wallets.length > 0 ? handleCancelAdd : undefined}
            saveLabel="Verify and save wallet"
          />
        </div>
      )}

      {!editingWallet &&
        wallets.length > 0 &&
        wallets.length < CRYPTO_CHAINS.length &&
        !showAddForm &&
        showAddNewWallet && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 cursor-pointer hover:underline text-sm font-medium flex items-center gap-2"
            onClick={() => setShowAddForm(true)}
          >
            <Icon icon="mdi:plus" className="size-5" />
            Add new wallet
          </motion.button>
        )}
    </div>
  );
}

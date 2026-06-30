"use client";

import { CRYPTO_CHAINS } from "@/lib/crypto/assets";
import type { SavedCryptoWithdrawal } from "@/types/disbursement";
import type { SavedCryptoWallet } from "@/types/payment";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import CryptoBillingForm from "./CryptoBillingForm";
import SavedCryptoWithdrawalList from "./SavedCryptoWithdrawalList";

type CryptoWithdrawalSaveBody = {
  address: string;
  chain: string;
  label?: string;
  message: string;
  signature: string;
};

interface CryptoWithdrawalSectionProps {
  wallets: SavedCryptoWithdrawal[];
  onSave: (
    body: CryptoWithdrawalSaveBody,
  ) => boolean | void | Promise<boolean | void>;
  onUpdate?: (
    uid: string,
    body: CryptoWithdrawalSaveBody,
  ) => boolean | void | Promise<boolean | void>;
  onDelete: (wallet: SavedCryptoWithdrawal) => void | Promise<void>;
  onSetDefault?: (wallet: SavedCryptoWithdrawal) => void | Promise<void>;
  showDefaultControl?: boolean;
  showAddNewWallet?: boolean;
}

export default function CryptoWithdrawalSection({
  wallets,
  onSave,
  onUpdate,
  onDelete,
  onSetDefault,
  showDefaultControl = true,
  showAddNewWallet = false,
}: CryptoWithdrawalSectionProps) {
  const [editingWallet, setEditingWallet] = useState<SavedCryptoWithdrawal | null>(
    null,
  );
  const [showAddForm, setShowAddForm] = useState(wallets.length === 0);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);

  const existingWalletsAdapter: SavedCryptoWallet[] = wallets.map((wallet) => ({
    uid: wallet.uid,
    type: "crypto",
    provider: "crypto",
    address: wallet.address,
    chain: wallet.chain,
    token: wallet.token,
    label: wallet.label,
    isDefault: wallet.isDefault,
    createdAt: wallet.createdAt,
  }));

  const handleSave = async (body: CryptoWithdrawalSaveBody) => {
    const result = editingWallet
      ? await onUpdate?.(editingWallet.uid, body)
      : await onSave(body);

    if (result === false) return false;

    toast.success(
      editingWallet ? "Withdrawal wallet updated." : "Withdrawal wallet connected.",
    );
    setEditingWallet(null);
    setShowAddForm(false);
    return true;
  };

  const handleDelete = async (wallet: SavedCryptoWithdrawal) => {
    setDeletingUid(wallet.uid);
    try {
      await onDelete(wallet);
      toast.success("Withdrawal wallet removed.");
      if (editingWallet?.uid === wallet.uid) {
        setEditingWallet(null);
      }
    } finally {
      setDeletingUid(null);
    }
  };

  const editingWalletAdapter = editingWallet
    ? {
        uid: editingWallet.uid,
        type: "crypto" as const,
        provider: "crypto" as const,
        address: editingWallet.address,
        chain: editingWallet.chain,
        token: editingWallet.token,
        label: editingWallet.label,
        isDefault: editingWallet.isDefault,
        createdAt: editingWallet.createdAt,
      }
    : null;

  return (
    <div className="space-y-6">
      {wallets.length > 0 && (
        <SavedCryptoWithdrawalList
          wallets={wallets}
          onEdit={(wallet) => {
            setShowAddForm(false);
            setEditingWallet(wallet);
          }}
          onDelete={handleDelete}
          deletingUid={deletingUid}
          onSetDefault={onSetDefault}
          showDefaultControl={showDefaultControl}
        />
      )}

      {editingWallet && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
          <CryptoBillingForm
            key={`edit-${editingWallet.uid}`}
            variant="withdrawal"
            editingWallet={editingWalletAdapter}
            lockNetwork
            existingWallets={existingWalletsAdapter}
            onSave={handleSave}
            onCancel={() => setEditingWallet(null)}
            saveLabel="Update wallet"
          />
        </div>
      )}

      {!editingWallet && (showAddForm || wallets.length === 0) && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
          <CryptoBillingForm
            key="add"
            variant="withdrawal"
            existingWallets={existingWalletsAdapter}
            onSave={handleSave}
            onCancel={wallets.length > 0 ? () => setShowAddForm(false) : undefined}
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

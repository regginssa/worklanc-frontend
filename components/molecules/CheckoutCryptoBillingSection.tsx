"use client";

import CryptoAssetDropdown from "@/components/molecules/CryptoAssetDropdown";
import {
  deletePaymentMethod,
  saveCryptoWallet,
  updateCryptoWallet,
} from "@/lib/api/payments";
import {
  CRYPTO_CHAINS,
  getChainById,
  getChainForToken,
  getDefaultTokenForChain,
  getTokensForChain,
  type CryptoChainId,
  type CryptoTokenId,
} from "@/lib/crypto/assets";
import { useEvmChainSwitch } from "@/hooks/useEvmChainSwitch";
import type { SavedCryptoWallet } from "@/types/payment";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import CryptoBillingForm from "./CryptoBillingForm";
import SavedCryptoWalletList from "./SavedCryptoWalletList";

interface CheckoutCryptoBillingSectionProps {
  wallets: SavedCryptoWallet[];
  selectedUid: string | null;
  selectedTokenId: CryptoTokenId;
  onSelect: (wallet: SavedCryptoWallet) => void;
  onTokenChange: (tokenId: CryptoTokenId) => void;
  onWalletsChange: () => void | Promise<void>;
}

function tokenBelongsToChain(tokenId: CryptoTokenId, chainId: CryptoChainId) {
  return getTokensForChain(chainId).some((token) => token.id === tokenId);
}

export default function CheckoutCryptoBillingSection({
  wallets,
  selectedUid,
  selectedTokenId,
  onSelect,
  onTokenChange,
  onWalletsChange,
}: CheckoutCryptoBillingSectionProps) {
  const [showAddForm, setShowAddForm] = useState(wallets.length === 0);
  const [editingWallet, setEditingWallet] = useState<SavedCryptoWallet | null>(
    null,
  );
  const [deletingUid, setDeletingUid] = useState<string | null>(null);
  const { switchToChain } = useEvmChainSwitch();

  const selectedWallet =
    wallets.find((wallet) => wallet.uid === selectedUid) ?? wallets[0] ?? null;

  useEffect(() => {
    if (wallets.length === 0) {
      setShowAddForm(true);
      return;
    }

    const wallet =
      wallets.find((item) => item.uid === selectedUid) ?? wallets[0];

    if (wallet && wallet.uid !== selectedUid) {
      onSelect(wallet);
    }
  }, [selectedUid, wallets]);

  useEffect(() => {
    if (!selectedWallet) return;

    if (!tokenBelongsToChain(selectedTokenId, selectedWallet.chain)) {
      onTokenChange(getDefaultTokenForChain(selectedWallet.chain));
    }
  }, [selectedWallet, selectedTokenId, onTokenChange]);

  useEffect(() => {
    if (!selectedWallet) return;
    if (selectedWallet.chain === "solana") return;
    void switchToChain(selectedWallet.chain);
  }, [selectedWallet, switchToChain]);

  const tokenOptions = useMemo(() => {
    if (!selectedWallet) return [];

    return getTokensForChain(selectedWallet.chain).map((token) => ({
      value: token.id,
      label: `${token.label} (${token.symbol})`,
      description: token.description,
      icon: token.icon,
    }));
  }, [selectedWallet]);

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
      editingWallet ? "Wallet updated." : "Crypto wallet connected.",
    );
    setEditingWallet(null);
    setShowAddForm(false);
    await onWalletsChange();
    onSelect(result.wallet);
    onTokenChange(getDefaultTokenForChain(result.wallet.chain));
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

    if (wallet.uid === selectedUid) {
      const remaining = wallets.filter((item) => item.uid !== wallet.uid);
      if (remaining[0]) {
        onSelect(remaining[0]);
      }
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

  const handleWalletSelect = (wallet: SavedCryptoWallet) => {
    onSelect(wallet);
    if (!tokenBelongsToChain(selectedTokenId, wallet.chain)) {
      onTokenChange(getDefaultTokenForChain(wallet.chain));
    }
    if (wallet.chain !== "solana") {
      void switchToChain(wallet.chain);
    }
  };

  const handleTokenSelect = (value: string) => {
    const tokenId = value as CryptoTokenId;
    const tokenChain = getChainForToken(tokenId);

    onTokenChange(tokenId);

    if (!tokenChain || tokenChain === "solana") return;

    const matchingWallet = wallets.find((wallet) => wallet.chain === tokenChain);
    if (matchingWallet && matchingWallet.uid !== selectedUid) {
      onSelect(matchingWallet);
    }

    void switchToChain(tokenChain);
  };

  const showWalletList = wallets.length > 0 && !editingWallet;
  const showTokenPicker =
    selectedWallet &&
    !showAddForm &&
    !editingWallet &&
    tokenOptions.length > 0;

  return (
    <div className="space-y-4">
      {showWalletList && (
        <SavedCryptoWalletList
          wallets={wallets}
          selectable
          selectedUid={selectedUid}
          onSelect={handleWalletSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingUid={deletingUid}
        />
      )}

      {showTokenPicker && (
        <CryptoAssetDropdown
          label="Pay with"
          subLabel={`Choose the token to pay with on ${
            getChainById(selectedWallet.chain)?.label ?? selectedWallet.chain
          }.`}
          name="checkoutCryptoToken"
          placeholder="Select a token"
          options={tokenOptions}
          value={selectedTokenId}
          onSelect={handleTokenSelect}
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

      {!editingWallet && showAddForm && (
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
        !showAddForm && (
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

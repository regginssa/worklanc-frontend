"use client";

import CryptoAssetDropdown from "@/components/molecules/CryptoAssetDropdown";
import { saveCryptoWallet } from "@/lib/api/payments";
import {
  CRYPTO_CHAINS,
  getChainById,
  getDefaultTokenForChain,
  getTokensForChain,
  type CryptoChainId,
  type CryptoTokenId,
} from "@/lib/crypto/assets";
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
    const result = await saveCryptoWallet(body);
    if (!result?.wallet) return false;

    toast.success("Crypto wallet connected.");
    setShowAddForm(false);
    await onWalletsChange();
    onSelect(result.wallet);
    onTokenChange(getDefaultTokenForChain(result.wallet.chain));
    return true;
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleWalletSelect = (wallet: SavedCryptoWallet) => {
    onSelect(wallet);
    if (!tokenBelongsToChain(selectedTokenId, wallet.chain)) {
      onTokenChange(getDefaultTokenForChain(wallet.chain));
    }
  };

  return (
    <div className="space-y-4">
      {wallets.length > 0 && (
        <SavedCryptoWalletList
          wallets={wallets}
          selectable
          selectedUid={selectedUid}
          onSelect={handleWalletSelect}
        />
      )}

      {selectedWallet && !showAddForm && tokenOptions.length > 0 && (
        <CryptoAssetDropdown
          label="Pay with"
          subLabel={`Choose the token to pay with on ${getChainById(selectedWallet.chain)?.label ?? selectedWallet.chain}.`}
          name="checkoutCryptoToken"
          placeholder="Select a token"
          options={tokenOptions}
          value={selectedTokenId}
          onSelect={(value) => onTokenChange(value as CryptoTokenId)}
        />
      )}

      {showAddForm && (
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

      {wallets.length > 0 &&
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

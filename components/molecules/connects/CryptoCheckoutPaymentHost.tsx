"use client";

import { Button } from "@/components/atoms";
import {
  useCryptoCheckoutPayment,
  type CryptoWalletConnectionStatus,
} from "@/hooks/useCryptoCheckoutPayment";
import type { ConnectCheckoutCryptoPayment } from "@/types/connect";
import type { CryptoTokenId } from "@/lib/crypto/assets";
import { getChainById, shortenAddress } from "@/lib/crypto/assets";
import type { SavedCryptoWallet } from "@/types/payment";
import { reownProjectId } from "@/lib/appkit/config";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type CryptoCheckoutPaymentStage =
  | "idle"
  | "preparing"
  | "awaiting_approval"
  | "verifying"
  | "confirmed"
  | "failed";

export type CryptoCheckoutPaymentHandle = {
  sendPayment: (
    payment: ConnectCheckoutCryptoPayment,
    tokenId: CryptoTokenId,
  ) => Promise<string>;
  isWalletConnected: boolean;
  isSelectedWalletConnected: boolean;
};

type CryptoCheckoutPaymentHostProps = {
  selectedWallet?: SavedCryptoWallet;
  stage: CryptoCheckoutPaymentStage;
  message: string | null;
  onReady?: (api: CryptoCheckoutPaymentHandle) => void;
  onConnectionChange?: (connected: boolean) => void;
};

export default function CryptoCheckoutPaymentHost({
  selectedWallet,
  stage,
  message,
  onReady,
  onConnectionChange,
}: CryptoCheckoutPaymentHostProps) {
  if (!reownProjectId) {
    return (
      <div className="space-y-2 rounded-xl border border-red-200 bg-red-50 p-3 text-left">
        <p className="text-xs text-red-700">
          Reown AppKit is not configured. Add{" "}
          <code className="font-mono">NEXT_PUBLIC_REOWN_PROJECT_ID</code> to
          your environment.
        </p>
      </div>
    );
  }

  return (
    <CryptoCheckoutPaymentHostContent
      selectedWallet={selectedWallet}
      stage={stage}
      message={message}
      onReady={onReady}
      onConnectionChange={onConnectionChange}
    />
  );
}

function connectionStatusLabel(status: CryptoWalletConnectionStatus) {
  switch (status) {
    case "matched":
      return "Wallet connected";
    case "address_mismatch":
      return "Wrong wallet connected";
    case "wrong_network":
      return "Wrong network";
    default:
      return "Wallet not connected";
  }
}

function CryptoCheckoutPaymentHostContent({
  selectedWallet,
  stage,
  message,
  onReady,
  onConnectionChange,
}: CryptoCheckoutPaymentHostProps) {
  const {
    sendPayment,
    isWalletConnected,
    isSelectedWalletConnected,
    connectWallet,
    disconnectWallet,
    getWalletConnectionStatus,
    connectedAddress,
  } = useCryptoCheckoutPayment();

  const [disconnecting, setDisconnecting] = useState(false);

  const connectionStatus = getWalletConnectionStatus(selectedWallet);
  const walletConnected = connectionStatus === "matched";
  const selectedChainLabel = selectedWallet
    ? (getChainById(selectedWallet.chain)?.label ?? selectedWallet.chain)
    : null;

  useEffect(() => {
    onReady?.({
      sendPayment,
      isWalletConnected,
      isSelectedWalletConnected: walletConnected,
    });
  }, [sendPayment, isWalletConnected, walletConnected, onReady]);

  useEffect(() => {
    onConnectionChange?.(walletConnected);
  }, [walletConnected, onConnectionChange]);

  const handleDisconnect = async () => {
    setDisconnecting(true);
    try {
      await disconnectWallet();
      toast.success("Wallet disconnected.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to disconnect wallet.";
      toast.error(errorMessage);
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left">
      <p className="text-xs font-medium text-slate-700">
        Crypto payment status:{" "}
        <span className="capitalize">{stage.replace(/_/g, " ")}</span>
      </p>

      {selectedWallet && (
        <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
          <div className="flex items-start gap-2">
            <Icon
              icon="mdi:wallet-outline"
              className={`size-5 shrink-0 ${
                connectionStatus === "matched"
                  ? "text-green-600"
                  : connectionStatus === "disconnected"
                    ? "text-slate-500"
                    : "text-amber-600"
              }`}
            />
            <div className="space-y-1 min-w-0">
              <p className="text-sm font-medium text-slate-900">
                {connectionStatusLabel(connectionStatus)}
              </p>
              <p className="text-xs text-slate-600">
                Selected billing wallet:{" "}
                <span className="font-mono">
                  {shortenAddress(selectedWallet.address)}
                </span>
                {selectedChainLabel ? ` on ${selectedChainLabel}` : ""}
              </p>
              {connectedAddress && isWalletConnected && (
                <p className="text-xs text-slate-600">
                  Connected wallet:{" "}
                  <span className="font-mono">
                    {shortenAddress(connectedAddress)}
                  </span>
                </p>
              )}
            </div>
          </div>

          {connectionStatus === "address_mismatch" && (
            <div
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800"
              role="alert"
            >
              The connected wallet does not match the billing wallet you
              selected. Disconnect and connect{" "}
              <span className="font-mono">
                {shortenAddress(selectedWallet.address)}
              </span>{" "}
              to continue.
            </div>
          )}

          {connectionStatus === "wrong_network" && (
            <div
              className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900"
              role="alert"
            >
              The connected wallet address matches, but it is on the wrong
              network. Switch to {selectedChainLabel} in your wallet, or
              disconnect and reconnect the correct wallet.
            </div>
          )}

          {connectionStatus === "disconnected" && (
            <p className="text-xs text-slate-600">
              Connect the selected billing wallet to approve payment in your
              wallet app.
            </p>
          )}

          {connectionStatus === "matched" && (
            <p className="text-xs text-green-700">
              Ready to request wallet approval when you click Buy Connects.
            </p>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {connectionStatus === "disconnected" && (
              <Button
                type="outline"
                size="small"
                label="Connect wallet"
                onClick={connectWallet}
                classname="h-8! px-3! rounded-full! text-xs!"
              />
            )}

            {isWalletConnected && connectedAddress && (
              <Button
                type="outline"
                size="small"
                label="Disconnect wallet"
                loading={disconnecting}
                disabled={disconnecting}
                onClick={handleDisconnect}
                classname="h-8! px-3! rounded-full! text-xs!"
              />
            )}

            {connectionStatus !== "disconnected" &&
              connectionStatus !== "matched" && (
                <Button
                  type="outline"
                  size="small"
                  label="Connect correct wallet"
                  disabled={disconnecting}
                  onClick={connectWallet}
                  classname="h-8! px-3! rounded-full! text-xs!"
                />
              )}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-600">
        {message ??
          (walletConnected
            ? "Approve the transaction in your wallet when prompted."
            : "Connect the selected wallet before paying.")}
      </p>
    </div>
  );
}

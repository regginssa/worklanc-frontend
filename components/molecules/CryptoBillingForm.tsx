import { Button, Input } from "@/components/atoms";
import CryptoAssetDropdown from "@/components/molecules/CryptoAssetDropdown";
import { saveCryptoWallet } from "@/lib/api/payments";
import { reownProjectId } from "@/lib/appkit/config";
import {
  CRYPTO_CHAINS,
  type CryptoChainId,
  type CryptoTokenId,
  getChainById,
  getTokenOption,
  getTokensForChain,
  isWalletOnChain,
  shortenAddress,
} from "@/lib/crypto/assets";
import type { Provider } from "@reown/appkit-adapter-solana/react";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
  useDisconnect,
} from "@reown/appkit/react";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useSignMessage } from "wagmi";

interface CryptoBillingFormProps {
  onSuccess?: () => void;
}

function bytesToBase64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

function buildVerificationMessage(params: {
  address: string;
  chainLabel: string;
  tokenLabel: string;
  nickname: string;
}) {
  return [
    "Verify wallet ownership for Worklanc",
    `Wallet: ${params.address}`,
    `Network: ${params.chainLabel}`,
    `Preferred token: ${params.tokenLabel}`,
    params.nickname ? `Label: ${params.nickname}` : null,
    `Issued at: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function CryptoBillingForm({
  onSuccess,
}: CryptoBillingFormProps) {
  if (!reownProjectId) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-700" role="alert">
          Reown AppKit is not configured. Add{" "}
          <code className="font-mono">NEXT_PUBLIC_REOWN_PROJECT_ID</code> to
          your environment.
        </p>
      </div>
    );
  }

  return <CryptoBillingFormContent onSuccess={onSuccess} />;
}

function CryptoBillingFormContent({ onSuccess }: CryptoBillingFormProps) {
  const { open } = useAppKit();
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { walletProvider: solanaProvider } =
    useAppKitProvider<Provider>("solana");
  const { signMessageAsync } = useSignMessage();

  const [selectedChainId, setSelectedChainId] =
    useState<CryptoChainId>("solana");
  const [selectedTokenId, setSelectedTokenId] =
    useState<CryptoTokenId>("chrle");
  const [walletLabel, setWalletLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const selectedChain = getChainById(selectedChainId);
  const selectedToken = getTokenOption(selectedChainId, selectedTokenId);

  const chainOptions = useMemo(
    () =>
      CRYPTO_CHAINS.map((chain) => ({
        value: chain.id,
        label: chain.label,
        description: chain.description,
        icon: chain.icon,
      })),
    []
  );

  const tokenOptions = useMemo(
    () =>
      getTokensForChain(selectedChainId).map((token) => ({
        value: token.id,
        label: `${token.label} (${token.symbol})`,
        description: token.description,
        icon: token.icon,
      })),
    [selectedChainId]
  );

  useEffect(() => {
    const tokens = getTokensForChain(selectedChainId);
    if (!tokens.some((token) => token.id === selectedTokenId)) {
      setSelectedTokenId(tokens[0]?.id ?? "chrle");
    }
  }, [selectedChainId, selectedTokenId]);

  const walletMatchesChain = isWalletOnChain(
    selectedChainId,
    caipAddress,
    address
  );

  const handleConnectWallet = () => {
    setFormError(null);
    open({ view: "Connect" });
  };

  const handleSwitchNetwork = () => {
    setFormError(null);
    open({ view: "Networks" });
  };

  const handleDisconnectWallet = async () => {
    setFormError(null);
    setDisconnecting(true);

    try {
      await disconnect();
      toast.success("Wallet disconnected.");
    } catch (error) {
      const messageText =
        error instanceof Error ? error.message : "Unable to disconnect wallet.";
      setFormError(messageText);
      toast.error(messageText);
    } finally {
      setDisconnecting(false);
    }
  };

  const handleSaveWallet = async () => {
    setFormError(null);

    if (!address || !isConnected) {
      setFormError("Connect your wallet before saving.");
      return;
    }

    if (!selectedChain || !selectedToken) {
      setFormError("Select a network and token.");
      return;
    }

    if (!walletMatchesChain) {
      setFormError(
        `Switch your wallet to ${selectedChain.label} before saving.`
      );
      return;
    }

    const message = buildVerificationMessage({
      address,
      chainLabel: selectedChain.label,
      tokenLabel: selectedToken.label,
      nickname: walletLabel.trim(),
    });

    setLoading(true);

    try {
      let signature = "";

      if (selectedChainId === "solana") {
        if (!solanaProvider) {
          throw new Error("Solana wallet provider is not available.");
        }

        const signedMessage = await solanaProvider.signMessage(
          new TextEncoder().encode(message)
        );
        signature = bytesToBase64(signedMessage);
      } else {
        signature = await signMessageAsync({ message });
      }

      const result = await saveCryptoWallet({
        address,
        chain: selectedChainId,
        token: selectedTokenId,
        label: walletLabel.trim() || undefined,
        message,
        signature,
      });

      if (result) {
        toast.success("Crypto wallet connected.");
        onSuccess?.();
      } else {
        setFormError("Unable to save wallet. Please try again.");
      }
    } catch (error) {
      const messageText =
        error instanceof Error ? error.message : "Unable to verify wallet.";
      setFormError(messageText);
      if (!messageText.toLowerCase().includes("user rejected")) {
        toast.error(messageText);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h4 className="text-lg font-medium">Connect a crypto wallet</h4>
        <p className="text-sm font-light text-slate-600">
          Link your own wallet to deposit funds on Worklanc. Worklanc never asks
          for your seed phrase or private key — you approve every deposit from
          your wallet when you are ready.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <CryptoAssetDropdown
          label="Network"
          subLabel="Choose the blockchain network your wallet will use for deposits."
          name="cryptoChain"
          placeholder="Select a network"
          options={chainOptions}
          value={selectedChainId}
          onSelect={(value) => setSelectedChainId(value as CryptoChainId)}
        />

        <CryptoAssetDropdown
          label="Preferred deposit token"
          subLabel={`Pick the token you plan to deposit on ${
            selectedChain?.label ?? "this network"
          }.`}
          name="cryptoToken"
          placeholder="Select a token"
          options={tokenOptions}
          value={selectedTokenId}
          onSelect={(value) => setSelectedTokenId(value as CryptoTokenId)}
        />
      </div>

      <Input
        type="text"
        name="walletLabel"
        label="Wallet label"
        subLabel="Optional nickname to help you recognize this wallet later."
        placeholder="e.g. My Phantom wallet"
        value={walletLabel}
        onChange={(event) => setWalletLabel(event.target.value)}
        maxLength={40}
      />

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-50 p-2">
            <Icon icon="mdi:wallet-outline" className="size-5 text-blue-600" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Wallet connection status</p>
            {!isConnected || !address ? (
              <p className="text-sm font-light text-slate-600">
                No wallet connected yet. Use AppKit to connect MetaMask,
                Phantom, WalletConnect, or another supported wallet.
              </p>
            ) : (
              <div className="space-y-1">
                <p className="text-sm text-slate-900">
                  Connected:{" "}
                  <span className="font-mono">{shortenAddress(address)}</span>
                </p>
                <p className="text-sm font-light text-slate-600">
                  {walletMatchesChain
                    ? `This wallet matches ${selectedChain?.label}.`
                    : `This wallet is not on ${selectedChain?.label}. Switch network to continue.`}
                </p>
              </div>
            )}
          </div>
        </div>

        {isConnected && !walletMatchesChain && (
          <div
            className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            role="alert"
          >
            Your wallet is connected on a different network. Switch to{" "}
            <strong>{selectedChain?.label}</strong> before saving this deposit
            method.
          </div>
        )}
      </div>

      <ul className="space-y-2 text-xs font-light text-slate-600">
        <li className="flex gap-2">
          <Icon
            icon="mdi:shield-check-outline"
            className="mt-0.5 size-4 shrink-0"
          />
          <span>
            Worklanc only stores your public wallet address and verified
            connection details.
          </span>
        </li>
        <li className="flex gap-2">
          <Icon
            icon="mdi:signature-freehand"
            className="mt-0.5 size-4 shrink-0"
          />
          <span>
            You will sign a short verification message to prove you control this
            wallet.
          </span>
        </li>
        <li className="flex gap-2">
          <Icon
            icon="mdi:alert-circle-outline"
            className="mt-0.5 size-4 shrink-0"
          />
          <span>
            Always confirm the exact network and token before sending a deposit.
            Sending on the wrong network can result in lost funds.
          </span>
        </li>
      </ul>

      {formError && (
        <div className="flex items-center gap-2 flex-1">
          <Icon
            icon="mdi:information-outline"
            width={16}
            className="text-red-500"
          />
          <p className="text-red-600 text-sm">{formError}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-end gap-3">
        {!isConnected ? (
          <Button
            type="primary"
            label="Connect wallet"
            icon="mdi:wallet-plus-outline"
            size="medium"
            classname="rounded-full!"
            onClick={handleConnectWallet}
          />
        ) : (
          <>
            {!walletMatchesChain && (
              <Button
                type="secondary"
                label="Switch network"
                icon="mdi:swap-horizontal"
                size="medium"
                classname="rounded-full!"
                onClick={handleSwitchNetwork}
              />
            )}
            <Button
              type="primary"
              label="Verify and save wallet"
              icon="mdi:check-decagram-outline"
              size="medium"
              classname="rounded-full!"
              loading={loading}
              disabled={!walletMatchesChain || loading}
              onClick={handleSaveWallet}
            />
            <Button
              type="secondary"
              label="Disconnect wallet"
              icon="mdi:logout-variant"
              size="medium"
              classname="rounded-full!"
              loading={disconnecting}
              disabled={!isConnected || !address || disconnecting || loading}
              onClick={handleDisconnectWallet}
            />
          </>
        )}
      </div>
    </div>
  );
}

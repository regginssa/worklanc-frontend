import { sendCryptoPayment } from "@/lib/crypto/sendPayment";
import type { CryptoChainId, CryptoTokenId } from "@/lib/crypto/assets";
import { isWalletOnChain } from "@/lib/crypto/assets";
import { getExpectedEvmChainId } from "@/lib/crypto/evmChains";
import type { ConnectCheckoutCryptoPayment } from "@/types/connect";
import type { SavedCryptoWallet } from "@/types/payment";
import type { Provider } from "@reown/appkit-adapter-solana/react";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
  useDisconnect,
} from "@reown/appkit/react";
import { useCallback } from "react";
import { useSendTransaction } from "wagmi";
import { useEvmChainSwitch } from "@/hooks/useEvmChainSwitch";

export type CryptoWalletConnectionStatus =
  | "disconnected"
  | "matched"
  | "address_mismatch"
  | "wrong_network";

function addressesMatch(
  connected: string,
  expected: string,
  chain: CryptoChainId,
) {
  if (chain === "solana") return connected === expected;
  return connected.toLowerCase() === expected.toLowerCase();
}

export function useCryptoCheckoutPayment() {
  const { open } = useAppKit();
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { walletProvider: solanaProvider } =
    useAppKitProvider<Provider>("solana");
  const { sendTransactionAsync } = useSendTransaction();
  const { switchToChain } = useEvmChainSwitch();

  const sendPayment = useCallback(
    async (
      payment: ConnectCheckoutCryptoPayment,
      tokenId: CryptoTokenId,
    ) => {
      if (!isConnected || !address) {
        throw new Error("Connect your wallet before paying with crypto.");
      }

      if (payment.chain === "solana") {
        if (address !== payment.senderAddress) {
          throw new Error(
            "Connected wallet does not match the billing wallet you selected.",
          );
        }

        if (!isWalletOnChain("solana", caipAddress, address)) {
          throw new Error("Switch to your Solana wallet to complete payment.");
        }

        if (!solanaProvider) {
          throw new Error("Solana wallet provider is not available.");
        }

        return sendCryptoPayment({
          payment,
          tokenId,
          solanaClient: {
            signAndSendTransaction: (transaction) =>
              solanaProvider.signAndSendTransaction(transaction as any),
          },
        });
      }

      if (address.toLowerCase() !== payment.senderAddress.toLowerCase()) {
        throw new Error(
          "Connected wallet does not match the billing wallet you selected.",
        );
      }

      const expectedChainId = getExpectedEvmChainId(payment.chain);
      if (!expectedChainId) {
        throw new Error("Unsupported EVM network.");
      }

      const switched = await switchToChain(payment.chain);
      if (!switched) {
        throw new Error(
          `Unable to switch to ${payment.chain}. Approve the network change in your wallet.`,
        );
      }

      return sendCryptoPayment({
        payment,
        tokenId,
        evmChainId: expectedChainId,
        evmClient: {
          sendTransaction: (args) =>
            sendTransactionAsync({
              to: args.to,
              value: args.value,
              data: args.data,
              chainId: args.chainId,
            }),
        },
      });
    },
    [
      address,
      caipAddress,
      isConnected,
      sendTransactionAsync,
      solanaProvider,
      switchToChain,
    ],
  );

  const isSelectedWalletConnected = (wallet?: SavedCryptoWallet) => {
    return getWalletConnectionStatus(wallet) === "matched";
  };

  const getWalletConnectionStatus = (
    wallet?: SavedCryptoWallet,
  ): CryptoWalletConnectionStatus => {
    if (!wallet || !address || !isConnected) return "disconnected";

    if (!addressesMatch(address, wallet.address, wallet.chain)) {
      return "address_mismatch";
    }

    if (!isWalletOnChain(wallet.chain, caipAddress, address)) {
      return "wrong_network";
    }

    return "matched";
  };

  const connectWallet = () => open({ view: "Connect" });

  const disconnectWallet = async () => {
    await disconnect();
  };

  return {
    connectedAddress: address,
    isWalletConnected: isConnected,
    connectWallet,
    disconnectWallet,
    getWalletConnectionStatus,
    isSelectedWalletConnected,
    sendPayment,
  };
}

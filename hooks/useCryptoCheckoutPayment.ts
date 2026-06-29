import { sendCryptoPayment } from "@/lib/crypto/sendPayment";
import type { CryptoTokenId } from "@/lib/crypto/assets";
import { isWalletOnChain } from "@/lib/crypto/assets";
import { getExpectedEvmChainId } from "@/lib/crypto/evmChains";
import type { ConnectCheckoutCryptoPayment } from "@/types/connect";
import type { Provider } from "@reown/appkit-adapter-solana/react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useSendTransaction } from "wagmi";
import { useEvmChainSwitch } from "@/hooks/useEvmChainSwitch";

export function useCryptoCheckoutPayment() {
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const { walletProvider: solanaProvider } =
    useAppKitProvider<Provider>("solana");
  const { sendTransactionAsync } = useSendTransaction();
  const { switchToChain } = useEvmChainSwitch();

  const sendPayment = async (
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
            solanaProvider.signAndSendTransaction(transaction),
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
  };

  return {
    connectedAddress: address,
    isWalletConnected: isConnected,
    sendPayment,
  };
}

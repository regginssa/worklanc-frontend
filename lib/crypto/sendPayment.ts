import type { ConnectCheckoutCryptoPayment } from "@/types/connect";
import type { CryptoChainId, CryptoTokenId } from "@/lib/crypto/assets";
import { getTokenDecimals } from "@/lib/crypto/tokenDecimals";

const NATIVE_TOKENS = new Set<CryptoTokenId>(["sol", "eth", "bnb"]);

const ERC20_TRANSFER_ABI = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

function getSolanaRpcUrl() {
  return (
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ??
    (process.env.NEXT_PUBLIC_APPKIT_USE_TESTNETS === "true"
      ? "https://api.devnet.solana.com"
      : "https://api.mainnet-beta.solana.com")
  );
}

function amountToAtomicUnits(amount: string, decimals: number): bigint {
  const [whole, fraction = ""] = amount.split(".");
  const paddedFraction = fraction.padEnd(decimals, "0").slice(0, decimals);
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(paddedFraction || "0");
}

function normalizeAddress(value: string) {
  return value.trim();
}

export type EvmSendClient = {
  sendTransaction: (args: {
    to: `0x${string}`;
    value?: bigint;
    data?: `0x${string}`;
    chainId: number;
  }) => Promise<`0x${string}`>;
};

export type SolanaSendClient = {
  signAndSendTransaction: (
    transaction: unknown,
    options?: { skipPreflight?: boolean },
  ) => Promise<{ signature: string } | string>;
};

export async function sendCryptoPayment(params: {
  payment: ConnectCheckoutCryptoPayment;
  tokenId: CryptoTokenId;
  evmClient?: EvmSendClient;
  evmChainId?: number;
  solanaClient?: SolanaSendClient;
}): Promise<string> {
  const { payment, tokenId, evmClient, evmChainId, solanaClient } = params;
  const decimals = getTokenDecimals(tokenId);
  const atomicAmount = amountToAtomicUnits(payment.amount, decimals);

  if (payment.chain === "solana") {
    if (!solanaClient) {
      throw new Error("Connect your Solana wallet to continue.");
    }

    const {
      Connection,
      PublicKey,
      SystemProgram,
      Transaction,
    } = await import("@solana/web3.js");

    const connection = new Connection(getSolanaRpcUrl(), "confirmed");
    const fromPubkey = new PublicKey(normalizeAddress(payment.senderAddress));
    const toPubkey = new PublicKey(normalizeAddress(payment.treasuryAddress));
    const transaction = new Transaction();

    if (NATIVE_TOKENS.has(tokenId)) {
      transaction.add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: atomicAmount,
        }),
      );
    } else {
      if (!payment.tokenContract) {
        throw new Error("Token contract is missing for this payment.");
      }

      const {
        createAssociatedTokenAccountIdempotentInstruction,
        createTransferInstruction,
        getAssociatedTokenAddress,
      } = await import("@solana/spl-token");

      const mint = new PublicKey(payment.tokenContract);
      const fromAta = await getAssociatedTokenAddress(mint, fromPubkey);
      const toAta = await getAssociatedTokenAddress(mint, toPubkey);

      transaction.add(
        createAssociatedTokenAccountIdempotentInstruction(
          fromPubkey,
          toAta,
          toPubkey,
          mint,
        ),
        createTransferInstruction(
          fromAta,
          toAta,
          fromPubkey,
          atomicAmount,
        ),
      );
    }

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPubkey;

    const result = await solanaClient.signAndSendTransaction(transaction);
    const signature = typeof result === "string" ? result : result.signature;

    if (!signature) {
      throw new Error("Wallet did not return a transaction signature.");
    }

    return signature;
  }

  if (payment.chain === "ethereum" || payment.chain === "bnb") {
    if (!evmClient || !evmChainId) {
      throw new Error("Connect your EVM wallet to continue.");
    }

    const treasury = normalizeAddress(payment.treasuryAddress) as `0x${string}`;

    if (NATIVE_TOKENS.has(tokenId)) {
      return evmClient.sendTransaction({
        to: treasury,
        value: atomicAmount,
        chainId: evmChainId,
      });
    }

    if (!payment.tokenContract) {
      throw new Error("Token contract is missing for this payment.");
    }

    const { encodeFunctionData } = await import("viem");

    const data = encodeFunctionData({
      abi: ERC20_TRANSFER_ABI,
      functionName: "transfer",
      args: [treasury, atomicAmount],
    });

    return evmClient.sendTransaction({
      to: payment.tokenContract as `0x${string}`,
      data,
      chainId: evmChainId,
    });
  }

  throw new Error("Unsupported blockchain network.");
}

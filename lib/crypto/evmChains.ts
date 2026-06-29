import type { CryptoChainId } from "@/lib/crypto/assets";

export function getExpectedEvmChainId(chain: CryptoChainId): number | null {
  const useTestnets = process.env.NEXT_PUBLIC_APPKIT_USE_TESTNETS === "true";
  if (chain === "ethereum") return useTestnets ? 11155111 : 1;
  if (chain === "bnb") return useTestnets ? 97 : 56;
  return null;
}

export function isEvmChain(
  chain: CryptoChainId,
): chain is Extract<CryptoChainId, "ethereum" | "bnb"> {
  return chain === "ethereum" || chain === "bnb";
}

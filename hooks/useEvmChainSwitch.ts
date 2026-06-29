import { getExpectedEvmChainId, isEvmChain } from "@/lib/crypto/evmChains";
import type { CryptoChainId } from "@/lib/crypto/assets";
import { useCallback } from "react";
import { useSwitchChain, useChainId } from "wagmi";

export function useEvmChainSwitch() {
  const chainId = useChainId();
  const { switchChainAsync, isPending } = useSwitchChain();

  const switchToChain = useCallback(
    async (chain: CryptoChainId) => {
      if (!isEvmChain(chain)) return true;

      const targetChainId = getExpectedEvmChainId(chain);
      if (!targetChainId) return false;

      if (chainId === targetChainId) return true;

      try {
        await switchChainAsync({ chainId: targetChainId });
        return true;
      } catch {
        return false;
      }
    },
    [chainId, switchChainAsync],
  );

  return { switchToChain, isSwitching: isPending, chainId };
}

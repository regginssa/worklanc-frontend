import type { CryptoTokenId } from "@/lib/crypto/assets";

export type CryptoTokenPrices = Partial<Record<CryptoTokenId, number>>;

const STABLECOIN_IDS = new Set<CryptoTokenId>(["usdc", "usdt"]);

export function convertUsdToCryptoAmount(
  usdAmount: number,
  tokenId: CryptoTokenId,
  priceUsd: number,
): number {
  if (!Number.isFinite(usdAmount) || usdAmount <= 0) return 0;
  if (!Number.isFinite(priceUsd) || priceUsd <= 0) return 0;
  return usdAmount / priceUsd;
}

export function formatCryptoAmount(
  amount: number,
  tokenId: CryptoTokenId,
  symbol: string,
): string {
  if (!Number.isFinite(amount) || amount <= 0) return `-- ${symbol}`;

  const decimals = STABLECOIN_IDS.has(tokenId)
    ? 2
    : amount >= 1
      ? 4
      : amount >= 0.01
        ? 6
        : 8;

  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });

  return `${formatted} ${symbol}`;
}

export function formatUsdAmount(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

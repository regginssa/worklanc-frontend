import type { CryptoTokenId } from "@/lib/crypto/assets";

const TOKEN_DECIMALS: Record<CryptoTokenId, number> = {
  chrle: 9,
  babyu: 9,
  sol: 9,
  eth: 18,
  bnb: 18,
  usdc: 6,
  usdt: 6,
};

export function getTokenDecimals(tokenId: CryptoTokenId) {
  return TOKEN_DECIMALS[tokenId] ?? 18;
}

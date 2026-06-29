import type { CryptoTokenId } from "@/lib/crypto/assets";
import type { CryptoTokenPrices } from "@/lib/crypto/pricing";

const STABLECOIN_USD_PRICES: Pick<CryptoTokenPrices, "usdc" | "usdt"> = {
  usdc: 1,
  usdt: 1,
};

const FALLBACK_USD_PRICES: Partial<Record<CryptoTokenId, number>> = {
  chrle: Number(process.env.CHRLE_USD_PRICE ?? "0.05"),
  babyu: Number(process.env.BABYU_USD_PRICE ?? "0.01"),
};

type NativeTokenPrices = Pick<CryptoTokenPrices, "eth" | "sol" | "bnb">;
type WorklancTokenPrices = Pick<CryptoTokenPrices, "chrle" | "babyu">;

async function fetchNativeTokenPricesUsd(): Promise<NativeTokenPrices> {
  try {
    const [ethRes, solRes, bnbRes] = await Promise.all([
      fetch("https://api.coinpaprika.com/v1/tickers/eth-ethereum?quotes=USD"),
      fetch("https://api.coinpaprika.com/v1/tickers/sol-solana?quotes=USD"),
      fetch(
        "https://api.coinpaprika.com/v1/tickers/bnb-binance-coin?quotes=USD",
      ),
    ]);

    const [eth, sol, bnb] = await Promise.all([
      ethRes.json(),
      solRes.json(),
      bnbRes.json(),
    ]);

    return {
      eth: Number(eth?.quotes?.USD?.price ?? 0),
      sol: Number(sol?.quotes?.USD?.price ?? 0),
      bnb: Number(bnb?.quotes?.USD?.price ?? 0),
    };
  } catch {
    return { eth: 0, sol: 0, bnb: 0 };
  }
}

async function fetchWorklancTokenPricesUsd(): Promise<WorklancTokenPrices> {
  const babyuTokenAddress = process.env.BABYU_TOKEN_ADDRESS;
  const chrleTokenAddress = process.env.CHRLE_TOKEN_ADDRESS;

  if (!babyuTokenAddress || !chrleTokenAddress) {
    return {
      babyu: FALLBACK_USD_PRICES.babyu ?? 0,
      chrle: FALLBACK_USD_PRICES.chrle ?? 0,
    };
  }

  try {
    const [babyuRes, chrleRes] = await Promise.all([
      fetch(
        `https://api-v3.raydium.io/mint/price?mints=${babyuTokenAddress}`,
      ),
      fetch(
        `https://launch-mint-v1.raydium.io/get/by/mints?ids=${chrleTokenAddress}`,
      ),
    ]);

    const babyuJson = await babyuRes.json();
    const chrleJson = await chrleRes.json();

    const babyuUsd = Number(babyuJson?.data?.[babyuTokenAddress] ?? 0);

    const chrleRow = chrleJson?.data?.rows?.[0];
    let chrleUsd = 0;

    if (chrleRow?.marketCap && chrleRow?.supply) {
      chrleUsd = Number(chrleRow.marketCap) / Number(chrleRow.supply);
    }

    return {
      babyu: babyuUsd || FALLBACK_USD_PRICES.babyu || 0,
      chrle: chrleUsd || FALLBACK_USD_PRICES.chrle || 0,
    };
  } catch {
    return {
      babyu: FALLBACK_USD_PRICES.babyu ?? 0,
      chrle: FALLBACK_USD_PRICES.chrle ?? 0,
    };
  }
}

function withFallbacks(prices: CryptoTokenPrices): CryptoTokenPrices {
  const merged: CryptoTokenPrices = {
    ...STABLECOIN_USD_PRICES,
    ...prices,
  };

  for (const [tokenId, fallbackPrice] of Object.entries(
    FALLBACK_USD_PRICES,
  ) as [CryptoTokenId, number][]) {
    const current = merged[tokenId];
    if (!current || current <= 0) {
      merged[tokenId] = fallbackPrice;
    }
  }

  return merged;
}

export async function fetchCryptoPricesUsd(): Promise<CryptoTokenPrices> {
  const [nativePrices, worklancPrices] = await Promise.all([
    fetchNativeTokenPricesUsd(),
    fetchWorklancTokenPricesUsd(),
  ]);

  return withFallbacks({
    ...nativePrices,
    ...worklancPrices,
  });
}

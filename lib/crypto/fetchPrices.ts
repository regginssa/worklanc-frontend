import type { CryptoTokenId } from "@/lib/crypto/assets";
import type { CryptoTokenPrices } from "@/lib/crypto/pricing";

const STABLECOIN_USD_PRICES: Pick<CryptoTokenPrices, "usdc" | "usdt"> = {
  usdc: 1,
  usdt: 1,
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
    return { babyu: 0, chrle: 0 };
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
      babyu: babyuUsd > 0 ? babyuUsd : 0,
      chrle: chrleUsd > 0 ? chrleUsd : 0,
    };
  } catch {
    return { babyu: 0, chrle: 0 };
  }
}

export async function fetchCryptoPricesUsd(): Promise<CryptoTokenPrices> {
  const [nativePrices, worklancPrices] = await Promise.all([
    fetchNativeTokenPricesUsd(),
    fetchWorklancTokenPricesUsd(),
  ]);

  return {
    ...STABLECOIN_USD_PRICES,
    ...nativePrices,
    ...worklancPrices,
  };
}

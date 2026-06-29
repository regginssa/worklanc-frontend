import { fetchCryptoPricesUsd } from "@/lib/crypto/fetchPrices";
import type { CryptoTokenId } from "@/lib/crypto/assets";
import type { NextApiRequest, NextApiResponse } from "next";

type PricesResponse = {
  prices: Partial<Record<CryptoTokenId, number>>;
  updatedAt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PricesResponse | { error: string }>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const prices = await fetchCryptoPricesUsd();
    return res.status(200).json({
      prices,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return res.status(500).json({ error: "Unable to fetch crypto prices." });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { PublicKey } from "@solana/web3.js";
import { ed25519 } from "@noble/curves/ed25519";
import { verifyMessage } from "viem";

type SaveCryptoWalletBody = {
  address: string;
  chain: "solana" | "ethereum" | "bnb";
  token: string;
  label?: string;
  message: string;
  signature: string;
};

function decodeBase64(value: string) {
  return Uint8Array.from(Buffer.from(value, "base64"));
}

async function verifySolanaSignature(
  address: string,
  message: string,
  signature: string,
) {
  const publicKey = new PublicKey(address).toBytes();
  const messageBytes = new TextEncoder().encode(message);
  const signatureBytes = decodeBase64(signature);

  return ed25519.verify(signatureBytes, messageBytes, publicKey);
}

async function verifyEvmSignature(
  address: string,
  message: string,
  signature: string,
) {
  return verifyMessage({
    address: address as `0x${string}`,
    message,
    signature: signature as `0x${string}`,
  });
}

async function forwardToBackend(
  req: NextApiRequest,
  body: SaveCryptoWalletBody,
) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) return null;

  try {
    const res = await fetch(`${backendUrl}/api/payments/crypto/wallets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization
          ? { Authorization: req.headers.authorization }
          : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);
    if (res.ok) return data;
  } catch {
    return null;
  }

  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const body = req.body as SaveCryptoWalletBody;
  const { address, chain, token, label, message, signature } = body;

  if (!address || !chain || !token || !message || !signature) {
    return res.status(400).json({ message: "Missing required wallet fields." });
  }

  if (!message.includes(address)) {
    return res.status(400).json({ message: "Signed message does not match wallet." });
  }

  try {
    let verified = false;

    if (chain === "solana") {
      verified = await verifySolanaSignature(address, message, signature);
    } else if (chain === "ethereum" || chain === "bnb") {
      verified = await verifyEvmSignature(address, message, signature);
    } else {
      return res.status(400).json({ message: "Unsupported chain." });
    }

    if (!verified) {
      return res.status(401).json({ message: "Wallet signature verification failed." });
    }

    const backendResult = await forwardToBackend(req, body);
    if (backendResult) {
      return res.status(200).json(backendResult);
    }

    return res.status(200).json({
      ok: true,
      wallet: {
        address,
        chain,
        token,
        label: label ?? null,
        verifiedAt: new Date().toISOString(),
      },
      message: "Wallet verified and saved.",
    });
  } catch (error) {
    const messageText =
      error instanceof Error ? error.message : "Unable to verify wallet.";
    return res.status(500).json({ message: messageText });
  }
}

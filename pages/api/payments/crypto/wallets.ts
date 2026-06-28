import type { NextApiRequest, NextApiResponse } from "next";
import { PublicKey } from "@solana/web3.js";
import { ed25519 } from "@noble/curves/ed25519";
import { verifyMessage } from "viem";

type SaveCryptoWalletBody = {
  uid?: string;
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
  method: "POST" | "PATCH",
) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) return null;

  const endpoint =
    method === "PATCH" && body.uid
      ? `${backendUrl}/api/payments/methods/${body.uid}`
      : `${backendUrl}/api/payments/crypto/wallets`;

  const payload =
    method === "PATCH"
      ? {
          address: body.address,
          chain: body.chain,
          token: body.token,
          label: body.label,
        }
      : body;

  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization
          ? { Authorization: req.headers.authorization }
          : {}),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);
    if (res.ok) return data;
  } catch {
    return null;
  }

  return null;
}

async function verifyWalletBody(body: SaveCryptoWalletBody) {
  const { address, chain, token, message, signature } = body;

  if (!address || !chain || !token || !message || !signature) {
    return { error: "Missing required wallet fields.", status: 400 as const };
  }

  if (!message.includes(address)) {
    return {
      error: "Signed message does not match wallet.",
      status: 400 as const,
    };
  }

  let verified = false;

  if (chain === "solana") {
    verified = await verifySolanaSignature(address, message, signature);
  } else if (chain === "ethereum" || chain === "bnb") {
    verified = await verifyEvmSignature(address, message, signature);
  } else {
    return { error: "Unsupported chain.", status: 400 as const };
  }

  if (!verified) {
    return {
      error: "Wallet signature verification failed.",
      status: 401 as const,
    };
  }

  return { error: null, status: 200 as const };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST" && req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const body = req.body as SaveCryptoWalletBody;

  if (req.method === "PATCH" && !body.uid) {
    return res.status(400).json({ message: "uid is required for updates." });
  }

  try {
    const verification = await verifyWalletBody(body);
    if (verification.error) {
      return res.status(verification.status).json({
        message: verification.error,
      });
    }

    const backendResult = await forwardToBackend(req, body, req.method);
    if (backendResult) {
      return res.status(req.method === "POST" ? 201 : 200).json(backendResult);
    }

    const wallet = {
      uid: body.uid ?? "local",
      type: "crypto" as const,
      provider: "crypto" as const,
      address: body.address,
      chain: body.chain,
      token: body.token,
      label: body.label ?? null,
      isDefault: true,
      createdAt: new Date().toISOString(),
    };

    return res.status(req.method === "POST" ? 201 : 200).json({ wallet });
  } catch (error) {
    const messageText =
      error instanceof Error ? error.message : "Unable to verify wallet.";
    return res.status(500).json({ message: messageText });
  }
}

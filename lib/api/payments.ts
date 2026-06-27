import { request } from "./client";

export async function createPayPalVaultSetupToken() {
  return request<{ vaultSetupToken: string }>("/payments/paypal/setup-token", {
    method: "POST",
  });
}

export async function savePayPalPaymentMethod(vaultSetupToken: string) {
  return request("/payments/paypal/save", {
    method: "POST",
    body: JSON.stringify({ vaultSetupToken }),
  });
}

export async function saveCryptoWallet(body: {
  address: string;
  chain: string;
  token: string;
  label?: string;
  message: string;
  signature: string;
}) {
  return request("/payments/crypto/wallets", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

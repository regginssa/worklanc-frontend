import { request } from "./client";
import { localRequest } from "./localClient";
import type { SavedCard } from "@/types/payment";

export async function fetchSavedCards() {
  return request<{ cards: SavedCard[] }>("/payments/methods");
}

export async function saveStripePaymentMethod(paymentMethodId: string) {
  return request<{ card: SavedCard }>("/payments/stripe/save", {
    method: "POST",
    body: JSON.stringify({ paymentMethodId }),
  });
}

export async function updateStripePaymentMethod(
  uid: string,
  paymentMethodId: string,
) {
  return request<{ card: SavedCard }>(`/payments/methods/${uid}`, {
    method: "PATCH",
    body: JSON.stringify({ paymentMethodId }),
  });
}

export async function deletePaymentMethod(uid: string) {
  return request<{ success: boolean }>(`/payments/methods/${uid}`, {
    method: "DELETE",
  });
}

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
  return localRequest("/api/payments/crypto/wallets", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

import { request } from "./client";
import type { ConnectBundleOption, ConnectCheckout } from "@/types/connect";

export async function fetchConnectBundles() {
  return request<{ bundles: ConnectBundleOption[] }>("/connects/bundles");
}

export async function fetchConnectsBalance() {
  return request<{ connectsBalance: number }>("/connects/balance");
}

export async function createConnectCheckout(body: {
  connectAmount: number;
  promoCode?: string;
}) {
  return request<{
    checkout: ConnectCheckout;
    reused: boolean;
  }>("/connects/checkouts", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function fetchConnectCheckout(uid: string) {
  return request<{
    checkout: ConnectCheckout;
    alreadyPaid?: boolean;
    message?: string;
    existingCheckoutUid?: string;
  }>(`/connects/checkouts/${uid}`, undefined, { silent: true });
}

export async function applyConnectCheckoutPromo(uid: string, promoCode?: string) {
  return request<{
    checkout: ConnectCheckout;
    existingCheckoutUid?: string;
  }>(`/connects/checkouts/${uid}/promo`, {
    method: "PATCH",
    body: JSON.stringify({ promoCode: promoCode ?? "" }),
  });
}

export async function payConnectCheckoutWithCard(
  uid: string,
  cardPaymentMethodUid: string,
) {
  return request<{
    checkout: ConnectCheckout;
    connectsBalance: number;
    alreadyPaid?: boolean;
  }>(`/connects/checkouts/${uid}/pay/card`, {
    method: "POST",
    body: JSON.stringify({ cardPaymentMethodUid }),
  });
}

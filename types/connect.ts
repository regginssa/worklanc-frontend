export type ConnectBundleOption = {
  id: number;
  connectAmount: number;
  priceCents: number;
  sortOrder: number;
};

export type ConnectCheckoutStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled"
  | "failed"
  | "expired";

export type ConnectCheckout = {
  uid: string;
  connectAmount: number;
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
  promoCode: string | null;
  status: ConnectCheckoutStatus;
  paymentMethod: "card" | "paypal" | "crypto" | null;
  savedPaymentMethodUid: string | null;
  completedAt: string | null;
  checkoutExpiresAt: string;
  connectsExpireAt: string | null;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
};

export function formatConnectBundleLabel(bundle: ConnectBundleOption): string {
  const dollars = (bundle.priceCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${bundle.connectAmount} for ${dollars}`;
}

export function formatCentsToUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

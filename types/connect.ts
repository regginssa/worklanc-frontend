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

export type ConnectCheckoutCryptoPayment = {
  chain: "solana" | "ethereum" | "bnb";
  token: string;
  amount: string;
  treasuryAddress: string;
  senderAddress: string;
  tokenContract: string | null;
  quoteExpiresAt: string;
  checkoutUid: string;
};

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
  cryptoPayment?: {
    chain: "solana" | "ethereum" | "bnb";
    token: string;
    amount: string;
    treasuryAddress: string;
    senderAddress: string;
    tokenContract: string | null;
    tokenPriceUsd: string | null;
    quoteExpiresAt: string | null;
    txHash: string | null;
  } | null;
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

export type ConnectPurchaseHistoryItem = {
  uid: string;
  connectAmount: number;
  totalCents: number;
  discountCents: number;
  promoCode: string | null;
  status: ConnectCheckoutStatus;
  paymentMethod: "card" | "paypal" | "crypto" | null;
  completedAt: string | null;
  connectsExpireAt: string | null;
  createdAt: string;
  cryptoToken: string | null;
  cryptoAmount: string | null;
  cryptoTxHash: string | null;
};

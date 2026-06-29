import type { CryptoChainId, CryptoTokenId } from "@/lib/crypto/assets";

export type PaymentMethod = "card" | "paypal" | "venmo" | "crypto";

export type SavedCard = {
  uid: string;
  type: "card";
  provider: "stripe";
  brand: string | null;
  last4: string | null;
  expMonth: number | null;
  expYear: number | null;
  billingName: string | null;
  isDefault: boolean;
  createdAt: string;
};

export type SavedCryptoWallet = {
  uid: string;
  type: "crypto";
  provider: "crypto";
  address: string;
  chain: CryptoChainId;
  token?: CryptoTokenId | null;
  label: string | null;
  isDefault: boolean;
  createdAt: string;
};

export type SavedPayPal = {
  uid: string;
  type: "paypal";
  provider: "paypal";
  email: string | null;
  payerId: string | null;
  isDefault: boolean;
  createdAt: string;
};

export type PaymentMethodsResponse = {
  cards: SavedCard[];
  cryptoWallets: SavedCryptoWallet[];
  paypalAccounts?: SavedPayPal[];
};

export type CheckoutBillingSelection = {
  method: PaymentMethod;
  card?: SavedCard;
  wallet?: SavedCryptoWallet;
  paypal?: SavedPayPal;
  cryptoTokenId?: CryptoTokenId;
  isReady: boolean;
};

export const CARD_BRAND_ICONS: Record<string, string> = {
  visa: "logos:visa",
  mastercard: "logos:mastercard",
  amex: "streamline-logos:american-express-logo-block",
  discover: "logos:discover",
  diners: "fa7-brands:cc-diners-club",
  diners_club: "fa7-brands:cc-diners-club",
};

export function formatCardBrand(brand: string | null | undefined): string {
  if (!brand) return "Card";
  const normalized = brand.toLowerCase();
  if (normalized === "amex") return "American Express";
  if (normalized === "diners" || normalized === "diners_club")
    return "Diners Club";
  return brand.charAt(0).toUpperCase() + brand.slice(1);
}

export function formatCardNumber(last4: string | null | undefined): string {
  if (!last4) return "•••• •••• •••• ••••";
  return `•••• •••• •••• ${last4}`;
}

export function getCardBrandIcon(brand: string | null | undefined): string {
  if (!brand) return "mdi:credit-card-outline";
  return CARD_BRAND_ICONS[brand.toLowerCase()] ?? "mdi:credit-card-outline";
}

export function getEmptyBillingMethodsDescription(
  accountType: "talent" | "client",
): string {
  if (accountType === "talent") {
    return "You haven't set up any billing methods yet. Add a method so you can buy Connects or Subscribe to a plan when you're ready.";
  }
  return "You haven't set up any billing methods yet. Add a method so you can hire when you're ready.";
}

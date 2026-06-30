import type { CryptoChainId, CryptoTokenId } from "@/lib/crypto/assets";

export type WithdrawalMethodType = "payoneer" | "crypto";

export type WithdrawalSchedule = "manual" | "weekly" | "monthly";

export type SavedPayoneerWithdrawal = {
  uid: string;
  type: "payoneer";
  email: string;
  payeeId?: string | null;
  registrationLink?: string | null;
  status: "pending" | "active" | "inactive" | "declined";
  isDefault: boolean;
  createdAt: string;
};

export type SavedCryptoWithdrawal = {
  uid: string;
  type: "crypto";
  address: string;
  chain: CryptoChainId;
  token?: CryptoTokenId | null;
  label: string | null;
  isDefault: boolean;
  createdAt: string;
};

export type WithdrawalMethodsState = {
  payoneer: SavedPayoneerWithdrawal | null;
  cryptoWallets: SavedCryptoWithdrawal[];
  schedule: WithdrawalSchedule | null;
};

export function hasWithdrawalMethods(state: WithdrawalMethodsState): boolean {
  return Boolean(state.payoneer || state.cryptoWallets.length > 0);
}

export function getEmptyWithdrawalMethodsDescription(): string {
  return "You haven't set up any withdrawal methods yet. Add Payoneer or a crypto wallet to receive your earnings.";
}

export function getWithdrawalScheduleLabel(
  schedule: WithdrawalSchedule | null,
): string {
  switch (schedule) {
    case "weekly":
      return "Weekly (every Wednesday)";
    case "monthly":
      return "Monthly (1st of each month)";
    case "manual":
      return "Manual — withdraw when you choose";
    default:
      return "";
  }
}

import type {
  WithdrawalMethodsState,
  WithdrawalSchedule,
} from "@/types/disbursement";
import type { CryptoChainId, CryptoTokenId } from "@/lib/crypto/assets";
import {
  addCryptoWithdrawal,
  addPayoneerWithdrawal,
  loadTaxProfileComplete,
  loadWithdrawalMethods,
  removeCryptoWithdrawal,
  removePayoneerWithdrawal,
  setDefaultCryptoWithdrawal,
  setDefaultPayoneerWithdrawal,
  setWithdrawalSchedule,
  updateCryptoWithdrawal,
} from "@/lib/disbursement/storage";

export type DisbursementContextResponse = {
  taxProfileComplete: boolean;
  methods: WithdrawalMethodsState;
};

/**
 * Disbursement API surface for talent withdrawals.
 *
 * Today: backed by localStorage via `lib/disbursement/storage.ts`.
 * Later: swap each function to `request(...)` against backend routes.
 */

export async function fetchDisbursementContext(): Promise<DisbursementContextResponse> {
  return {
    taxProfileComplete: loadTaxProfileComplete(),
    methods: loadWithdrawalMethods(),
  };
}

export async function connectPayoneerWithdrawal(email: string) {
  return addPayoneerWithdrawal(email);
}

export async function disconnectPayoneerWithdrawal() {
  return removePayoneerWithdrawal();
}

export async function saveCryptoWithdrawal(body: {
  address: string;
  chain: CryptoChainId;
  label?: string;
  token?: CryptoTokenId;
}) {
  return addCryptoWithdrawal(body);
}

export async function updateCryptoWithdrawalMethod(
  uid: string,
  body: {
    address: string;
    label?: string;
    token?: CryptoTokenId;
  },
) {
  return updateCryptoWithdrawal(uid, body);
}

export async function removeCryptoWithdrawalMethod(uid: string) {
  return removeCryptoWithdrawal(uid);
}

export async function setDefaultPayoneerMethod() {
  return setDefaultPayoneerWithdrawal();
}

export async function setDefaultCryptoMethod(uid: string) {
  return setDefaultCryptoWithdrawal(uid);
}

export async function updateWithdrawalSchedule(
  schedule: WithdrawalSchedule | null,
) {
  return setWithdrawalSchedule(schedule);
}

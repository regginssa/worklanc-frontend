import type {
  WithdrawalMethodsState,
  WithdrawalSchedule,
} from "@/types/disbursement";
import type { CryptoChainId, CryptoTokenId } from "@/lib/crypto/assets";
import { request } from "./client";
import { localRequest } from "./localClient";

export type DisbursementContextResponse = {
  taxProfileComplete: boolean;
  methods: WithdrawalMethodsState;
};

export type RegisterPayoneerResponse = {
  payoneer: WithdrawalMethodsState["payoneer"];
  registrationLink: string;
};

export async function fetchDisbursementContext() {
  return request<DisbursementContextResponse>("/disbursements/context");
}

export async function registerPayoneerWithdrawal(email: string) {
  return request<RegisterPayoneerResponse>("/disbursements/payoneer/register", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function refreshPayoneerWithdrawal() {
  return request<{ payoneer: NonNullable<WithdrawalMethodsState["payoneer"]> }>(
    "/disbursements/payoneer/refresh",
    { method: "POST" },
  );
}

export async function disconnectPayoneerWithdrawal() {
  return request<{ success: boolean }>("/disbursements/payoneer", {
    method: "DELETE",
  });
}

export async function saveCryptoWithdrawal(body: {
  address: string;
  chain: CryptoChainId;
  label?: string;
  message: string;
  signature: string;
  token?: CryptoTokenId;
}) {
  return localRequest<{ wallet: WithdrawalMethodsState["cryptoWallets"][number] }>(
    "/api/disbursements/crypto/wallets",
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );
}

export async function updateCryptoWithdrawalMethod(
  uid: string,
  body: {
    address: string;
    chain: CryptoChainId;
    label?: string;
    message: string;
    signature: string;
    token?: CryptoTokenId;
  },
) {
  return localRequest<{ wallet: WithdrawalMethodsState["cryptoWallets"][number] }>(
    "/api/disbursements/crypto/wallets",
    {
      method: "PATCH",
      body: JSON.stringify({ uid, ...body }),
    },
  );
}

export async function removeCryptoWithdrawalMethod(uid: string) {
  return request<{ success: boolean }>(`/disbursements/crypto/wallets/${uid}`, {
    method: "DELETE",
  });
}

export async function setDefaultPayoneerMethod() {
  return request<{ payoneer: NonNullable<WithdrawalMethodsState["payoneer"]> }>(
    "/disbursements/default",
    {
      method: "PATCH",
      body: JSON.stringify({ type: "payoneer" }),
    },
  );
}

export async function setDefaultCryptoMethod(uid: string) {
  return request<{ wallet: WithdrawalMethodsState["cryptoWallets"][number] }>(
    "/disbursements/default",
    {
      method: "PATCH",
      body: JSON.stringify({ type: "crypto", uid }),
    },
  );
}

export async function updateWithdrawalSchedule(
  schedule: WithdrawalSchedule | null,
) {
  return request<{ schedule: WithdrawalSchedule | null }>(
    "/disbursements/schedule",
    {
      method: "PATCH",
      body: JSON.stringify({ schedule }),
    },
  );
}

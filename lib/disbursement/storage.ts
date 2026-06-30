import type {
  SavedCryptoWithdrawal,
  SavedPayoneerWithdrawal,
  WithdrawalMethodsState,
  WithdrawalSchedule,
} from "@/types/disbursement";
import type { CryptoChainId, CryptoTokenId } from "@/lib/crypto/assets";
import { getDefaultTokenForChain } from "@/lib/crypto/assets";

const METHODS_STORAGE_KEY = "worklanc_withdrawal_methods_v1";

/** Interim local persistence until disbursement backend routes are available. */

const EMPTY_STATE: WithdrawalMethodsState = {
  payoneer: null,
  cryptoWallets: [],
  schedule: null,
};

type LegacyWithdrawalMethodsState = WithdrawalMethodsState & {
  crypto?: SavedCryptoWithdrawal | null;
};

function generateUid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `wd_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function hasDefaultMethod(state: WithdrawalMethodsState): boolean {
  return Boolean(
    state.payoneer?.isDefault ||
      state.cryptoWallets.some((wallet) => wallet.isDefault),
  );
}

function clearDefaults(state: WithdrawalMethodsState): WithdrawalMethodsState {
  return {
    ...state,
    payoneer: state.payoneer
      ? { ...state.payoneer, isDefault: false }
      : null,
    cryptoWallets: state.cryptoWallets.map((wallet) => ({
      ...wallet,
      isDefault: false,
    })),
  };
}

function normalizeState(raw: LegacyWithdrawalMethodsState): WithdrawalMethodsState {
  if (raw.crypto && (!raw.cryptoWallets || raw.cryptoWallets.length === 0)) {
    return {
      payoneer: raw.payoneer ?? null,
      cryptoWallets: [raw.crypto],
      schedule: raw.schedule ?? null,
    };
  }

  return {
    payoneer: raw.payoneer ?? null,
    cryptoWallets: raw.cryptoWallets ?? [],
    schedule: raw.schedule ?? null,
  };
}

export function loadWithdrawalMethods(): WithdrawalMethodsState {
  return normalizeState(readJson(METHODS_STORAGE_KEY, EMPTY_STATE));
}

export function saveWithdrawalMethods(state: WithdrawalMethodsState) {
  writeJson(METHODS_STORAGE_KEY, state);
}

export function loadTaxProfileComplete(): boolean {
  return true;
}

export function saveTaxProfileComplete(_complete: boolean) {
  // No-op until tax API is integrated.
}

export function addPayoneerWithdrawal(email: string): WithdrawalMethodsState {
  const current = loadWithdrawalMethods();
  const shouldBeDefault = !hasDefaultMethod(current);

  let next = clearDefaults(current);
  const payoneer: SavedPayoneerWithdrawal = {
    uid: generateUid(),
    type: "payoneer",
    email: email.trim(),
    status: "active",
    isDefault: shouldBeDefault,
    createdAt: new Date().toISOString(),
  };

  next = { ...next, payoneer };
  saveWithdrawalMethods(next);
  return next;
}

export function removePayoneerWithdrawal(): WithdrawalMethodsState {
  const current = loadWithdrawalMethods();
  const wasDefault = current.payoneer?.isDefault ?? false;

  const next: WithdrawalMethodsState = {
    ...current,
    payoneer: null,
  };

  if (wasDefault && next.cryptoWallets.length > 0) {
    next.cryptoWallets = next.cryptoWallets.map((wallet, index) => ({
      ...wallet,
      isDefault: index === 0,
    }));
  }

  saveWithdrawalMethods(next);
  return next;
}

export function addCryptoWithdrawal(body: {
  address: string;
  chain: CryptoChainId;
  label?: string;
  token?: CryptoTokenId;
}): WithdrawalMethodsState {
  const current = loadWithdrawalMethods();

  if (current.cryptoWallets.some((wallet) => wallet.chain === body.chain)) {
    return current;
  }

  const shouldBeDefault = !hasDefaultMethod(current);
  let next = clearDefaults(current);

  const wallet: SavedCryptoWithdrawal = {
    uid: generateUid(),
    type: "crypto",
    address: body.address.trim(),
    chain: body.chain,
    token: body.token ?? getDefaultTokenForChain(body.chain),
    label: body.label?.trim() || null,
    isDefault: shouldBeDefault,
    createdAt: new Date().toISOString(),
  };

  next = {
    ...next,
    cryptoWallets: [...next.cryptoWallets, wallet],
  };

  saveWithdrawalMethods(next);
  return next;
}

export function updateCryptoWithdrawal(
  uid: string,
  body: {
    address: string;
    label?: string;
    token?: CryptoTokenId;
  },
): WithdrawalMethodsState {
  const current = loadWithdrawalMethods();
  const index = current.cryptoWallets.findIndex((wallet) => wallet.uid === uid);
  if (index < 0) return current;

  const next: WithdrawalMethodsState = {
    ...current,
    cryptoWallets: current.cryptoWallets.map((wallet) =>
      wallet.uid === uid
        ? {
            ...wallet,
            address: body.address.trim(),
            label: body.label?.trim() || null,
            token: body.token ?? wallet.token,
          }
        : wallet,
    ),
  };

  saveWithdrawalMethods(next);
  return next;
}

export function removeCryptoWithdrawal(uid: string): WithdrawalMethodsState {
  const current = loadWithdrawalMethods();
  const removed = current.cryptoWallets.find((wallet) => wallet.uid === uid);
  const nextWallets = current.cryptoWallets.filter((wallet) => wallet.uid !== uid);

  const next: WithdrawalMethodsState = {
    ...current,
    cryptoWallets: nextWallets,
  };

  if (removed?.isDefault && nextWallets.length > 0) {
    next.cryptoWallets = nextWallets.map((wallet, index) => ({
      ...wallet,
      isDefault: index === 0,
    }));
  }

  if (removed?.isDefault && nextWallets.length === 0 && next.payoneer) {
    next.payoneer = { ...next.payoneer, isDefault: true };
  }

  saveWithdrawalMethods(next);
  return next;
}

export function setDefaultPayoneerWithdrawal(): WithdrawalMethodsState {
  const current = loadWithdrawalMethods();
  if (!current.payoneer) return current;

  const next: WithdrawalMethodsState = {
    ...clearDefaults(current),
    payoneer: { ...current.payoneer, isDefault: true },
  };

  saveWithdrawalMethods(next);
  return next;
}

export function setDefaultCryptoWithdrawal(uid: string): WithdrawalMethodsState {
  const current = loadWithdrawalMethods();
  if (!current.cryptoWallets.some((wallet) => wallet.uid === uid)) {
    return current;
  }

  const next: WithdrawalMethodsState = {
    ...clearDefaults(current),
    cryptoWallets: current.cryptoWallets.map((wallet) => ({
      ...wallet,
      isDefault: wallet.uid === uid,
    })),
  };

  saveWithdrawalMethods(next);
  return next;
}

export function setWithdrawalSchedule(
  schedule: WithdrawalSchedule | null,
): WithdrawalMethodsState {
  const current = loadWithdrawalMethods();
  const next = { ...current, schedule };
  saveWithdrawalMethods(next);
  return next;
}

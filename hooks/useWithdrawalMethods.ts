"use client";

import {
  disconnectPayoneerWithdrawal,
  fetchDisbursementContext,
  refreshPayoneerWithdrawal,
  registerPayoneerWithdrawal,
  removeCryptoWithdrawalMethod,
  saveCryptoWithdrawal,
  setDefaultCryptoMethod,
  setDefaultPayoneerMethod,
  updateCryptoWithdrawalMethod,
  updateWithdrawalSchedule,
} from "@/lib/api/disbursements";
import type {
  WithdrawalMethodsState,
  WithdrawalSchedule,
} from "@/types/disbursement";
import type { CryptoChainId, CryptoTokenId } from "@/lib/crypto/assets";
import { useCallback, useEffect, useState } from "react";

const EMPTY_METHODS: WithdrawalMethodsState = {
  payoneer: null,
  cryptoWallets: [],
  schedule: null,
};

export function useWithdrawalMethods() {
  const [methods, setMethods] = useState<WithdrawalMethodsState>(EMPTY_METHODS);
  const [taxProfileComplete, setTaxProfileComplete] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const context = await fetchDisbursementContext();
    if (context) {
      setMethods(context.methods ?? EMPTY_METHODS);
      setTaxProfileComplete(context.taxProfileComplete ?? true);
      setHydrated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const connectPayoneer = useCallback(async (email: string) => {
    const result = await registerPayoneerWithdrawal(email);
    if (!result?.payoneer) return null;
    await refresh();
    return result;
  }, [refresh]);

  const refreshPayoneer = useCallback(async () => {
    const result = await refreshPayoneerWithdrawal();
    if (result?.payoneer) {
      await refresh();
    }
    return result;
  }, [refresh]);

  const disconnectPayoneer = useCallback(async () => {
    const result = await disconnectPayoneerWithdrawal();
    if (result?.success) {
      await refresh();
    }
    return result;
  }, [refresh]);

  const saveCrypto = useCallback(
    async (body: {
      address: string;
      chain: CryptoChainId;
      label?: string;
      token?: CryptoTokenId;
      message: string;
      signature: string;
    }) => {
      const result = await saveCryptoWithdrawal(body);
      if (result?.wallet) {
        await refresh();
      }
      return result;
    },
    [refresh],
  );

  const updateCrypto = useCallback(
    async (
      uid: string,
      body: {
        address: string;
        chain: CryptoChainId;
        label?: string;
        token?: CryptoTokenId;
        message: string;
        signature: string;
      },
    ) => {
      const result = await updateCryptoWithdrawalMethod(uid, body);
      if (result?.wallet) {
        await refresh();
      }
      return result;
    },
    [refresh],
  );

  const removeCrypto = useCallback(
    async (uid: string) => {
      const result = await removeCryptoWithdrawalMethod(uid);
      if (result?.success) {
        await refresh();
      }
      return result;
    },
    [refresh],
  );

  const setDefaultPayoneer = useCallback(async () => {
    const result = await setDefaultPayoneerMethod();
    if (result?.payoneer) {
      await refresh();
    }
    return result;
  }, [refresh]);

  const setDefaultCrypto = useCallback(
    async (uid: string) => {
      const result = await setDefaultCryptoMethod(uid);
      if (result?.wallet) {
        await refresh();
      }
      return result;
    },
    [refresh],
  );

  const updateSchedule = useCallback(
    async (schedule: WithdrawalSchedule | null) => {
      const result = await updateWithdrawalSchedule(schedule);
      if (result) {
        await refresh();
      }
      return result;
    },
    [refresh],
  );

  return {
    methods,
    taxProfileComplete,
    hydrated,
    isLoading,
    refresh,
    connectPayoneer,
    refreshPayoneer,
    disconnectPayoneer,
    saveCrypto,
    updateCrypto,
    removeCrypto,
    setDefaultPayoneer,
    setDefaultCrypto,
    updateSchedule,
  };
}

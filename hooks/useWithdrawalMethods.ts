"use client";

import {
  connectPayoneerWithdrawal,
  disconnectPayoneerWithdrawal,
  fetchDisbursementContext,
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

export function useWithdrawalMethods() {
  const [methods, setMethods] = useState<WithdrawalMethodsState>({
    payoneer: null,
    cryptoWallets: [],
    schedule: null,
  });
  const [taxProfileComplete, setTaxProfileComplete] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(async () => {
    const context = await fetchDisbursementContext();
    setMethods(context.methods);
    setTaxProfileComplete(context.taxProfileComplete);
    setHydrated(true);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const connectPayoneer = useCallback(async (email: string) => {
    const next = await connectPayoneerWithdrawal(email);
    setMethods(next);
    return next;
  }, []);

  const disconnectPayoneer = useCallback(async () => {
    const next = await disconnectPayoneerWithdrawal();
    setMethods(next);
    return next;
  }, []);

  const saveCrypto = useCallback(
    async (body: {
      address: string;
      chain: CryptoChainId;
      label?: string;
      token?: CryptoTokenId;
    }) => {
      const next = await saveCryptoWithdrawal(body);
      setMethods(next);
      return next;
    },
    [],
  );

  const updateCrypto = useCallback(
    async (
      uid: string,
      body: { address: string; label?: string; token?: CryptoTokenId },
    ) => {
      const next = await updateCryptoWithdrawalMethod(uid, body);
      setMethods(next);
      return next;
    },
    [],
  );

  const removeCrypto = useCallback(async (uid: string) => {
    const next = await removeCryptoWithdrawalMethod(uid);
    setMethods(next);
    return next;
  }, []);

  const setDefaultPayoneer = useCallback(async () => {
    const next = await setDefaultPayoneerMethod();
    setMethods(next);
    return next;
  }, []);

  const setDefaultCrypto = useCallback(async (uid: string) => {
    const next = await setDefaultCryptoMethod(uid);
    setMethods(next);
    return next;
  }, []);

  const updateSchedule = useCallback(
    async (schedule: WithdrawalSchedule | null) => {
      const next = await updateWithdrawalSchedule(schedule);
      setMethods(next);
      return next;
    },
    [],
  );

  return {
    methods,
    taxProfileComplete,
    hydrated,
    refresh,
    connectPayoneer,
    disconnectPayoneer,
    saveCrypto,
    updateCrypto,
    removeCrypto,
    setDefaultPayoneer,
    setDefaultCrypto,
    updateSchedule,
  };
}

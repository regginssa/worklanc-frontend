import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";
import AccountsAPI, { type AccountOnboardingPatch } from "@/lib/api/accounts";
import type { Account } from "@/types/user";

const FINISH_PATH = "/nx/client/dashboard";
const CLIENT_START_PATH = "/nx/client-onboarding/company-size";

export const useClientOnboarding = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const account = user?.accounts.find((item) => item.type === "client") ?? null;

  const syncAccount = (updated?: Account) => {
    if (!user || !updated) return;
    dispatch(
      setUser({
        ...user,
        accounts: user.accounts.map((existing) =>
          existing.id === updated.id ? { ...existing, ...updated } : existing,
        ),
      }),
    );
  };

  const isLoading = (actionId: string) => loadingAction === actionId;

  const saveStep = async (
    patch: AccountOnboardingPatch,
    nextPath: string,
    actionId = "saveStep",
  ) => {
    if (!account) return null;
    setLoadingAction(actionId);
    try {
      const res = await AccountsAPI.updateOnboarding(account.id, {
        ...patch,
        step: nextPath,
      });
      if (res?.account) syncAccount(res.account);
      await router.push(nextPath);
      return res;
    } finally {
      setLoadingAction(null);
    }
  };

  const complete = async (
    patch: Omit<AccountOnboardingPatch, "step" | "completed"> = {},
    nextPath: string = FINISH_PATH,
    actionId = "complete",
  ) => {
    if (!account) return null;
    setLoadingAction(actionId);
    try {
      const res = await AccountsAPI.updateOnboarding(account.id, {
        ...patch,
        completed: true,
      });
      if (res?.account) syncAccount(res.account);
      await router.push(nextPath);
      return res;
    } finally {
      setLoadingAction(null);
    }
  };

  const goBack = async (prevPath: string, actionId = "goBack") => {
    if (!account) return;
    setLoadingAction(actionId);
    try {
      const res = await AccountsAPI.updateOnboarding(account.id, { step: prevPath });
      if (res?.account) syncAccount(res.account);
      await router.push(prevPath);
    } finally {
      setLoadingAction(null);
    }
  };

  return {
    account,
    loadingAction,
    isLoading,
    saving: loadingAction !== null,
    startPath: CLIENT_START_PATH,
    saveStep,
    complete,
    goBack,
  };
};

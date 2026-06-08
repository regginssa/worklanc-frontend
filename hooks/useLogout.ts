import { useCallback } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import AuthAPI, { removeAuthToken } from "@/lib/api/auth";
import { useAppDispatch } from "@/store/hooks";
import { clearUser } from "@/store/slices/userSlice";

export function useLogout(redirectTo = "/nx/login") {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useCallback(async () => {
    try {
      await AuthAPI.logout();
    } finally {
      removeAuthToken();
      dispatch(clearUser());
      queryClient.clear();
      await router.push(redirectTo);
    }
  }, [dispatch, queryClient, redirectTo, router]);
}

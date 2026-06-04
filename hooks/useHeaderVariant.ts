import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import {
  HeaderVariant,
  resolveHeaderVariant,
} from "@/lib/headerVariant";

export function useHeaderVariant(forcedVariant?: HeaderVariant): HeaderVariant {
  const { pathname } = useRouter();
  const { user, status } = useAppSelector((state) => state.user);

  return resolveHeaderVariant({
    pathname,
    user,
    isAuthenticated: status === "authenticated",
    forcedVariant,
  });
}

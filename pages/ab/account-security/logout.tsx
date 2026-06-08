import { useEffect } from "react";
import { useLogout } from "@/hooks/useLogout";

export default function LogoutPage() {
  const logout = useLogout();

  useEffect(() => {
    void logout();
  }, [logout]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-slate-600">Logging out...</p>
    </main>
  );
}

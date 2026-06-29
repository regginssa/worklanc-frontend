"use client";

import { initAppKit } from "@/lib/appkit/init";
import { wagmiAdapter } from "@/lib/appkit/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

initAppKit();

const queryClient = new QueryClient();

export default function AppKitProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initAppKit();
    setMounted(true);
  }, []);

  if (!mounted || !wagmiAdapter?.wagmiConfig) {
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as any}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

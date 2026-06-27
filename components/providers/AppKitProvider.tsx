import {
  appKitMetadata,
  appKitNetworks,
  reownProjectId,
  wagmiAdapter,
} from "@/lib/appkit/config";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { createAppKit } from "@reown/appkit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

let appKitInitialized = false;

function initializeAppKit() {
  if (typeof window === "undefined" || !reownProjectId || !wagmiAdapter) {
    return;
  }

  if (appKitInitialized) {
    return;
  }

  const solanaAdapter = new SolanaAdapter();

  createAppKit({
    adapters: [wagmiAdapter, solanaAdapter],
    networks: appKitNetworks,
    projectId: reownProjectId,
    metadata: appKitMetadata,
    features: {
      analytics: false,
    },
  });

  appKitInitialized = true;
}

export default function AppKitProvider({ children }: { children: ReactNode }) {
  const [ready] = useState(() => {
    initializeAppKit();
    return true;
  });

  if (!ready || !wagmiAdapter?.wagmiConfig) {
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as any}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

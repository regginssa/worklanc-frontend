import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { createAppKit } from "@reown/appkit/react";
import {
  appKitMetadata,
  appKitNetworks,
  reownProjectId,
  wagmiAdapter,
} from "@/lib/appkit/config";

let appKitInitialized = false;

export function initAppKit() {
  if (appKitInitialized || !reownProjectId || !wagmiAdapter) {
    return appKitInitialized;
  }

  const solanaAdapter = new SolanaAdapter();

  createAppKit({
    adapters: [wagmiAdapter, solanaAdapter],
    networks: appKitNetworks,
    projectId: reownProjectId,
    metadata: appKitMetadata,
    features: {
      analytics: false,
      socials: false,
      email: false,
    },
  });

  appKitInitialized = true;
  return true;
}

export function isAppKitReady() {
  return appKitInitialized;
}

if (typeof window !== "undefined") {
  initAppKit();
}

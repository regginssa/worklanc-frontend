import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  bsc,
  bscTestnet,
  mainnet,
  sepolia,
  solana,
  solanaDevnet,
} from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

export const reownProjectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ?? "";

export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.APP_URL ??
  "http://localhost:3000";

const useTestnets = process.env.NEXT_PUBLIC_APPKIT_USE_TESTNETS === "true";

export const appKitNetworks: [AppKitNetwork, ...AppKitNetwork[]] = useTestnets
  ? [solanaDevnet, sepolia, bscTestnet]
  : [solana, mainnet, bsc];

export const appKitMetadata = {
  name: "Worklanc",
  description: "Connect your crypto wallet to deposit funds on Worklanc.",
  url: appUrl,
  icons: [`${appUrl}/assets/logos/logo.svg`],
};

export const wagmiAdapter = reownProjectId
  ? new WagmiAdapter({
      ssr: true,
      projectId: reownProjectId,
      networks: appKitNetworks,
    })
  : null;

export const wagmiConfig = wagmiAdapter?.wagmiConfig ?? null;

import type { StaticImageData } from "next/image";
import BnbLogo from "@/public/assets/svgs/icons/logos/bnb.svg";
import ChrleLogo from "@/public/assets/svgs/icons/logos/chrle.png";
import BabyuLogo from "@/public/assets/svgs/icons/logos/babyu.png";
import EthLogo from "@/public/assets/svgs/icons/logos/eth.svg";
import SolLogo from "@/public/assets/svgs/icons/logos/sol.svg";
import UsdcLogo from "@/public/assets/svgs/icons/logos/usdc.svg";
import UsdtLogo from "@/public/assets/svgs/icons/logos/usdt.svg";

export type CryptoChainId = "solana" | "ethereum" | "bnb";

export type CryptoTokenId =
  | "chrle"
  | "babyu"
  | "sol"
  | "eth"
  | "bnb"
  | "usdc"
  | "usdt";

export interface CryptoChainOption {
  id: CryptoChainId;
  label: string;
  description: string;
  icon: StaticImageData;
  caipPrefix: string;
}

export interface CryptoTokenOption {
  id: CryptoTokenId;
  label: string;
  symbol: string;
  description: string;
  icon: StaticImageData;
  chainId: CryptoChainId;
}

export const CRYPTO_CHAINS: CryptoChainOption[] = [
  {
    id: "solana",
    label: "Solana",
    description: "Fast, low-fee network for CHRLE, BABYU, SOL, and stablecoins.",
    icon: SolLogo,
    caipPrefix: "solana:",
  },
  {
    id: "ethereum",
    label: "Ethereum",
    description: "Main Ethereum network for ETH and ERC-20 stablecoins.",
    icon: EthLogo,
    caipPrefix: "eip155:1:",
  },
  {
    id: "bnb",
    label: "BNB Chain",
    description: "BNB Smart Chain for BNB and BEP-20 stablecoins.",
    icon: BnbLogo,
    caipPrefix: "eip155:56:",
  },
];

export const CRYPTO_TOKENS: CryptoTokenOption[] = [
  {
    id: "chrle",
    label: "CHRLE",
    symbol: "CHRLE",
    description: "Worklanc token on Solana.",
    icon: ChrleLogo,
    chainId: "solana",
  },
  {
    id: "babyu",
    label: "BABYU",
    symbol: "BABYU",
    description: "Worklanc token on Solana.",
    icon: BabyuLogo,
    chainId: "solana",
  },
  {
    id: "sol",
    label: "SOL",
    symbol: "SOL",
    description: "Native Solana token used for network fees.",
    icon: SolLogo,
    chainId: "solana",
  },
  {
    id: "usdc",
    label: "USDC",
    symbol: "USDC",
    description: "USD Coin stablecoin.",
    icon: UsdcLogo,
    chainId: "solana",
  },
  {
    id: "usdt",
    label: "USDT",
    symbol: "USDT",
    description: "Tether USD stablecoin.",
    icon: UsdtLogo,
    chainId: "solana",
  },
  {
    id: "eth",
    label: "ETH",
    symbol: "ETH",
    description: "Native Ethereum token.",
    icon: EthLogo,
    chainId: "ethereum",
  },
  {
    id: "usdc",
    label: "USDC",
    symbol: "USDC",
    description: "USD Coin on Ethereum (ERC-20).",
    icon: UsdcLogo,
    chainId: "ethereum",
  },
  {
    id: "usdt",
    label: "USDT",
    symbol: "USDT",
    description: "Tether USD on Ethereum (ERC-20).",
    icon: UsdtLogo,
    chainId: "ethereum",
  },
  {
    id: "bnb",
    label: "BNB",
    symbol: "BNB",
    description: "Native BNB Chain token.",
    icon: BnbLogo,
    chainId: "bnb",
  },
  {
    id: "usdc",
    label: "USDC",
    symbol: "USDC",
    description: "USD Coin on BNB Chain (BEP-20).",
    icon: UsdcLogo,
    chainId: "bnb",
  },
  {
    id: "usdt",
    label: "USDT",
    symbol: "USDT",
    description: "Tether USD on BNB Chain (BEP-20).",
    icon: UsdtLogo,
    chainId: "bnb",
  },
];

export function getTokensForChain(chainId: CryptoChainId) {
  return CRYPTO_TOKENS.filter((token) => token.chainId === chainId);
}

export function getChainById(chainId: CryptoChainId) {
  return CRYPTO_CHAINS.find((chain) => chain.id === chainId);
}

export function getTokenOption(chainId: CryptoChainId, tokenId: CryptoTokenId) {
  return CRYPTO_TOKENS.find(
    (token) => token.chainId === chainId && token.id === tokenId,
  );
}

export function isWalletOnChain(
  chainId: CryptoChainId,
  caipAddress?: string,
  address?: string,
) {
  const chain = getChainById(chainId);
  if (!chain || !address) return false;

  if (caipAddress) {
    return caipAddress.startsWith(chain.caipPrefix);
  }

  if (chainId === "solana") {
    return !address.startsWith("0x");
  }

  return address.startsWith("0x");
}

export function shortenAddress(address: string) {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

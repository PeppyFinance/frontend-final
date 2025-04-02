import { SupportedChainId } from "@symmio/frontend-sdk/constants/chains";
import {
  Chain,
  arbitrum,
  base,
  blast,
  bsc,
  fantom,
  mainnet,
  mantle,
  polygon,
} from "wagmi/chains";
import { FrontEndsName } from "./addresses";

const iotaEvm = {
  id: 8822,
  name: "Wrapped IOTA",
  nativeCurrency: {
    name: "WIOTA",
    symbol: "WIOTA",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://json-rpc.evm.iotaledger.net"] },
  },
  blockExplorers: {
    default: {
      name: "IOTA EVM explorer",
      url: "https://explorer.evm.iota.org/",
      apiUrl: "https://explorer.evm.iota.org/api",
    },
  },
} as const satisfies Chain;

const supportedWagmiChain = {
  [SupportedChainId.FANTOM]: fantom,
  [SupportedChainId.BSC]: bsc,
  [SupportedChainId.BASE]: base,
  [SupportedChainId.POLYGON]: polygon,
  [SupportedChainId.ARBITRUM]: arbitrum,
  [SupportedChainId.MAINNET]: mainnet,
  [SupportedChainId.MANTLE]: mantle,
  [SupportedChainId.BLAST]: blast,
  iotaEvm,
};

function getWagmiChain(supportChainList: number[]): Chain[] {
  return supportChainList.map((chainId) => supportedWagmiChain[chainId]);
}

export const ClientChain = [SupportedChainId.BASE, SupportedChainId.IOTAEVM];

export const ALL_CHAINS = Object.values(supportedWagmiChain);

export const APP_CHAINS = getWagmiChain(ClientChain);

export const FALLBACK_CHAIN_ID = SupportedChainId.BASE;
export const FALLBACK_FE_NAME = FrontEndsName.CYBAR;

import {SupportedChainId} from "@symmio/frontend-sdk/constants/chains";
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
import {FrontEndsName} from "./addresses";

const supportedWagmiChain = {
  [SupportedChainId.FANTOM]: fantom,
  [SupportedChainId.BSC]: bsc,
  [SupportedChainId.BASE]: base,
  [SupportedChainId.POLYGON]: polygon,
  [SupportedChainId.ARBITRUM]: arbitrum,
  [SupportedChainId.MAINNET]: mainnet,
  [SupportedChainId.MANTLE]: mantle,
  [SupportedChainId.BLAST]: blast,
};

function getWagmiChain(supportChainList: number[]): Chain[] {
  return supportChainList.map(chainId => supportedWagmiChain[chainId]);
}

export const ClientChain = [SupportedChainId.BASE];

export const ALL_CHAINS = Object.values(supportedWagmiChain);

export const APP_CHAINS = getWagmiChain(ClientChain);

export const FALLBACK_CHAIN_ID = SupportedChainId.BASE;
export const FALLBACK_FE_NAME = FrontEndsName.CYBAR;

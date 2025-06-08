import { SupportedChainId } from "@symmio/frontend-sdk/constants/chains";
import {
  Chain,
  base,
} from "wagmi/chains";
import { FrontEndsName } from "./addresses";
import { iotaEvm } from "./iota";

const supportedWagmiChain = {
  [SupportedChainId.BASE]: base,
  [iotaEvm.id]: iotaEvm
};

function getWagmiChain(supportChainList: number[]): Chain[] {
  return supportChainList.map((chainId) => supportedWagmiChain[chainId]);
}

export const ClientChain = [SupportedChainId.BASE];

export const ALL_CHAINS = Object.values(supportedWagmiChain);

export const APP_CHAINS = getWagmiChain(ClientChain);

export const FALLBACK_CHAIN_ID = SupportedChainId.BASE;
export const FALLBACK_FE_NAME = FrontEndsName.CYBAR;

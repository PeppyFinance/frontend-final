import {
  SupportedChainId,
  isSupportedChain,
} from "@symmio/frontend-sdk/constants/chains";
import { StaticImageData } from "next/legacy/image";
export const ChainInfo: { [chainId: number]: StaticImageData } = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.MAINNET]: require("/public/static/images/networks/mainnet.svg"),
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.ROPSTEN]: require("/public/static/images/networks/mainnet.svg"),
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.RINKEBY]: require("/public/static/images/networks/mainnet.svg"),
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.BSC]: require("/public/static/images/networks/binance.svg"),
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.BSC_TESTNET]: require("/public/static/images/networks/binance.svg"),
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.POLYGON]: require("/public/static/images/networks/polygon.svg"),
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.FANTOM]: require("/public/static/images/networks/fantom.svg"),
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.ARBITRUM]: require("/public/static/images/networks/arbitrum.png"),
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.BASE]: require("/public/static/images/networks/base.png"),
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.MANTLE]: require("/public/static/images/networks/mantle.svg"),
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  [SupportedChainId.BLAST]: require("/public/static/images/networks/blast.svg"),
};

export function getChainLogo(chainId: number | undefined): any {
  if (chainId && isSupportedChain(chainId)) {
    return ChainInfo[chainId];
  }
  return undefined;
}

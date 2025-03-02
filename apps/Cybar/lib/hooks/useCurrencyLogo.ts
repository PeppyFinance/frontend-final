import { useEffect, useMemo, useState } from "react";

import { SupportedChainId } from "@symmio/frontend-sdk/constants/chains";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import DefaultToken from "/public/static/images/tokens/default-token.svg";

// TODO: Add Fartcoin, Blur, JTO, Dusk, MANTA, ATA, DYM, BEAMX, RDNT, LEVER, AI, SSV, ai16z, bigtime, ntrn, CHR, RENDER, PENGU, JOE, XAI, THE, AGLD, GRASS, NEIRO, ZETA, 1000RATS, STG, AERO, CHZ, MYRO, 1000LUNC, REZ, GRIFFAIN, GMX, AIXBT, SKL, TOKEN, CETUS, ARKM, RARE, XVS
// TODO: Change background for WLD, NEAR, SEI, ONDO, CFX, AR, GALA, ALT, CKB, TAO
const tokenNames = [
  "BTC",
  "USDT",
  "USDC",
  "ETH",
  "LINA",
  "ADA",
  "ARB",
  "AVAX",
  "DOGE",
  "FTM",
  "KLAY",
  "MATIC",
  "SOL",
  "XRP",
  "ZEC",
  "ALGO",
  "ATOM",
  "BAT",
  "BCH",
  "BNB",
  "DASH",
  "EOS",
  "ETC",
  "IOST",
  "IOTA",
  "LINK",
  "LTC",
  "PEPE",
  "QTUM",
  "THETA",
  "TRX",
  "VET",
  "XLM",
  "XTZ",
  "ZIL",
  "XMR",
  "ZRX",
  "YFI",
  "COMP",
  "CRV",
  "KNC",
  "OMG",
  "BAND",
  "KAVA",
  "UNI",
  "MKR",
  "SUSHI",
  "AAVE",
  "WIF",
  "SUI",
  "SEI",
  "INJ",
  "TIA",
  "RUNE",
  "NEAR",
  "LDO",
  "OP",
  "APT",
  "FIL",
  "MINA",
  "FET",
  "ONDO",
  "JUP",
  "ENA",
  "STX",
  "PENDLE",
  "DYDX",
  "ORDI",
  "APE",
  "TON",
  "WLD",
  "POPCAT",
  "MASK",
  "CTSI",
  "CFX",
  "VIRTUAL",
  "DOT",
  "AR",
  "UMA",
  "PYTH",
  "GALA",
  "ALT",
  "SAND",
  "SNX",
  "ENS",
  "FXS",
  "BOME",
  "ICP",
  "IMX",
  "1000SHIB",
  "API3",
  "MANA",
  "COTI",
  "IOTX",
  "AXS",
  "MEME",
  "CKB",
  "ONT",
  "GRT",
  "HBAR",
  "TAO",
  "NEO",
  "SUPER",
  "ROSE",
  "KAS",
  "STRK",
  "RLC",
  "EGLD",
  "ASTR",
  "ANKR",
  "WOO",
  "1000FLOKI",
  "1000BONK",
  "1000PEPE",
];

const LogoMap: { [token: string]: any } = {};

tokenNames.forEach((token) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  LogoMap[token] = require(`/public/static/images/tokens/${token}.svg`);
});

export default function useCurrencyLogo(contractOrSymbol?: string): string {
  return useMemo(() => {
    try {
      if (contractOrSymbol && contractOrSymbol in LogoMap) {
        return LogoMap[contractOrSymbol];
      }
      return DefaultToken;
      // return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${contractOrSymbol}/logo.png`
    } catch (err) {
      return DefaultToken;
    }
  }, [contractOrSymbol]);
}

export function useCollateralLogo(): string {
  const { chainId } = useActiveWagmi();
  const [collateralLogo, setCollateralLogo] = useState(DefaultToken);

  useEffect(() => {
    switch (chainId) {
      case SupportedChainId.FANTOM:
      case SupportedChainId.BASE:
      case SupportedChainId.POLYGON:
        setCollateralLogo(LogoMap["USDC"]);
        break;
      case SupportedChainId.BSC:
      case SupportedChainId.BSC_TESTNET:
        setCollateralLogo(LogoMap["USDT"]);
        break;
      default:
        setCollateralLogo(DefaultToken);
    }
  }, [chainId]);

  return collateralLogo;
}

import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../declaration";

import { SupportedChainId } from "../../constants/chains";
import { useAllMarketsData } from "../../hooks/useAllMarketsData";
import useActiveWagmi from "../../lib/hooks/useActiveWagmi";
import useDebounce from "../../lib/hooks/useDebounce";
import { useSupportedChainId } from "../../lib/hooks/useSupportedChainId";
import { ApiState, ConnectionStatus } from "../../types/api";
import { Market } from "../../types/market";
import { useHedgerAddress } from "../chains/hooks";
import {
  updateDepth,
  updateFundingRates,
  updateNotionalCap,
  updatePrices,
  updateWebSocketStatus,
} from "./actions";
import {
  FundingRateData,
  FundingRateMap,
  MarketData,
  MarketDataMap,
  MarketDepthData,
  MarketNotionalCap,
  MarketsInfo,
} from "./types";

export function useMarketsStatus(): ApiState {
  const marketsStatus: ApiState = useAppSelector(
    (state) => state.hedger.marketsStatus
  );
  return marketsStatus;
}

export function useOpenInterestStatus(): ApiState {
  const openInterestStatus: ApiState = useAppSelector(
    (state) => state.hedger.openInterestStatus
  );
  return openInterestStatus;
}

export function useSetWebSocketStatus() {
  const dispatch = useAppDispatch();
  return useCallback(
    (status: ConnectionStatus) => {
      dispatch(updateWebSocketStatus({ status }));
    },
    [dispatch]
  );
}

export function useActiveHedgerId() {
  return 0;
}
export function useHedgerInfo() {
  const { chainId } = useActiveWagmi();
  const isSupportedChainId = useSupportedChainId();
  const debouncedIsSupportedChainId = useDebounce(isSupportedChainId, 3000);
  const hedgerAddress = useHedgerAddress();
  const activeHedgerId = useActiveHedgerId();
  return useMemo(
    () =>
      debouncedIsSupportedChainId && chainId && hedgerAddress[chainId]
        ? hedgerAddress[chainId][activeHedgerId]
        : hedgerAddress[SupportedChainId.NOT_SET][activeHedgerId],
    [activeHedgerId, chainId, debouncedIsSupportedChainId, hedgerAddress]
  );
}

export function useWebSocketUrl() {
  const hedger = useHedgerInfo();
  return useMemo(() => (hedger ? hedger.webSocketUrl : null), [hedger]);
}

export function useWebSocketStatus() {
  const webSocketStatus = useAppSelector(
    (state) => state.hedger.webSocketStatus
  );
  return webSocketStatus;
}

export type OrderMarktes = keyof MarketsInfo[string];
export type Direction = "asc" | "desc";
export interface OrderMarktesProps {
  sortBy?: OrderMarktes;
  direction?: Direction;
}
export function useMarkets({ sortBy, direction }: OrderMarktesProps = {}) {
  const markets: Market[] = useAppSelector((state) => state.hedger.markets);
  const { marketsInfo, infoStatus } = useAllMarketsData();
  // TODO: consider sorting library like fast-sort if too slow
  return useMemo(() => {
    if (infoStatus === ApiState.OK && sortBy) {
      // TODO: fix tsConfig
      return [...markets].sort((m1, m2) => {
        const mInfo1 = marketsInfo[m1.name];
        const mInfo2 = marketsInfo[m2.name];
        if (mInfo1 === undefined || mInfo2 === undefined) {
          return 0;
        }
        return direction === "asc"
          ? Number(mInfo1[sortBy]) - Number(mInfo2[sortBy])
          : Number(mInfo2[sortBy]) - Number(mInfo1[sortBy]);
      });
    } else {
      return markets;
    }
  }, [direction, infoStatus, markets, marketsInfo, sortBy]);
  // return markets;
}

export function useErrorMessages() {
  const errorMessages = useAppSelector((state) => state.hedger.errorMessages);
  return errorMessages;
}

export function useMarketNotionalCap() {
  const marketNotionalCap = useAppSelector(
    (state) => state.hedger.marketNotionalCap
  );
  const marketNotionalCapStatus = useAppSelector(
    (state) => state.hedger.marketNotionalCapStatus
  );
  return { marketNotionalCap, marketNotionalCapStatus };
}

export function useMarketOpenInterest() {
  const openInterest = useAppSelector((state) => state.hedger.openInterest);
  return openInterest;
}

export function usePrices() {
  const prices = useAppSelector((state) => state.hedger.prices);
  return prices;
}

export function useMarketPriceRange() {
  const priceRange = useAppSelector((state) => state.hedger.priceRange);
  return priceRange;
}

export function useMarketData(name: string | undefined): MarketData | null {
  const prices = useAppSelector((state) => state.hedger.prices);
  return name ? prices[name] : null;
}

export function useFundingRateData(
  name: string | undefined
): FundingRateData | null {
  const fundingRates = useAppSelector((state) => state.hedger.fundingRates);
  return name ? fundingRates[name] : null;
}

export function useMarketDepth(
  name: string | undefined
): MarketDepthData | null {
  const depths = useAppSelector((state) => state.hedger.depths);
  return name ? depths[name] : null;
}

export function useSetPrices() {
  const dispatch = useAppDispatch();
  return useCallback(
    (prices: MarketDataMap) => {
      dispatch(updatePrices({ prices }));
    },
    [dispatch]
  );
}

export function useSetFundingRates() {
  const dispatch = useAppDispatch();
  return useCallback(
    (fundingRates: FundingRateMap) => {
      dispatch(updateFundingRates({ fundingRates }));
    },
    [dispatch]
  );
}

export function useSetDepth() {
  const dispatch = useAppDispatch();
  return useCallback(
    (depth: MarketDepthData, name: string) => {
      dispatch(updateDepth({ name, depth }));
    },
    [dispatch]
  );
}

export function useSetNotionalCap() {
  const dispatch = useAppDispatch();
  return useCallback(
    (notionalCap: MarketNotionalCap) => {
      dispatch(updateNotionalCap({ notionalCap }));
    },
    [dispatch]
  );
}

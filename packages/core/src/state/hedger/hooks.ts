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
import { useCoinCategories, useCoinRecommendations } from "../market/hooks";
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
    (state) => state.hedger.marketsStatus,
  );
  return marketsStatus;
}

export function useOpenInterestStatus(): ApiState {
  const openInterestStatus: ApiState = useAppSelector(
    (state) => state.hedger.openInterestStatus,
  );
  return openInterestStatus;
}

export function useSetWebSocketStatus() {
  const dispatch = useAppDispatch();
  return useCallback(
    (status: ConnectionStatus) => {
      dispatch(updateWebSocketStatus({ status }));
    },
    [dispatch],
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
    [activeHedgerId, chainId, debouncedIsSupportedChainId, hedgerAddress],
  );
}

export function useWebSocketUrl() {
  const hedger = useHedgerInfo();
  return useMemo(() => (hedger ? hedger.webSocketUrl : null), [hedger]);
}

export function useWebSocketStatus() {
  const webSocketStatus = useAppSelector(
    (state) => state.hedger.webSocketStatus,
  );
  return webSocketStatus;
}

export type OrderMarktes = keyof MarketsInfo[string];
export type Direction = "asc" | "desc";
export interface OrderMarktesProps {
  orderBy?: OrderMarktes;
  direction?: Direction;
  coinCategory?: string;
}
export function useMarkets({
  orderBy,
  direction,
  coinCategory,
}: OrderMarktesProps = {}) {
  let markets: Market[] = useAppSelector((state) => state.hedger.markets);
  const coinCategories = useCoinCategories();
  const coinRecommendations = useCoinRecommendations();
  const { marketsInfo, infoStatus } = useAllMarketsData();

  return useMemo(() => {
    if (infoStatus !== ApiState.OK) {
      return markets;
    }
    if (coinCategory) {
      // convert coinCategories keys to uppercase to ensure equality
      // when accessing coinCategories object keys
      // coinCategories[coinCategory.toUpperCase()]
      const coinCategoriesUpperCase = Object.fromEntries(
        Object.entries(coinCategories).map(([key, val]) => [
          key.toUpperCase(),
          val,
        ]),
      );

      const category = coinCategoriesUpperCase[coinCategory.toUpperCase()]?.map(
        (symbol) => symbol.toUpperCase(),
      );

      if (category?.length > 0) {
        const upperCaseCoinSymbolSet = new Set(category);

        markets = markets.filter((market) =>
          upperCaseCoinSymbolSet.has(market.symbol.toUpperCase()),
        );
      }
    }
    if (coinRecommendations) {
      const coinRecommendationsUpperCase = Object.fromEntries(
        Object.entries(coinRecommendations).map(([key, val]) => [
          key.toUpperCase(),
          val,
        ]),
      );

      const upperCaseCoinSymbolSet = new Set(Object.keys(coinRecommendations));
      markets = markets.map((market) => {
        if (upperCaseCoinSymbolSet.has(market.symbol.toUpperCase())) {
          return {
            ...market,
            recommendation:
              coinRecommendationsUpperCase[market.symbol.toUpperCase()],
          };
        } else {
          return market;
        }
      });
    }

    if (orderBy) {
      return [...markets].sort((m1, m2) => {
        const mInfo1 = marketsInfo[m1.name];
        const mInfo2 = marketsInfo[m2.name];
        if (mInfo1 === undefined || mInfo2 === undefined) {
          return 0;
        }
        return direction === "asc"
          ? Number(mInfo1[orderBy]) - Number(mInfo2[orderBy])
          : Number(mInfo2[orderBy]) - Number(mInfo1[orderBy]);
      });
    }
    return markets;
  }, [
    direction,
    infoStatus,
    markets,
    marketsInfo,
    orderBy,
    coinCategory,
    coinCategories,
  ]);
}

export function useErrorMessages() {
  const errorMessages = useAppSelector((state) => state.hedger.errorMessages);
  return errorMessages;
}

export function useMarketNotionalCap() {
  const marketNotionalCap = useAppSelector(
    (state) => state.hedger.marketNotionalCap,
  );
  const marketNotionalCapStatus = useAppSelector(
    (state) => state.hedger.marketNotionalCapStatus,
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
  name: string | undefined,
): FundingRateData | null {
  const fundingRates = useAppSelector((state) => state.hedger.fundingRates);
  return name ? fundingRates[name] : null;
}

export function useMarketDepth(
  name: string | undefined,
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
    [dispatch],
  );
}

export function useSetFundingRates() {
  const dispatch = useAppDispatch();
  return useCallback(
    (fundingRates: FundingRateMap) => {
      dispatch(updateFundingRates({ fundingRates }));
    },
    [dispatch],
  );
}

export function useSetDepth() {
  const dispatch = useAppDispatch();
  return useCallback(
    (depth: MarketDepthData, name: string) => {
      dispatch(updateDepth({ name, depth }));
    },
    [dispatch],
  );
}

export function useSetNotionalCap() {
  const dispatch = useAppDispatch();
  return useCallback(
    (notionalCap: MarketNotionalCap) => {
      dispatch(updateNotionalCap({ notionalCap }));
    },
    [dispatch],
  );
}

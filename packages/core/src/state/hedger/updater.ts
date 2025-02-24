import isEmpty from "lodash/isEmpty.js";
import { useCallback, useEffect, useMemo } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket.js";
import useIsWindowVisible from "../../lib/hooks/useIsWindowVisible";
import { autoRefresh, retry } from "../../utils/retry";
import { AppThunkDispatch, useAppDispatch } from "../declaration";

// const useWebSocket = useWebSocketRaw.useWebSocket;
// TODO: fix this { ReadyState } from "react-use-websocket"
enum ReadyState {
  UNINSTANTIATED = -1,
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

import { ApiState, ConnectionStatus } from "../../types/api";
import { Hedger, HedgerWebsocketType } from "../../types/hedger";
import { Market } from "../../types/market";
import { useAppName } from "../chains/hooks";
import { useActiveMarket } from "../trade/hooks";
import {
  useHedgerInfo,
  useMarketNotionalCap,
  useMarkets,
  useMarketsStatus,
  useOpenInterestStatus,
  useSetDepth,
  useSetFundingRates,
  useSetPrices,
  useSetWebSocketStatus,
  useWebSocketUrl,
} from "./hooks";
import {
  getMarkets,
  getMarketsDepth,
  getNotionalCap,
  getOpenInterest,
  getPriceRange,
} from "./thunks";
import {
  MarketData,
  PriceResponse,
  MarketDataMap as PricesType,
} from "./types";

export function HedgerUpdater(): null {
  const thunkDispatch: AppThunkDispatch = useAppDispatch();
  const hedger = useHedgerInfo();
  const { baseUrl, apiUrl, fetchData } = hedger || {};
  const activeMarket = useActiveMarket();
  const markets = useMarkets();
  const appName = useAppName();

  usePriceWebSocket();
  useFundingRateWebSocket();
  useFetchMarkets(hedger, thunkDispatch);
  useFetchNotionalCap(hedger, thunkDispatch, activeMarket);
  useFetchOpenInterest(hedger, thunkDispatch);

  //auto update per each 1 seconds
  useEffect(() => {
    return autoRefresh(() => thunkDispatch(getMarketsDepth(apiUrl)), 1);
  }, [thunkDispatch, apiUrl, markets]);

  //auto update price range per symbol, every 1 hours
  useEffect(() => {
    if (fetchData && activeMarket) {
      return autoRefresh(
        () =>
          thunkDispatch(
            getPriceRange({
              hedgerUrl: baseUrl,
              market: activeMarket,
              appName,
            }),
          ),
        60 * 60,
      );
    }
  }, [thunkDispatch, baseUrl, activeMarket, fetchData, appName]);

  return null;
}

function useFetchMarkets(
  hedger: Hedger | null,
  thunkDispatch: AppThunkDispatch,
) {
  const appName = useAppName();
  const { baseUrl } = hedger || {};
  const marketsStatus = useMarketsStatus();

  const hedgerMarket = useCallback(
    (options?: { [x: string]: any }) => {
      const allOptions = { headers: [["App-Name", appName]], ...options };
      return thunkDispatch(
        getMarkets({ hedgerUrl: baseUrl, options: allOptions }),
      );
    },
    [appName, baseUrl, thunkDispatch],
  );

  // TODO: fix auto update
  //auto update per each 3000 seconds
  useEffect(() => {
    const controller = new AbortController();
    hedgerMarket({
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [hedgerMarket]);

  //if error occurs it will retry to fetch markets 5 times
  useEffect(() => {
    if (marketsStatus === ApiState.ERROR) {
      retry(hedgerMarket, {
        n: 5,
        minWait: 1000,
        maxWait: 10000,
      });
    }
  }, [marketsStatus, hedgerMarket]);
}

function useFetchOpenInterest(
  hedger: Hedger | null,
  thunkDispatch: AppThunkDispatch,
) {
  const appName = useAppName();
  const { baseUrl } = hedger || {};
  const marketsStatus = useOpenInterestStatus();

  const hedgerOpenInterest = useCallback(
    (options?: { [x: string]: any }) => {
      const allOptions = { headers: [["App-Name", appName]], ...options };
      return thunkDispatch(
        getOpenInterest({
          hedgerUrl: baseUrl,
          options: allOptions,
        }),
      );
    },
    [appName, baseUrl, thunkDispatch],
  );

  // TODO: fix auto update
  //auto update per each 3000 seconds
  useEffect(() => {
    const controller = new AbortController();

    hedgerOpenInterest({
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, [hedgerOpenInterest]);

  //if error occurs it will retry to fetch markets 5 times
  useEffect(() => {
    if (marketsStatus === ApiState.ERROR) {
      retry(hedgerOpenInterest, {
        n: 5,
        minWait: 1000,
        maxWait: 10000,
      });
    }
  }, [marketsStatus, hedgerOpenInterest]);
}

function useFetchNotionalCap(
  hedger: Hedger | null,
  thunkDispatch: AppThunkDispatch,
  activeMarket?: Market,
) {
  const { marketNotionalCap, marketNotionalCapStatus } = useMarketNotionalCap();
  const { baseUrl } = hedger || {};
  const appName = useAppName();

  const notionalCaps = useCallback(
    () =>
      thunkDispatch(
        getNotionalCap({
          hedgerUrl: baseUrl,
          market: activeMarket,
          preNotional: marketNotionalCap,
          appName,
        }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [thunkDispatch, baseUrl, activeMarket, appName],
  );
  //auto update notional cap per symbol, every 1 hours
  useEffect(() => {
    if (activeMarket) {
      return autoRefresh(notionalCaps, 60 * 60);
    }
  }, [activeMarket, notionalCaps]);

  //if error occurs it will retry to fetch markets 5 times
  useEffect(() => {
    if (activeMarket && marketNotionalCapStatus === ApiState.ERROR) {
      retry(notionalCaps, {
        n: 5,
        minWait: 3000,
        maxWait: 10000,
      });
    }
  }, [marketNotionalCapStatus, activeMarket, notionalCaps]);
}

function usePriceWebSocket() {
  const windowVisible = useIsWindowVisible();
  const webSocketUrl = useWebSocketUrl();
  const updatePrices = useSetPrices();
  const updateDepth = useSetDepth();
  const updateWebSocketStatus = useSetWebSocketStatus();
  const markets = useMarkets();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    webSocketUrl === "" ? null : webSocketUrl,
    {
      reconnectAttempts: 10,
      shouldReconnect: () => true,
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      onClose: () => console.log("WebSocket connection closed"),
      onError: (e) => console.log("WebSocket connection has error ", e),
    },
  );

  const connectionStatus = useMemo(() => {
    if (readyState === ReadyState.OPEN) {
      return ConnectionStatus.OPEN;
    } else {
      return ConnectionStatus.CLOSED;
    }
  }, [readyState]);

  useEffect(() => {
    updateWebSocketStatus(connectionStatus);
  }, [connectionStatus, updateWebSocketStatus]);

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.OPEN) {
      const json = {
        method: windowVisible ? "SUBSCRIBE" : "UNSUBSCRIBE", // UNSUBSCRIBE websocket when user is idle
        params: ["!markPrice@arr@1s"],
        id: 1,
      };
      sendJsonMessage(json as any);
    }
  }, [connectionStatus, markets, sendJsonMessage, windowVisible]);

  useEffect(() => {
    try {
      const lastMessage = lastJsonMessage as HedgerWebsocketType;

      //don't update anything if user is idle instead of updating to empty prices
      if (!windowVisible) {
        return;
      }

      if (!lastMessage || isEmpty(lastMessage) || !lastMessage.data) {
        // return
        return updatePrices({});
      }

      if (lastMessage.stream === "!markPrice@arr@1s") {
        const updatedPrices: PricesType = {};
        lastMessage.data.forEach((price: PriceResponse) => {
          const newPrice = {
            fundingRate: price.r,
            nextFundingTime: price.T,
            markPrice: price.p,
            indexPrice: price.i,
          } as MarketData;
          updatedPrices[price.s] = newPrice;
        });
        updatePrices(updatedPrices);
      }
    } catch (err) {
      updatePrices({});
      console.log("Error On updatePrices", { err });
    }
  }, [
    lastJsonMessage,
    updatePrices,
    connectionStatus,
    windowVisible,
    updateDepth,
  ]);
}

function useFundingRateWebSocket() {
  const { webSocketFundingRateUrl } = useHedgerInfo() || {};
  const windowVisible = useIsWindowVisible();
  const activeMarket = useActiveMarket();
  const updateFundingRates = useSetFundingRates();

  const url =
    !activeMarket || webSocketFundingRateUrl === "" || !webSocketFundingRateUrl
      ? null
      : webSocketFundingRateUrl;
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url, {
    reconnectAttempts: 10,
    shouldReconnect: () => true,
    onOpen: () => {
      console.log("Funding Rate established.");
    },
    onClose: () => console.log("Funding Rate closed"),
    onError: (e) => console.log("Funding Rate has error ", e),
  });

  const connectionStatus = useMemo(() => {
    if (readyState === ReadyState.OPEN) {
      return ConnectionStatus.OPEN;
    } else {
      return ConnectionStatus.CLOSED;
    }
  }, [readyState]);

  // useEffect(() => {
  //   updateWebSocketStatus(connectionStatus)
  // }, [connectionStatus, updateWebSocketStatus])

  useEffect(() => {
    if (connectionStatus === ConnectionStatus.OPEN && activeMarket) {
      const json = {
        symbols: windowVisible ? [activeMarket.name] : [],
      };
      sendJsonMessage(json as any);
    }
  }, [connectionStatus, sendJsonMessage, windowVisible, activeMarket]);

  useEffect(() => {
    try {
      const lastMessage = lastJsonMessage as any;
      //don't update anything if user is idle instead of updating to empty prices
      if (!windowVisible) {
        return;
      }

      if (!lastMessage || isEmpty(lastMessage)) {
        return;
        // return updateFundingRates({})
      }
      updateFundingRates(lastMessage);
    } catch (err) {
      console.log({ err });
    }
  }, [lastJsonMessage, connectionStatus, windowVisible, updateFundingRates]);
}

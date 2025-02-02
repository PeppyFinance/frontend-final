import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import { ConnectionStatus } from "../../types/api";
import {
  FundingRateMap,
  MarketDataMap,
  MarketDepthData,
  MarketDepthMap,
  MarketNotionalCap,
} from "./types";
const { createAction } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;

export const updateWebSocketStatus = createAction<{ status: ConnectionStatus }>(
  "hedger/updateWebSocketStatus",
);
export const updateHedgerId = createAction<{ id: string }>(
  "hedger/updateHedgerId",
);
export const updatePrices = createAction<{ prices: MarketDataMap }>(
  "hedger/updatePrices",
);
export const updateDepths = createAction<{ depths: MarketDepthMap }>(
  "hedger/updateDepths",
);
export const updateDepth = createAction<{
  name: string;
  depth: MarketDepthData;
}>("hedger/updateDepth");
export const updateNotionalCap = createAction<{
  notionalCap: MarketNotionalCap;
}>("hedger/updateNotionalCap");

// TODO: Is it better to save all symbols or only the symbol for active market?
export const updateFundingRates = createAction<{
  fundingRates: FundingRateMap;
}>("hedger/updateFundingRates");

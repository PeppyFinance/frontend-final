import { createAction } from "@reduxjs/toolkit";
import { CoinCategories, MarketState } from "./types";

export const setCoinCategories = createAction<CoinCategories>(
  "market/setCoinCategories",
);
export const setMarket = createAction<MarketState>("market/setMarketState");

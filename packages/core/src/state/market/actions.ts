import { createAction } from "@reduxjs/toolkit";
import { CoinCategories, CoinRecommendations, MarketState } from "./types";

export const setCoinCategories = createAction<CoinCategories>(
  "market/setCoinCategories",
);

export const setCoinRecommendations = createAction<CoinRecommendations>(
  "market/setCoinRecommendations",
);

export const setMarket = createAction<MarketState>("market/setMarketState");

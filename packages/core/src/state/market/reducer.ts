import { createReducer } from "@reduxjs/toolkit";
import { setCoinCategories, setCoinRecommendations } from "./actions";
import { CoinRecommendations, MarketState } from "./types";

const coinRecommendations: CoinRecommendations = {
  btc: "Most traded",
  eth: "Most Bullish",
  sol: "Most useless",
};
export const initialState: MarketState = {
  coinCategories: undefined,
  coinRecommendations,
  // coinRecommendations: undefined,
};

export const marketReducer = createReducer(initialState, (build) =>
  build
    .addCase(setCoinCategories, (market, { payload }) => {
      market.coinCategories = payload;
      return market;
    })
    .addCase(setCoinRecommendations, (market, { payload }) => {
      market.coinRecommendations = payload;
      return market;
    }),
);

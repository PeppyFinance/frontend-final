import { createReducer } from "@reduxjs/toolkit";
import { setCoinCategories, setCoinRecommendations } from "./actions";
import { CoinRecommendations, MarketState } from "./types";

const coinRecommendations: CoinRecommendations = {
  btc: { name: "most traded", emoji: "💪" },
  eth: { name: "most bullish", emoji: "🚀" },
  sol: { name: "most useless", emoji: "🤡" },
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

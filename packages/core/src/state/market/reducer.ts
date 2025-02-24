import { createReducer } from "@reduxjs/toolkit";
import { setCoinCategories, setCoinRecommendations } from "./actions";
import { MarketState } from "./types";

export const initialState: MarketState = {
  coinCategories: undefined,
  coinRecommendations: undefined,
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

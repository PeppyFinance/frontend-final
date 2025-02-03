import { createReducer } from "@reduxjs/toolkit";
import { setCoinCategories } from "./actions";
import { MarketState } from "./types";

export const initialState: MarketState = {
  coinCategories: undefined,
};

export const marketReducer = createReducer(initialState, (build) =>
  build.addCase(setCoinCategories, (market, { payload }) => {
    market.coinCategories = payload;
    return market;
  }),
);

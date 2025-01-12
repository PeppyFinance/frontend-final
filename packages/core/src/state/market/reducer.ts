import { createReducer } from "@reduxjs/toolkit";
import { setCoinCategories, setMarket } from "./actions";
import { MarketState } from "./types";
import { TESTDATA } from "./updater";

export const initialState: MarketState = {
  coinCategories: TESTDATA,
};

export const marketReducer = createReducer(initialState, (build) =>
  build
    .addCase(setMarket, (_state, action) => {
      return action.payload;
    })
    .addCase(setCoinCategories, (market, { payload }) => {
      market.coinCategories = payload;
      return market;
    }),
);

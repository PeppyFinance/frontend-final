import { createReducer } from "@reduxjs/toolkit";
import { setCoinCategories, setMarket } from "./actions";
import { MarketState } from "./types";
import { TESTDATA } from "./updater";

export const initialState: MarketState = {
  coinCategories: TESTDATA,
};

export const marketReducer = createReducer(initialState, (build) =>
  build
    .addCase(setMarket, (state, action) => {
      console.log("setMarket:\n ========================\n", { state, action });
      return action.payload;
    })
    .addCase(setCoinCategories, (state, action) => {
      console.log("setCoinCategories:\n ========================\n", {
        state,
        action,
      });
      return action.payload;
    }),
);

import { createReducer } from "@reduxjs/toolkit";
import { MarketState } from "./types";
import { setMarket, setCoinCategories } from "./actions";


export const initialState: MarketState = {
  coinCategories: undefined
}


export const marketReducer = createReducer(initialState, build =>
  build
    .addCase(setMarket, (state, action) => {
      console.log("setMarket:\n ========================\n", { state, action })
      return action.payload
    })
    .addCase(setCoinCategories, (state, action) => {
      console.log("setMarket:\n ========================\n", { state, action })
      return action.payload
    })
)

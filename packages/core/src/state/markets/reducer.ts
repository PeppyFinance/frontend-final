import { createReducer } from "@reduxjs/toolkit";
import { MarketState } from "./types";
import { setMarket } from "./actions";


export const initialState: MarketState = {
  coinCategories: undefined
}


export const createMarketReducer = createReducer(initialState, build =>
  build.addCase(setMarket, (state, action) => {
    console.log("setMarket:\n ========================\n", { state, action })
  })
)

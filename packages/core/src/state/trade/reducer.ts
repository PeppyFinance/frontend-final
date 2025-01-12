import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import { DEFAULT_SLIPPAGE } from "../../constants";
import { InputField, OrderType, PositionType } from "../../types/trade";
import {
  setTpSlConfig,
  setTpSlOpened,
  setTradeState,
  updateDelegateTpSl,
  updateInputField,
  updateLimitPrice,
  updateLockedPercentages,
  updateMarketId,
  updateOrderType,
  updatePositionType,
  updateSlError,
  updateTpError,
  updateTpSl,
  updateTpSlState,
  updateTypedValue,
} from "./actions";
import { TpSlConfigState, TpSlProcessState, TradeState } from "./types";
const { createReducer } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;

export const initialState: TradeState = {
  marketId: undefined,
  inputField: InputField.PRICE,
  orderType: OrderType.LIMIT,
  positionType: PositionType.LONG,
  limitPrice: "",
  typedValue: "",
  cva: undefined,
  partyAmm: undefined,
  partyBmm: undefined,
  lf: undefined,
  tpSlOpened: false,
  tpSl: {
    tp: "",
    sl: "",
    state: TpSlProcessState.INITIALIZE,
    quoteId: -1,
    lastTimeUpdated: 0,
    tpSlippage: DEFAULT_SLIPPAGE,
    slSlippage: DEFAULT_SLIPPAGE,
  },
  tpSlError: {
    tpError: "",
    slError: "",
  },
  tpSlDelegateChecker: false,
  tpSlConfig: {
    state: TpSlConfigState.NOT_VALID,
    MaxRequestTimeDeltaSeconds: 0,
    MinPriceDistancePercent: 5,
    MinProfitStopLossSpreadPercent: 10,
    MaxActiveOrdersPerUser: 0,
  },
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setTradeState, (state, action) => {
      return action.payload;
    })
    .addCase(updateMarketId, (state, { payload }) => {
      state.marketId = payload.id;
    })
    .addCase(updateOrderType, (state, action) => {
      state.orderType = action.payload;
    })
    .addCase(updateInputField, (state, action) => {
      state.inputField = action.payload;
    })
    .addCase(updateLimitPrice, (state, action) => {
      state.limitPrice = action.payload;
    })
    .addCase(updateTypedValue, (state, action) => {
      state.typedValue = action.payload;
    })
    .addCase(updatePositionType, (state, action) => {
      state.positionType = action.payload;
    })
    .addCase(updateTpSl, (state, action) => {
      state.tpSl = { ...state.tpSl, ...action.payload };
    })
    .addCase(setTpSlOpened, (state, action) => {
      state.tpSlOpened = action.payload;
    })
    .addCase(updateDelegateTpSl, (state, action) => {
      state.tpSlDelegateChecker = action.payload;
    })
    .addCase(updateTpError, (state, action) => {
      state.tpSlError.tpError = action.payload;
    })
    .addCase(updateSlError, (state, action) => {
      state.tpSlError.slError = action.payload;
    })
    .addCase(setTpSlConfig, (state, action) => {
      state.tpSlConfig = action.payload;
    })
    .addCase(updateTpSlState, (state, action) => {
      const preTpSl = state.tpSl;
      state.tpSl = {
        ...preTpSl,
        state: action.payload.state,
        lastTimeUpdated: action.payload.lastTimeUpdated,
      };
    })
    .addCase(
      updateLockedPercentages,
      (state, { payload: { cva, partyAmm, partyBmm, lf } }) => {
        state.cva = cva;
        state.partyAmm = partyAmm;
        state.partyBmm = partyBmm;
        state.lf = lf;
      },
    ),
);

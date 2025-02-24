import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import { ApiState, ConnectionStatus } from "../../types/api";
import { AddedHedger, TermsStatus, UserState } from "./types";
const { createReducer } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;

import find from "lodash/find.js";
import { AccountUpnl } from "../../types/user";
import {
  addHedger,
  removeHedger,
  selectOrUnselectHedger,
  setAllHedgerData,
  setFEName,
  toggleDefaultHedger,
  updateAcceptTerms,
  updateAccount,
  updateAccountPartyAStat,
  updateAccountUpnl,
  updateAllAccountsUpnl,
  updateMatchesDarkMode,
  updateUpnlWebSocketStatus,
  updateUserDarkMode,
  updateUserExpertMode,
  updateUserFavorites,
  updateUserLeverage,
  updateUserSlippageTolerance,
} from "./actions";
import {
  getBalanceHistory,
  getIsWhiteList,
  getTotalDepositsAndWithdrawals,
} from "./thunks";

const currentTimestamp = () => new Date().getTime();

const activeAccountUpnlInitialState = {
  upnl: 0,
  timestamp: 0,
} as AccountUpnl;

export const initialState: UserState = {
  matchesDarkMode: false,
  userDarkMode: true,
  userExpertMode: false,
  userSlippageTolerance: "auto",
  timestamp: currentTimestamp(),
  favorites: [],
  leverage: 1,
  activeAccount: null,
  upnlWebSocketStatus: ConnectionStatus.CLOSED,
  activeAccountUpnl: activeAccountUpnlInitialState,
  accountsPartyAStat: {},
  allAccountsUpnl: [],

  whiteListAccount: null,
  whiteListAccountState: ApiState.LOADING,

  balanceHistory: {},
  balanceHistoryState: ApiState.LOADING,
  hasMoreHistory: true,

  depositWithdrawalsData: null,
  depositWithdrawalsState: ApiState.LOADING,
  isTermsAccepted: TermsStatus.NOT_ACCEPTED,
  frontEndName: "Cybar",

  addedHedgers: {},
  isDefaultHedgerSelected: true,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateUserDarkMode, (state, action) => {
      state.userDarkMode = action.payload.userDarkMode;
      state.timestamp = currentTimestamp();
    })
    .addCase(updateMatchesDarkMode, (state, action) => {
      state.matchesDarkMode = action.payload.matchesDarkMode;
      state.timestamp = currentTimestamp();
    })
    .addCase(updateUserExpertMode, (state, action) => {
      state.userExpertMode = action.payload.userExpertMode;
      state.timestamp = currentTimestamp();
    })
    .addCase(updateUserFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(updateUserLeverage, (state, action) => {
      state.leverage = action.payload;
    })
    .addCase(updateUserSlippageTolerance, (state, action) => {
      state.userSlippageTolerance = action.payload.userSlippageTolerance;
      state.timestamp = currentTimestamp();
    })
    .addCase(updateAccount, (state, action) => {
      state.activeAccount = action.payload;
    })
    .addCase(updateAccountUpnl, (state, action) => {
      state.activeAccountUpnl = action.payload;
    })
    .addCase(updateUpnlWebSocketStatus, (state, { payload }) => {
      state.upnlWebSocketStatus = payload.status;
    })
    .addCase(updateAllAccountsUpnl, (state, action) => {
      if (!state.allAccountsUpnl?.length) {
        state.allAccountsUpnl = [];
      }
      const item = state.allAccountsUpnl.find(
        (x) => x.account === action.payload.account,
      );

      if (item) {
        item.upnl = action.payload.upnl;
      } else {
        state.allAccountsUpnl.push(action.payload);
      }
    })

    .addCase(updateAccountPartyAStat, (state, action) => {
      const result = state.accountsPartyAStat ?? {};
      const index = action.payload.address;
      result[index] = action.payload.value;
      state.accountsPartyAStat = result;
    })
    .addCase(getIsWhiteList.fulfilled, (state, { payload }) => {
      state.whiteListAccount = payload.isWhiteList;
      state.whiteListAccountState = ApiState.OK;
    })

    .addCase(getIsWhiteList.pending, (state) => {
      state.whiteListAccountState = ApiState.LOADING;
    })

    .addCase(getIsWhiteList.rejected, (state) => {
      state.whiteListAccount = false;
      state.whiteListAccountState = ApiState.ERROR;
    })

    .addCase(
      getBalanceHistory.fulfilled,
      (state, { payload: { hasMore, result } }) => {
        const history = { ...state.balanceHistory };
        if (!result) {
          return;
        }

        result.forEach((d) => {
          history[d.transaction] = d;
        });
        state.balanceHistory = history;
        state.hasMoreHistory = hasMore;
        state.balanceHistoryState = ApiState.OK;
      },
    )

    .addCase(getBalanceHistory.pending, (state) => {
      state.balanceHistoryState = ApiState.LOADING;
    })

    .addCase(getBalanceHistory.rejected, (state) => {
      state.hasMoreHistory = false;
      state.balanceHistoryState = ApiState.ERROR;
    })

    .addCase(
      getTotalDepositsAndWithdrawals.fulfilled,
      (state, { payload: { result } }) => {
        state.depositWithdrawalsData = result;
        state.depositWithdrawalsState = ApiState.OK;
      },
    )

    .addCase(getTotalDepositsAndWithdrawals.pending, (state) => {
      state.depositWithdrawalsState = ApiState.LOADING;
    })

    .addCase(getTotalDepositsAndWithdrawals.rejected, (state) => {
      state.depositWithdrawalsData = null;
      state.depositWithdrawalsState = ApiState.ERROR;
    })

    .addCase(updateAcceptTerms, (state, action) => {
      state.isTermsAccepted = action.payload;
    })

    .addCase(setFEName, (state, { payload }) => {
      state.frontEndName = payload;
    })

    .addCase(setAllHedgerData, (state, { payload: data }) => {
      state.addedHedgers = data;
    })

    .addCase(addHedger, (state, { payload: { name, address, chainId } }) => {
      const hedgers: AddedHedger[] = state.addedHedgers[chainId] ?? [];

      if (find(hedgers, { address })) {
        return;
      }
      hedgers.push({ name, address, isSelected: true } as AddedHedger);
      state.addedHedgers[chainId] = hedgers;
    })

    .addCase(removeHedger, (state, { payload: { address, chainId } }) => {
      const hedgers: AddedHedger[] = state.addedHedgers[chainId] ?? [];
      const filteredItem = hedgers.filter((h) => h.address !== address);
      state.addedHedgers[chainId] = filteredItem;
    })

    .addCase(
      selectOrUnselectHedger,
      (state, { payload: { hedger, chainId } }) => {
        const hedgers = state.addedHedgers[chainId] ?? [];
        const index = hedgers.findIndex(
          (h: AddedHedger) =>
            h.address.toLocaleLowerCase() ===
            hedger.address.toLocaleLowerCase(),
        );

        if (index !== -1) {
          const updatedHedgers = [...hedgers];
          updatedHedgers[index] = {
            ...updatedHedgers[index],
            isSelected: !updatedHedgers[index].isSelected,
          };
          state.addedHedgers[chainId] = updatedHedgers;
        }
      },
    )

    .addCase(toggleDefaultHedger, (state) => {
      state.isDefaultHedgerSelected = !state.isDefaultHedgerSelected;
    }),
);

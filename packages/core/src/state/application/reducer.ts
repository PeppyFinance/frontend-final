import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import { SupportedChainId } from "../../constants/chains";
import { NotificationDetails } from "../notifications/types";
import { TransactionInfo } from "../transactions/types";
const { createReducer, nanoid } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;

import {
  addPopup,
  removePopup,
  setChainConnectivityWarning,
  setInjectedAddress,
  setOpenModal,
} from "./actions";

export enum ApplicationModal {
  WALLET = "WALLET",
  NETWORK = "NETWORK",
  DASHBOARD = "DASHBOARD",
  OPEN_POSITION = "OPEN_POSITION",
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  WITHDRAW_BAR = "WITHDRAW_BAR",
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
}

export type PopupContent =
  | {
      txn: {
        hash: string;
        success: boolean;
        summary?: string;
        info?: TransactionInfo;
      };
    }
  | {
      failedSwitchNetwork: SupportedChainId;
    }
  | NotificationDetails;

export type Popup = {
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
};

export type PopupList = Array<Popup>;

export interface ApplicationState {
  readonly chainConnectivityWarning: boolean;
  readonly popupList: PopupList;
  readonly openModal: ApplicationModal | null;
  injectedAddress: string;
}

const initialState: ApplicationState = {
  chainConnectivityWarning: false,
  openModal: null,
  popupList: [],
  injectedAddress: "",
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setChainConnectivityWarning, (state, action) => {
      const { chainConnectivityWarning } = action.payload;
      state.chainConnectivityWarning = chainConnectivityWarning;
    })
    .addCase(setOpenModal, (state, { payload }) => {
      state.openModal = payload;
    })
    .addCase(
      addPopup,
      (state, { payload: { content, key, removeAfterMs = 25000 } }) => {
        state.popupList = (
          key
            ? state.popupList.filter((popup) => popup.key !== key)
            : state.popupList
        ).concat([
          {
            key: key || nanoid(),
            show: true,
            content,
            removeAfterMs,
          },
        ]);
      },
    )
    .addCase(removePopup, (state, { payload }) => {
      const { key } = payload;
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false;
        }
      });
    })

    .addCase(setInjectedAddress, (state, { payload }) => {
      const { address } = payload;
      state.injectedAddress = address;
    }),
);

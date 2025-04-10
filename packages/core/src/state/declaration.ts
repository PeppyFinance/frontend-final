import {
  Action,
  AnyAction,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import {
  PersistConfig,
  createTransform,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
// const { configureStore } = ((toolkitRaw as any).default ??
//   toolkitRaw) as typeof toolkitRaw;
// import { AsyncNodeStorage } from "redux-persist-node-storage";
// import * as reduxPersisRaw from "redux-persist/lib/integration/react";
// const { PersistGate } = ((reduxPersisRaw as any).default ??
//   reduxPersisRaw) as typeof reduxPersisRaw;
import { configureStore } from "@reduxjs/toolkit";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import "symbol-observable";
import { ONE_DAY_IN_MILLISECOND } from "../constants";
import reducer from "./reducer";
// import crossBrowserListener from "../utils/reduxPersistListener";

const createExpirationTransform = (expiryTime: number) => {
  return createTransform(
    (inboundState) => {
      return {
        data: inboundState,
        timestamp: Date.now(),
      };
    },
    (outboundState) => {
      if (!outboundState) {
        return undefined;
      }

      const now = Date.now();
      const expired = now - outboundState.timestamp > expiryTime;

      return expired ? undefined : outboundState.data;
    },
  );
};

const PERSISTED_KEYS: string[] = ["user"];
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: PERSISTED_KEYS,
  transforms: [createExpirationTransform(ONE_DAY_IN_MILLISECOND)],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export type RootState = ReturnType<typeof reducer>;
function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }),
    devTools: process.env.NODE_ENV === "development",
  });
}
type ReturnMakeStore = ReturnType<typeof makeStore>;

let store: ReturnMakeStore;

export const getOrCreateStore = () => {
  const _store = store ?? makeStore();

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") {
    return _store;
  }

  // Create the store once in the client
  if (!store) {
    store = _store;
  }

  return _store;
};

store = getOrCreateStore();
export default store;
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<unknown, void, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

// if (typeof window === "object") {
//   window.addEventListener(
//     "storage",
//     crossBrowserListener(store, persistConfig)
//   );
// }
// export const SymmioPersistGate = PersistGate;
export const ReduxProvider = Provider;

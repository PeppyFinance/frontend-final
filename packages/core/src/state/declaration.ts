import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import {
  Action,
  AnyAction,
  Store,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { createTransform, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import "symbol-observable";
import { ONE_DAY_IN_MILLISECOND } from "../constants";
import reducer from "./reducer";
const { configureStore } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;
// import crossBrowserListener from "../utils/reduxPersistListener";

const createExpirationTransform = (expiryTime) => {
  return createTransform(
    (inboundState) => {
      return {
        data: inboundState,
        timestamp: Date.now(),
      };
    },
    (outboundState) => {
      if (!outboundState) return undefined;

      const now = Date.now();
      const expired = now - outboundState.timestamp > expiryTime;

      return expired ? undefined : outboundState.data;
    },
  );
};

const PERSISTED_KEYS: string[] = ["user"];
const persistConfig = {
  key: "root",
  storage,
  whitelist: PERSISTED_KEYS,
  transforms: [createExpirationTransform(ONE_DAY_IN_MILLISECOND)],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export type RootState = ReturnType;
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

let store: Store;

export const getOrCreateStore = () => {
  const _store = store ?? makeStore();

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

store = getOrCreateStore();
export default store;
export const persistor = persistStore(store);

export type AppState = ReturnType;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction;
export type AppThunkDispatch = ThunkDispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook = useSelector;

export default store;

export const ReduxProvider = Provider;

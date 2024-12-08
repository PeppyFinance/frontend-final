import {
  Action,
  AnyAction,
  Store,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
const { configureStore } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import "symbol-observable";
import reducer from "./reducer";

export type RootState = ReturnType<typeof reducer>;
function makeStore() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV === "development",
  });
}

let store: Store<RootState, AnyAction>;

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

export default store;

export const ReduxProvider = Provider;

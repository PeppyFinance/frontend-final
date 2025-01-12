import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import application from "./application/reducer";
import chains from "./chains/reducer";
import hedger from "./hedger/reducer";
import notifications from "./notifications/reducer";
import quotes from "./quotes/reducer";
import trade from "./trade/reducer";
import transactions from "./transactions/reducer";
import user from "./user/reducer";
const { combineReducers } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;

const reducer = combineReducers({
  application,
  chains,
  transactions,
  user,
  hedger,
  trade,
  notifications,
  quotes,
});

export default reducer;

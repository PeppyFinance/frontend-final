import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
import application from "./application/reducer";
import chains from "./chains/reducer";
import hedger from "./hedger/reducer";
import { marketReducer as market } from "./market/reducer";
import notifications from "./notifications/reducer";
import quotes from "./quotes/reducer";
import trade from "./trade/reducer";
import transactions from "./transactions/reducer";
import user from "./user/reducer";
import { characterReducer as character } from "./character/reducer";
const { combineReducers } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;

const reducer = combineReducers({
  application,
  chains,
  character,
  market,
  transactions,
  user,
  hedger,
  trade,
  notifications,
  quotes,
});

export default reducer;

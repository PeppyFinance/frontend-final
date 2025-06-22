import { combineReducers } from "@reduxjs/toolkit";
import { applicationReducer as application } from "./application/reducer";
import { chainReducer as chains } from "./chains/reducer";
import { characterReducer as character } from "./character/reducer";
import { hedgerReducer as hedger } from "./hedger/reducer";
import { marketReducer as market } from "./market/reducer";
import { notificationReducer as notifications } from "./notifications/reducer";
import { quotesReducer as quotes } from "./quotes/reducer";
import { tradeReducer as trade } from "./trade/reducer";
import { transactionReducer as transactions } from "./transactions/reducer";
import { userReduer as user } from "./user/reducer";

// import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
// const { combineReducers } = ((toolkitRaw as any).default ??
// toolkitRaw) as typeof toolkitRaw;

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

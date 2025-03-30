import { createAction } from "@reduxjs/toolkit";
import { ChainsState } from "./reducer";

// import * as toolkitRaw from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js";
// const { createAction } = ((toolkitRaw as any).default ??
//   toolkitRaw) as typeof toolkitRaw;

export const setChains = createAction<ChainsState>("chains/setChains");

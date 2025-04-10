import { createAction } from "@reduxjs/toolkit";
import { CharacterId } from "./types";

export const setCharaterActive = createAction<CharacterId>(
  "character/setCharaterActive",
);
export const setCharaterInactive = createAction(
  "character/setCharaterInactive",
);

export const setDialog = createAction<number>("character/setDialog");

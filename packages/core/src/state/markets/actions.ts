import { createAction } from "@reduxjs/toolkit";
import { CoinCategories } from "./types";

export const setCoinCategories = createAction<CoinCategories>("marktes/setCoinCategories");

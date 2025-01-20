import { useAppSelector } from "../declaration";
import { CoinCategories } from "./types";

export function useCoinCategories(): CoinCategories {
  const coinCategories: CoinCategories = useAppSelector(
    (state) => state.market.coinCategories,
  );
  return coinCategories;
}

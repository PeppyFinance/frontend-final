import { useAppSelector } from "../declaration";
import { CoinCategories } from "./types";

export function useCoinCategories(): CoinCategories | undefined {
  const coinCategories = useAppSelector((state) => state.market.coinCategories);
  return coinCategories;
}

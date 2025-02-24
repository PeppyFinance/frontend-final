import { useAppSelector } from "../declaration";
import { CoinCategories, CoinRecommendations } from "./types";

export function useCoinCategories(): CoinCategories {
  const coinCategories: CoinCategories = useAppSelector(
    (state) => state.market.coinCategories,
  );
  return coinCategories;
}

export function useCoinRecommendations(): CoinRecommendations | undefined {
  const coinRecommendations: CoinRecommendations = useAppSelector(
    (state) => state.market.coinRecommendations,
  );
  return coinRecommendations;
}

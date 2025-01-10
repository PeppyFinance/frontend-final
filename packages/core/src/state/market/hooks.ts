import { useAppSelector } from "../declaration";


export function useCoinCategories() {
  const coinCategories = useAppSelector(state => state.market.coinCategories);
  return coinCategories;
}

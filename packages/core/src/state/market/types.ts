
export interface MarketState {
  coinCategories?: CoinCategories;
}

export interface CoinCategories {
  [name: string]: number[];
}

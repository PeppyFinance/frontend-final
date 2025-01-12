export interface MarketState {
  coinCategories?: CoinCategories;
}

export interface CoinCategories {
  // TODO: discuss if a set would be the more descriptive data structure
  // [name: string]: Set<string>;
  [name: string]: string[];
}

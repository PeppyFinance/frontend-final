export interface MarketState {
  coinCategories?: CoinCategories;
}

export interface CoinCategories {
  [name: string]: string[];
}

export interface CoinRecommendations {
  [coinSymbol: string]: string;
}

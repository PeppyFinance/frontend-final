export interface MarketState {
  coinCategories?: CoinCategories;
  coinRecommendations?: CoinRecommendations;
}

export interface CoinCategories {
  [name: string]: string[];
}

export interface CoinRecommendations {
  [coinSymbol: string]: string;
}

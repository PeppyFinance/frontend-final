export interface MarketState {
  coinCategories?: CoinCategories;
  coinRecommendations?: CoinRecommendations;
}

export interface CoinCategories {
  [name: string]: string[];
}

export interface CoinRecommendations {
  [coinSymbol: string]: CoinRecommendation;
}

// TODO: is name the best label? Maybe reason or recommendationReason
export interface CoinRecommendation { name: string, emoji: string }

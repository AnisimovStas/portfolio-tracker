export interface HistoryViewModel {
  date: Date;
  priceValue: number;
  profit: number;
}

export type AssetHistoryViewModel = CryptoHistoryViewModel;
export interface CryptoHistoryViewModel {
  date: Date;
  priceValue: number;
  profit: number;
  earnedAmountByStacking: number;
}

export interface ISearchResponse {
  crypto: ICrypto[];
  ruStocks: IRuStock[];
}

export interface ICrypto {
  coinGeckoId: string;
  currentPrice: string;
  icon: string;
  id: number;
  name: string;
  ticker: string;
  updatedAt: Date;
}

export interface IRuStock {
  icon: string;
  id: number;
  isin: string;
  moexId: number;
  name: string;
  ticker: string;
}

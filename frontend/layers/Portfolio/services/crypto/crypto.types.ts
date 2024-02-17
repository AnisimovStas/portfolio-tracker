import type { ICrypto } from "~/services/crypto/crypto.service";

export interface ISearchResponse {
  crypto: ICrypto[];
  ruStocks: IRuStock[];
}

export interface IRuStock {
  icon: string;
  id: number;
  isin: string;
  moexId: number;
  name: string;
  ticker: string;
}

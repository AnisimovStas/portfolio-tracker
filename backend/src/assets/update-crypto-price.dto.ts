// interface т.к. мы не получаем его от пользователя
export interface UpdateCryptoPriceDto {
  coinGeckoId: string;
  currentPrice: number;
}

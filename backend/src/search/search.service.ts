import { Injectable } from '@nestjs/common';
import type { ISearchResponse } from './types/search.types';
import { CurrenciesService } from '../currencies/currencies.service';
import { RuStocksService } from '../ru-stocks/ru-stocks.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly cryptoService: CurrenciesService,
    private readonly ruStocksService: RuStocksService,
  ) {}

  public async searchCurrencies(search: string): Promise<ISearchResponse> {
    const cryptoInSearch =
      await this.cryptoService.getCryptoListBySearch(search);

    const ruStocksInSearch =
      await this.ruStocksService.getRuStocksBySearch(search);
    return {
      crypto: cryptoInSearch,
      ruStocks: ruStocksInSearch,
    };
  }
}

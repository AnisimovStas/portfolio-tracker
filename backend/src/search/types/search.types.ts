import { Crypto } from '../../currencies/entities/crypto.entity';
import { RuStock } from '../../ru-stocks/entities/ru-stocks.entity';

export interface ISearchResponse {
  crypto: Crypto[];
  ruStocks: RuStock[];
}

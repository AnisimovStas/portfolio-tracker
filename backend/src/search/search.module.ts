import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { CurrenciesModule } from '../currencies/currencies.module';
import { RuStocksModule } from '../ru-stocks/ru-stocks.module';

@Module({
  imports: [CurrenciesModule, RuStocksModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}

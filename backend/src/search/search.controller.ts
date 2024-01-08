import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ISearchResponse } from './types/search.types';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('currencies')
  async searchCurrencies(
    @Query('search') search: string,
  ): Promise<ISearchResponse> {
    return this.searchService.searchCurrencies(search);
  }
}

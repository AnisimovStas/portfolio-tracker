import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import axios from 'axios';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get('crypto/download-icons/:page')
  async getCryptoCoins(@Param('page') page: number): Promise<any> {
    const coins = await this.getCoinsFromCoinGecko(page);

    await this.currenciesService.downloadCryptoIconImages(coins.data);
  }

  @Get('crypto/add-to-database/:page')
  async writeCryptoInDataBase(@Param('page') page: number): Promise<any> {
    return this.currenciesService.writeCryptoInDataBase(page);
  }

  private async getCoinsFromCoinGecko(page = 1): Promise<any> {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=${page}`;

    const response = await axios({
      method: 'GET',
      url,
    }).catch((error) => {
      throw new HttpException(`Error: ${error}`, HttpStatus.FORBIDDEN);
    });
    return {
      data: response.data,
    };
  }

  @Get('crypto/update-prices')
  async updateCryptoPrices(): Promise<any> {
    return this.currenciesService.updateCryptoPrices();
  }

  @Get('crypto/setCryptoInterval')
  async setIntervalForFetchingCryptoPrices() {
    return this.currenciesService.setCryptoInterval();
  }

  @Get('fiat/update-prices')
  async updateFiatPrices(): Promise<any> {
    return this.currenciesService.updateFiatPrices();
  }

  @Get('fiat/get/:currency')
  async getUsd(@Param('currency') currency: string): Promise<any> {
    return this.currenciesService.getCurrency(currency);
  }

  @Get('crypto/list')
  async getCryptoList(): Promise<any> {
    return this.currenciesService.getCryptoList();
  }

  @Get('crypto/list/search')
  async getCryptoListBySearch(@Query('search') search: string): Promise<any> {
    return this.currenciesService.getCryptoListBySearch(search);
  }
}

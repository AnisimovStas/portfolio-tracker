import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get('crypto')
  async getCryptoCoins(): Promise<any> {
    const coins = await this.getCoinsFromCoinGecko(4);

    await this.currenciesService.downloadCryptoIconImages(coins.data);
  }

  private async getCoinsFromCoinGecko(page = 1): Promise<any> {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=${page}`;

    const response = await axios({
      method: 'GET',
      url,
    }).catch((error) => {
      console.log(error);
      throw new HttpException('Error', HttpStatus.FORBIDDEN);
    });
    return {
      data: response.data,
    };
  }
}

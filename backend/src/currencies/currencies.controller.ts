import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
      console.log(error);
      throw new HttpException('Error', HttpStatus.FORBIDDEN);
    });
    return {
      data: response.data,
    };
  }
}

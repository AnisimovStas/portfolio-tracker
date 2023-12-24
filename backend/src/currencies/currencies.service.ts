import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import * as path from 'path';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from './entities/crypto.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    private readonly imageService: ImageService,
    @InjectRepository(Crypto)
    private readonly cryptoRepository: Repository<Crypto>,
    private readonly httpService: HttpService,
  ) {}

  async downloadCryptoIconImages(coins: any[]): Promise<void> {
    for (const coin of coins) {
      const imageUrl = coin.image;
      const imageName = `${coin.id}.png`;
      const imageNameWithPath = path.join('src', 'assets', 'crypto', imageName);

      await this.imageService.downloadImage(imageUrl, imageNameWithPath);
    }
  }

  async fetchCryptoCoins(page = 1): Promise<any> {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=${page}`;
    const { data } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw new HttpException('Error', HttpStatus.FORBIDDEN);
        }),
      ),
    );
    return data;
  }

  async writeCryptoInDataBase(page = 1): Promise<any> {
    const data = await this.fetchCryptoCoins(page);

    const cryptos = data.map((crypto) => {
      return {
        coinGeckoId: crypto.id,
        name: crypto.name,
        ticker: crypto.symbol,
        icon: '/assets/' + crypto.id + '.png',
        currentPrice: crypto.current_price,
      };
    });

    return this.cryptoRepository.save(cryptos);
  }

  async updateCryptoPrices() {
    const gigaCryptoArray = [];

    for (let page = 1; page <= 4; page++) {
      const data = await this.fetchCryptoCoins(page);
      console.log(page);
      gigaCryptoArray.push(...data);
    }

    const updatedCryptos = gigaCryptoArray.map((crypto) => {
      return {
        coinGeckoId: crypto.id,
        currentPrice: crypto.current_price,
      };
    });
    return updatedCryptos;
  }
}

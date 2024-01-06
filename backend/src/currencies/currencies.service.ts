import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import * as path from 'path';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { In, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from './entities/crypto.entity';
import { Fiat } from './entities/fiat.entity';
import { trimByValue } from '../transactions/utils/helpers';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class CurrenciesService {
  constructor(
    private readonly imageService: ImageService,
    @InjectRepository(Crypto)
    private readonly cryptoRepository: Repository<Crypto>,
    @InjectRepository(Fiat)
    private readonly fiatRepository: Repository<Fiat>,
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
          throw new HttpException(`Error ${error}`, HttpStatus.FORBIDDEN);
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

  async updateCryptoPrices(part: number) {
    const gigaCryptoArray = [];

    const initPage = part === 1 ? 1 : 3;
    const endPage = part === 1 ? 2 : 4;

    for (let page = initPage; page <= endPage; page++) {
      const data = await this.fetchCryptoCoins(page);
      gigaCryptoArray.push(...data);
    }

    const updatedCryptos = gigaCryptoArray.map((crypto) => {
      return {
        coinGeckoId: crypto.id,
        currentPrice: crypto.current_price,
      };
    });

    if (updatedCryptos.length < 10) {
      throw new HttpException(
        'Error while updating crypto prices',
        HttpStatus.FORBIDDEN,
      );
    }

    const uniqueCoinGeckoIds: string[] = updatedCryptos.map(
      (item) => item.coinGeckoId,
    );
    const cryptoObjects = await this.cryptoRepository.find({
      where: {
        coinGeckoId: In(uniqueCoinGeckoIds),
      },
    });

    console.log('we here');
    console.log(cryptoObjects.length);
    cryptoObjects.forEach((crypto) => {
      const matchingData = updatedCryptos.find(
        (item) => item.coinGeckoId === crypto.coinGeckoId,
      );
      if (matchingData) {
        crypto.currentPrice = matchingData.currentPrice;
      }
    });

    await this.cryptoRepository.save(cryptoObjects);

    return updatedCryptos;
  }

  @Cron('0 10/30 * * * *')
  async intervalUpdateCryptoPricesP1() {
    try {
      await this.updateCryptoPrices(1);
      console.log('Crypto prices just updated!');
    } catch (error) {
      console.log(error);
    }
  }

  @Cron('0 15/30 * * * *')
  async intervalUpdateCryptoPricesP2() {
    try {
      await this.updateCryptoPrices(2);
      console.log('Crypto prices just updated!');
    } catch (error) {
      console.log(error);
    }
  }

  async getCryptoList() {
    const cryptos = await this.cryptoRepository.find();

    if (cryptos) {
      return cryptos;
    } else {
      throw new HttpException('There is no crypto', HttpStatus.FORBIDDEN);
    }
  }

  async getCryptoListBySearch(search: string) {
    if (!search) {
      return [];
    }

    const cryptos = await this.cryptoRepository.find({
      where: [{ name: Like(`%${search}%`) }, { ticker: Like(`%${search}%`) }],
      take: 10,
    });

    if (cryptos) {
      return cryptos;
    } else {
      return [];
    }
  }

  async updateFiatPrices() {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

    const { data } = await firstValueFrom(this.httpService.get(url));

    if (data?.Valute) {
      const usdValue = data.Valute.USD.Value;
      if (usdValue) {
        const usdInDb = await this.fiatRepository.findOneBy({
          name: 'USD',
        });
        if (usdInDb) {
          usdInDb.value = usdValue.toFixed(2);
          await this.fiatRepository.save(usdInDb);
        }
        return { msg: `USD updated ${usdValue.toFixed(2)}` };
      }
      return { msg: 'there is no USD' };
    } else {
      throw new HttpException('Error', HttpStatus.FORBIDDEN);
    }
  }

  @Interval(1000 * 60 * 60)
  async intervalUpdateFiatPrices() {
    try {
      await this.updateFiatPrices();
      console.log('Fiat prices just updated!');
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrency(currency: string): Promise<any> {
    const currencyInDb = await this.fiatRepository.findOneBy({
      name: currency.toUpperCase(),
    });

    if (currencyInDb) {
      return { name: currencyInDb.name, value: currencyInDb.value };
    } else {
      throw new HttpException(
        'there is no such currency',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  public async getCryptoHistoricalPrice(
    coinGeckoId: string,
    date: string,
  ): Promise<any> {
    const url = `https://api.coingecko.com/api/v3/coins/${coinGeckoId}/history?date=${date}&localization=en`;

    const { data } = await firstValueFrom(this.httpService.get(url));

    if (data?.market_data) {
      return trimByValue(data.market_data.current_price.usd);
    }
    return 0;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import * as path from 'path';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from './entities/crypto.entity';
import { Fiat } from './entities/fiat.entity';

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

  async updateCryptoPrices() {
    const gigaCryptoArray = [];

    for (let page = 1; page <= 4; page++) {
      const data = await this.fetchCryptoCoins(page);
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

  async setCryptoInterval() {
    const INTERVAL = 5 * 60 * 1000;

    setInterval(async () => {
      await this.updateCryptoPrices();
    }, INTERVAL);
    return { msg: 'Crypto interval setted' };
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
}

import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsRepository } from './assets.repository';
import { Asset } from './asset.entity';
import { ASSET_TYPE } from './types/assets.types';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios/index';
import { CoinGeckoCoinInfo } from './types/api.types';
import { User } from '../auth/user.entity';
import { CryptoViewModelType } from './types/crypto.viewModel.type';
import { cryptoViewModel } from './adapters/crypto.viewmodel';
import { In } from 'typeorm';
import { UpdateCryptoPriceDto } from './update-crypto-price.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetsRepository)
    private assetsRepository: AssetsRepository,
    private readonly httpService: HttpService,
  ) {}

  getAssetByTickerAndType(
    ticker: string,
    assetType: ASSET_TYPE,
  ): Promise<Asset> {
    return this.assetsRepository.getAssetByTickerAndType(ticker, assetType);
  }

  getAssetBySearch(search: string): Promise<Asset[]> {
    return this.assetsRepository.getAssetBySearch(search);
  }

  async fetchCryptoCoinsByPage(page = 1): Promise<CoinGeckoCoinInfo[]> {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=${page}`;
    const { data } = await firstValueFrom(
      this.httpService.get<CoinGeckoCoinInfo[]>(url).pipe(
        catchError((error: AxiosError) => {
          console.warn(error);
          throw new HttpException(`Error ${error}`, HttpStatus.FORBIDDEN);
        }),
      ),
    );
    return data;
  }

  async addCryptoInDataBaseByPage(page = 1): Promise<Asset[]> {
    const data = await this.fetchCryptoCoinsByPage(page);
    const cryptos: Asset[] = [];

    for (const crypto of data) {
      const newCrypto: Asset = this.assetsRepository.create({
        type: ASSET_TYPE.CRYPTO,
        coinGeckoId: crypto.id,
        name: crypto.name,
        ticker: crypto.symbol,
        icon: '/img/crypto/' + crypto.id + '.png',
        currentPrice: crypto.current_price,
      });
      cryptos.push(newCrypto);
    }
    try {
      await this.assetsRepository.save(cryptos);
      return cryptos;
    } catch (error) {
      console.warn(error);
      throw new ForbiddenException();
    }
  }

  async updateCryptoPrices(part: number) {
    const updatedCryptosArray: UpdateCryptoPriceDto[] = [];
    const initPage = part === 1 ? 1 : 3;
    const endPage = part === 1 ? 2 : 4;

    for (let page = initPage; page <= endPage; page++) {
      const data = await this.fetchCryptoCoinsByPage(page);
      const mappedData: UpdateCryptoPriceDto[] = data.map(
        (crypto: CoinGeckoCoinInfo) => {
          return {
            coinGeckoId: crypto.id,
            currentPrice: crypto.current_price,
          };
        },
      );
      updatedCryptosArray.push(...mappedData);
    }

    const uniqueCoinGeckoIds = updatedCryptosArray.map(
      (item) => item.coinGeckoId,
    );

    try {
      const cryptos = await this.assetsRepository.find({
        where: {
          coinGeckoId: In(uniqueCoinGeckoIds),
        },
      });

      for (const crypto of cryptos) {
        const matchingData = updatedCryptosArray.find(
          (item) => item.coinGeckoId === crypto.coinGeckoId,
        );
        crypto.currentPrice = matchingData.currentPrice;
      }

      await this.assetsRepository.save(cryptos);
      console.log(`crypto prices updated successfully part ${part}`);
      return cryptos;
    } catch (error) {
      console.warn(`error during updating crypto prices part: ${part}`);
      console.warn(error);
      throw new ForbiddenException();
    }
  }

  @Cron('0 10/30 * * * *')
  async intervalUpdateCryptoPricesPart1() {
    await this.updateCryptoPrices(1);
  }

  @Cron('0 15/30 * * * *')
  async intervalUpdateCryptoPricesPart2() {
    await this.updateCryptoPrices(2);
  }

  async getUserCrypto(user: User): Promise<CryptoViewModelType[]> {
    const cryptos: Asset[] = await this.assetsRepository.getUserCrypto(user);
    const cryptosViewModel: CryptoViewModelType[] =
      cryptos.map(cryptoViewModel);
    return cryptosViewModel;
  }
}

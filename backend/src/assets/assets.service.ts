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

  async fetchCryptoCoins(page = 1): Promise<CoinGeckoCoinInfo[]> {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=${page}`;
    const { data } = await firstValueFrom(
      this.httpService.get<CoinGeckoCoinInfo[]>(url).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(`Error ${error}`, HttpStatus.FORBIDDEN);
        }),
      ),
    );
    return data;
  }

  async addCryptoInDataBaseByPage(page = 1): Promise<Asset[]> {
    const data = await this.fetchCryptoCoins(page);
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

  async getUserCrypto(user: User): Promise<CryptoViewModelType[]> {
    const cryptos: Asset[] = await this.assetsRepository.getUserCrypto(user);
    const cryptosViewModel: CryptoViewModelType[] =
      cryptos.map(cryptoViewModel);
    return cryptosViewModel;
  }
}

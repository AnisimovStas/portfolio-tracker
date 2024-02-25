import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoriesOfAssetsInPortfoliosRepository } from './histories-of-assets-in-portfolios.repository';
import { User } from '../auth/user.entity';
import {
  AssetHistoryViewModel,
  HistoryViewModel,
} from './types/historyViewModel.types';
import { Asset } from '../assets/asset.entity';
import { ASSET_TYPE } from '../assets/types/assets.types';
import { AssetsService } from '../assets/assets.service';
import { AuthService } from '../auth/auth.service';
import { HistoryOfAssetInPortfolio } from './Entity/HistoryOfAssetInPortfolio.entity';
import { Cron } from '@nestjs/schedule';
import { GeneralInfoViewModel } from './types/generalInfo.types';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(HistoriesOfAssetsInPortfoliosRepository)
    private readonly historyRepository: HistoriesOfAssetsInPortfoliosRepository,
    private readonly assetsService: AssetsService,
    private readonly authService: AuthService,
  ) {}

  getPortfolioHistory(user: User): Promise<HistoryViewModel[]> {
    return this.historyRepository.getPortfolioHistory(user);
  }

  async getHistoryOfAssetInPortfolio(
    user: User,
    assetId: string,
    type: ASSET_TYPE,
  ): Promise<AssetHistoryViewModel[]> {
    return await this.historyRepository.getHistoryOfAssetInPortfolio(
      user,
      assetId,
      type,
    );
  }

  //TODO Получилось, но будто как-то пиздец, переделать логику
  @Cron('59 23 * * *')
  async recordUsersHistories() {
    const users: User[] = await this.authService.getAllUsers();
    const result: HistoryOfAssetInPortfolio[] = [];

    const newDate: Date = new Date();
    for (const user of users) {
      //TODO вот от вот этого запроса можно избавиться
      const cryptoViewModels = await this.assetsService.getUserCrypto(user);

      for (const crypto of cryptoViewModels) {
        const cryptoAsset: Asset = user.transactions.find(
          (cryptoInTx) => cryptoInTx.asset.ticker === crypto.ticker,
        ).asset;

        const history: HistoryOfAssetInPortfolio =
          this.historyRepository.create({
            user: user,
            asset: cryptoAsset,
            priceValue: crypto.totalCurrentPrice,
            profit: crypto.profit.value,
            earnedAmountByStacking: crypto.earnedAmountByStacking,
            date: newDate,
          });

        result.push(history);
      }
    }

    try {
      await this.historyRepository.save(result);
    } catch (error) {
      console.warn(error);
      throw new InternalServerErrorException();
    }
  }

  async getGeneralInfo(user: User): Promise<GeneralInfoViewModel> {
    const cryptoViewModels = await this.assetsService.getUserCrypto(user);

    const totalAmount: number = cryptoViewModels.reduce((acc, crypto) => {
      return acc + crypto.totalCurrentPrice;
    }, 0);

    const allTimeProfit: number = cryptoViewModels.reduce((acc, crypto) => {
      return acc + crypto.profit.value;
    }, 0);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const startDate = new Date(yesterday);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(yesterday);
    endDate.setUTCHours(23, 59, 59, 999);

    const yesterdayHistory =
      await this.historyRepository.getHistoryByDateInterval(
        user,
        startDate,
        endDate,
      );

    const yesterdayProfit = yesterdayHistory.reduce((acc, history) => {
      return acc + history.profit;
    }, 0);

    const dailyProfit = allTimeProfit - yesterdayProfit;

    return {
      totalAmount: totalAmount,
      allTimeProfit: allTimeProfit,
      dailyProfit: dailyProfit,
    };
  }
}

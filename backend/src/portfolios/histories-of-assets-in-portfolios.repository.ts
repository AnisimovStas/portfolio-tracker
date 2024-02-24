import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { HistoryOfAssetInPortfolio } from './Entity/HistoryOfAssetInPortfolio.entity';
import {
  AssetHistoryViewModel,
  CryptoHistoryViewModel,
  HistoryViewModel,
} from './types/historyViewModel.types';
import { ASSET_TYPE } from '../assets/types/assets.types';

@Injectable()
export class HistoriesOfAssetsInPortfoliosRepository extends Repository<HistoryOfAssetInPortfolio> {
  constructor(private dataSource: DataSource) {
    super(HistoryOfAssetInPortfolio, dataSource.createEntityManager());
  }

  async getPortfolioHistory(user: User): Promise<HistoryViewModel[]> {
    const queryBuilder = this.createQueryBuilder('history');
    queryBuilder
      .select('SUM(history.priceValue)', 'priceValue')
      .addSelect('Sum(history.profit)', 'profit')
      .addSelect(
        'Sum(history.earnedAmountByStacking)',
        'earnedAmountByStacking',
      )
      .addSelect('history.date', 'date')
      .where('history.user = :user', { user: user.id })
      .groupBy('history.date')
      .orderBy('history.date', 'DESC');
    try {
      return await queryBuilder.getRawMany();
    } catch (error) {
      console.warn(error);
      throw new UnprocessableEntityException(error);
    }
  }

  async getHistoryOfAssetInPortfolio(
    user: User,
    assetId: string,
    type: ASSET_TYPE,
  ): Promise<AssetHistoryViewModel[]> {
    if (type === ASSET_TYPE.CRYPTO) {
      return await this.getHistoryOfCryptoHInPortfolio(user, assetId);
    }
  }

  async getHistoryOfCryptoHInPortfolio(
    user: User,
    assetId: string,
  ): Promise<CryptoHistoryViewModel[]> {
    const queryBuilder = this.createQueryBuilder('history');
    queryBuilder
      .select('history.priceValue', 'priceValue')
      .addSelect('history.profit', 'profit')
      .addSelect('history.date', 'date')
      .addSelect('history.earnedAmountByStacking', 'earnedAmountByStacking')
      .where('history.user = :user', { user: user.id })
      .andWhere('history.asset = :asset', { asset: assetId })
      .orderBy('history.date', 'DESC');

    try {
      const history = await queryBuilder.getRawMany();
      return history;
    } catch (e) {
      console.warn(e);
      throw new UnprocessableEntityException();
    }
  }
}

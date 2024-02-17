import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Asset } from './asset.entity';
import { ASSET_TYPE } from './types/assets.types';
import { User } from '../auth/user.entity';
import { Transaction } from '../transactions/transaction.entity';

@Injectable()
export class AssetsRepository extends Repository<Asset> {
  constructor(private dataSource: DataSource) {
    super(Asset, dataSource.createEntityManager());
  }

  async getAssetByTickerAndType(
    ticker: string,
    assetType: ASSET_TYPE,
  ): Promise<Asset> {
    const asset = await this.findOne({
      where: { ticker: ticker, type: assetType },
    });

    if (!asset) {
      throw new NotFoundException(
        ` Asset with ticker ${ticker} and type ${assetType} not found`,
      );
    }
    return asset;
  }

  async getUserCrypto(user: User): Promise<Asset[]> {
    const query = this.createQueryBuilder('asset');

    query.select([
      'asset.coinGeckoId',
      'asset.name',
      'asset.ticker',
      'asset.icon',
      'asset.currentPrice',
    ]);

    query.leftJoinAndMapMany(
      'asset.transactions',
      Transaction,
      'transactions',
      'asset.id = transactions.assetId',
    );

    query.where('transactions.user = :user', { user: user.id });

    try {
      const crypto = await query.getMany();
      return crypto;
    } catch (error) {
      console.warn(error);
      throw new UnprocessableEntityException();
    }
  }
}

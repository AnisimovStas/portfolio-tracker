import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Asset } from './asset.entity';
import { ASSET_TYPE } from './types/assets.types';

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
}

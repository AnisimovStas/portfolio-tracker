import { Injectable } from '@nestjs/common';
import { AssetHistoricalPrice } from './asset-historical-price.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AssetsHistoricalPriceRepository extends Repository<AssetHistoricalPrice> {
  constructor(private dataSource: DataSource) {
    super(AssetHistoricalPrice, dataSource.createEntityManager());
  }
}

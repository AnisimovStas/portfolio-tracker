import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsRepository } from './assets.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { AssetHistoricalPrice } from './asset-historical-price.entity';
import { AssetsHistoricalPriceRepository } from './assets-historical-price.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, AssetHistoricalPrice])],
  providers: [AssetsService, AssetsRepository, AssetsHistoricalPriceRepository],
})
export class AssetsModule {}

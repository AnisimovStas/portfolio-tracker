import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsRepository } from './assets.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { AssetHistoricalPrice } from './asset-historical-price.entity';
import { AssetsHistoricalPriceRepository } from './assets-historical-price.repository';
import { HttpModule } from '@nestjs/axios';
import { AssetsController } from './assets.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset, AssetHistoricalPrice]),
    HttpModule,
  ],
  providers: [AssetsService, AssetsRepository, AssetsHistoricalPriceRepository],
  exports: [AssetsService],
  controllers: [AssetsController],
})
export class AssetsModule {}

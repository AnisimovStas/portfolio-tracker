import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsRepository } from './assets.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { HttpModule } from '@nestjs/axios';
import { AssetsController } from './assets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), HttpModule],
  providers: [AssetsService, AssetsRepository],
  exports: [AssetsService],
  controllers: [AssetsController],
})
export class AssetsModule {}

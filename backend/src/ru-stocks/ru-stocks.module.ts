import { Module } from '@nestjs/common';
import { RuStocksService } from './ru-stocks.service';
import { RuStocksController } from './ru-stocks.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuStock } from './entities/ru-stocks.entity';
import { ImageService } from '../image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([RuStock]), HttpModule],
  providers: [RuStocksService, ImageService],
  controllers: [RuStocksController],
})
export class RuStocksModule {}

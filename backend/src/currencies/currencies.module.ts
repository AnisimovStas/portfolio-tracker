import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from './entities/crypto.entity';
import { HttpModule } from '@nestjs/axios';
import { ImageService } from '../image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto]), HttpModule],
  providers: [CurrenciesService, ImageService],
  controllers: [CurrenciesController],
})
export class CurrenciesModule {}

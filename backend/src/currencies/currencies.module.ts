import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from './entities/crypto.entity';
import { HttpModule } from '@nestjs/axios';
import { ImageService } from '../image/image.service';
import { Fiat } from './entities/fiat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto, Fiat]), HttpModule],
  providers: [CurrenciesService, ImageService],
  controllers: [CurrenciesController],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}

import { Module } from '@nestjs/common';
import { CryptotxService } from './cryptotx.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoTx } from './entity/cryptoTx.entity';
import { Crypto } from '../currencies/entities/crypto.entity';
import { CurrenciesService } from '../currencies/currencies.service';
import { Fiat } from '../currencies/entities/fiat.entity';
import { HttpModule } from '@nestjs/axios';
import { ImageService } from '../image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoTx, Crypto, Fiat]), HttpModule],
  providers: [CryptotxService, CurrenciesService, ImageService],
})
export class CryptotxModule {}

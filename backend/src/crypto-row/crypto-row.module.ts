import { Module } from '@nestjs/common';
import { CryptoRowService } from './crypto-row.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoRow } from './entity/cryptoRow.entity';
import { Portfolio } from '../portfolios/Entity/Portfolio.entity';
import { CryptotxService } from '../cryptotx/cryptotx.service';
import { CurrenciesService } from '../currencies/currencies.service';
import { CryptoTx } from '../cryptotx/entity/cryptoTx.entity';
import { Crypto } from '../currencies/entities/crypto.entity';
import { ImageService } from '../image/image.service';
import { Fiat } from '../currencies/entities/fiat.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([CryptoRow, Portfolio, CryptoTx, Crypto, Fiat]),
    HttpModule,
  ],
  providers: [
    CryptoRowService,
    CryptotxService,
    CurrenciesService,
    ImageService,
  ],
})
export class CryptoRowModule {}

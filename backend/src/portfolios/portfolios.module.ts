import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PortfoliosController } from './portfolios.controller';
import { Crypto } from '../currencies/entities/crypto.entity';
import { Fiat } from '../currencies/entities/fiat.entity';
import { Portfolio } from './Entity/Portfolio.entity';
import { CurrenciesService } from '../currencies/currencies.service';
import { ImageService } from '../image/image.service';
import { HttpModule } from '@nestjs/axios';
import { CryptoRowService } from '../crypto-row/crypto-row.service';
import { CryptoRow } from '../crypto-row/entity/cryptoRow.entity';
import { CryptotxService } from '../cryptotx/cryptotx.service';
import { CryptoTx } from '../cryptotx/entity/cryptoTx.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Crypto,
      Fiat,
      Portfolio,
      CryptoRow,
      CryptoTx,
    ]),
    HttpModule,
  ],
  providers: [
    PortfoliosService,
    CurrenciesService,
    ImageService,
    CryptoRowService,
    CryptotxService,
  ],
  controllers: [PortfoliosController],
})
export class PortfoliosModule {}

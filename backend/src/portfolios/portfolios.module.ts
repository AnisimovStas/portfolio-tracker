import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../transactions/Entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { PortfoliosController } from './portfolios.controller';
import { Crypto } from '../currencies/entities/crypto.entity';
import { Fiat } from '../currencies/entities/fiat.entity';
import { Portfolio } from './Entity/Portfolio.entity';
import { PortfolioCryptoRow } from './Entity/PortfolioCryptoRow.entity';
import { TransactionsService } from '../transactions/transactions.service';
import { CurrenciesService } from '../currencies/currencies.service';
import { ImageService } from '../image/image.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transaction,
      User,
      Crypto,
      Fiat,
      Portfolio,
      PortfolioCryptoRow,
    ]),
    HttpModule,
  ],
  providers: [
    PortfoliosService,
    TransactionsService,
    CurrenciesService,
    ImageService,
  ],
  controllers: [PortfoliosController],
})
export class PortfoliosModule {}

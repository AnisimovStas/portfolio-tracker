import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfoliosController } from './portfolios.controller';
import { Portfolio } from './Entity/Portfolio.entity';
import { CryptoRowModule } from '../crypto-row/crypto-row.module';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio]), CryptoRowModule],
  providers: [PortfoliosService],
  controllers: [PortfoliosController],
  exports: [PortfoliosService],
})
export class PortfoliosModule {}

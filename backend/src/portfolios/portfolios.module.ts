import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';

@Module({
  imports: [],
  providers: [PortfoliosService],
  controllers: [PortfoliosController],
  exports: [PortfoliosService],
})
export class PortfoliosModule {}

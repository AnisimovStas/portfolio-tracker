import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';

@Module({
  providers: [PortfoliosService],
})
export class PortfoliosModule {}

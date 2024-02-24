import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { HistoriesOfAssetsInPortfoliosRepository } from './histories-of-assets-in-portfolios.repository';
import { AssetsModule } from '../assets/assets.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AssetsModule, AuthModule],
  providers: [PortfoliosService, HistoriesOfAssetsInPortfoliosRepository],
  controllers: [PortfoliosController],
  exports: [PortfoliosService],
})
export class PortfoliosModule {}

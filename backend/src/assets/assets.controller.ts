import { Controller, Post, Query } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { Asset } from './asset.entity';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('/crypto/add')
  getFromCoinGecko(@Query('page') page: number): Promise<Asset[]> {
    return this.assetsService.addCryptoInDataBaseByPage(page);
  }
}

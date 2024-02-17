import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { Asset } from './asset.entity';
import { GetUser } from '../auth/utils/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('/crypto/add')
  getFromCoinGecko(@Query('page') page: number): Promise<Asset[]> {
    return this.assetsService.addCryptoInDataBaseByPage(page);
  }

  @Get('/crypto')
  getUserCrypto(@GetUser() user: User) {
    return this.assetsService.getUserCrypto(user);
  }
}

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/utils/get-user.decorator';
import { User } from '../auth/user.entity';
import { ASSET_TYPE } from '../assets/types/assets.types';
import { HistoryViewModel } from './types/historyViewModel.types';
import { GeneralInfoViewModel } from './types/generalInfo.types';

@UseGuards(AuthGuard('jwt'))
@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Get('/history')
  getPortfolioHistory(@GetUser() user: User): Promise<HistoryViewModel[]> {
    return this.portfoliosService.getPortfolioHistory(user);
  }

  @Get('/history/:ticker')
  getHistoryOfAssetInPortfolio(
    @GetUser() user: User,
    @Query('assetId') assetId: string,
    @Query('type') type: ASSET_TYPE,
  ) {
    return this.portfoliosService.getHistoryOfAssetInPortfolio(
      user,
      assetId,
      type,
    );
  }

  @Get('general-info')
  getGeneralInfo(@GetUser() user: User): Promise<GeneralInfoViewModel> {
    return this.portfoliosService.getGeneralInfo(user);
  }

  // @Get('/test')
  // recordUsersHistories() {
  //   return this.portfoliosService.recordUsersHistories();
  // }

  // @Put('update-description')
  // async updateDescription(@Body() payload: editDescriptionDto) {
  //   // return this.portfoliosService.editRowDescription(payload);
  //   return this.portfoliosService.editRowDescription(payload);
  // }
}

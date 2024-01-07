import { Controller, Get } from '@nestjs/common';
import { RuStocksService } from './ru-stocks.service';

@Controller('ru-stocks')
export class RuStocksController {
  constructor(private readonly ruStocksService: RuStocksService) {}

  @Get('test')
  async testing() {
    return this.ruStocksService.fillDbWithGeneralRuStocksInfo();
  }

  @Get('download-icons')
  async downloadIcons() {
    return this.ruStocksService.downloadRuStocksIconImages();
  }
}

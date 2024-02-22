import { Controller, UseGuards } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  // @Put('update-description')
  // async updateDescription(@Body() payload: editDescriptionDto) {
  //   // return this.portfoliosService.editRowDescription(payload);
  //   return this.portfoliosService.editRowDescription(payload);
  // }
}

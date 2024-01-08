import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { editDescriptionDto } from './dto/edit-description.dto';
import { TCreateRowDto } from './dto/create-row.dto';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getPortfolio(@Req() request: Request) {
    return this.portfoliosService.getPortfolio(request.user['id']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addCurrency')
  async addCurrency(@Req() request: Request, @Body() payload: TCreateRowDto) {
    return this.portfoliosService.addCurrency(request.user['id'], payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createPortfolio(@Req() request: Request) {
    return this.portfoliosService.createPortfolio(request.user['id']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update-description')
  async updateDescription(@Body() payload: editDescriptionDto) {
    return this.portfoliosService.editRowDescription(payload);
  }
}

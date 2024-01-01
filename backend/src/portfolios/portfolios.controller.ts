import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateRowDto } from './dto/create-row.dto';

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
  async addCurrency(@Req() request: Request, @Body() payload: CreateRowDto) {
    return this.portfoliosService.addCurrency(request.user['id'], payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createPortfolio(@Req() request: Request) {
    return this.portfoliosService.createPortfolio(request.user['id']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('actives')
  async getActives(@Req() request: Request) {
    return this.portfoliosService.getUserTransactions(request.user['id']);
  }
}

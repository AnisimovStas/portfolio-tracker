import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createTransaction(
    @Body() transactionDto: CreateTransactionDto,
    @Req() request: Request,
  ) {
    return this.transactionsService.createTransaction(
      transactionDto,
      (request.user as User) || null,
    );
  }
}

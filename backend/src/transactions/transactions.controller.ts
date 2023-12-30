import { Body, Controller, Post, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('create')
  async createTransaction(
    @Body() transactionDto: CreateTransactionDto,
    @Req() request: Request,
  ) {
    console.log(request);
    return this.transactionsService.createTransaction(
      transactionDto,
      (request.user as User) || null,
    );
  }
}

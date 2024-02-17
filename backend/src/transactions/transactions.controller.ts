import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { GetUser } from '../auth/utils/get-user.decorator';
import { User } from '../auth/user.entity';
import { Transaction } from './transaction.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateCryptoTxDto } from './dto/create-crypto-tx.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getTransactions(@GetUser() user: User): Promise<Transaction[]> {
    return this.transactionsService.getTransactions(user);
  }

  @Post('crypto')
  createTransaction(
    @GetUser() user: User,
    @Body() createTransactionDto: CreateCryptoTxDto,
  ): Promise<Transaction> {
    return this.transactionsService.createCryptoTransaction(
      user,
      createTransactionDto,
    );
  }
}

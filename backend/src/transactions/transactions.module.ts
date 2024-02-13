import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './transactions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionsService, TransactionsRepository],
})
export class TransactionsModule {}

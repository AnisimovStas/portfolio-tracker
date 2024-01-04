import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './Entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from '../users/entities/user.entity';
import { Crypto } from '../currencies/entities/crypto.entity';
import { computeAmountAfterStacking, trimByValue } from './utils/helpers';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Crypto)
    private readonly cryptoRepository: Repository<Crypto>,
  ) {}

  async createTransaction(
    transactionDto: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction> {
    if (!userId) {
      throw new HttpException('User not authenticated', HttpStatus.BAD_REQUEST);
    }

    transactionDto.ticker = transactionDto.ticker.toLowerCase();

    const crypto = await this.cryptoRepository.findOneBy({
      ticker: transactionDto.ticker,
    });

    if (!crypto) {
      throw new HttpException('Crypto not found', HttpStatus.BAD_REQUEST);
    }

    const txWithUser = { ...transactionDto, userId };

    txWithUser['crypto'] = crypto;

    return this.transactionRepository.save(txWithUser);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async getAllUserTransactions(user: User): Promise<Transaction[]> {
    if (!user.id) {
      throw new HttpException('User not authenticated', HttpStatus.BAD_REQUEST);
    }

    return this.transactionRepository.find({
      where: { userId: user.id },
    });
  }

  public getTotalAmountAndPrice(
    transactions: Transaction[],
    stackingPercentage: string,
  ): { totalAmount: number; totalPrice: number } {
    let totalAmount = 0;
    transactions.forEach((transaction) => {
      if (transaction.transactionType === 'sell') {
        totalAmount -= Number(transaction.amount);
      } else {
        totalAmount += computeAmountAfterStacking(
          transaction.amount,
          transaction.date,
          stackingPercentage,
        );
      }
    });

    const { currentPrice } = transactions[0].cryptoData;
    const totalPrice = trimByValue(totalAmount * Number(currentPrice));
    return { totalAmount, totalPrice };
  }
}

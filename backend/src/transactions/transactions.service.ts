import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './Entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from '../users/entities/user.entity';
import { Crypto } from '../currencies/entities/crypto.entity';
import { computeTxStackedAmount, trimByValue } from './utils/helpers';

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

  public getTotalInfo(
    transactions: Transaction[],
    stackingPercentage: string,
  ): {
    totalAmount: number;
    totalPrice: number;
    totalAveragePrice: number;
    totalStackedAmount: number;
    totalStackedInFiat: number;
    averagePrice: number;
  } {
    let totalAmount = 0;
    let averagePrice = 0;
    let totalStackedAmount = 0;
    transactions.forEach((transaction) => {
      const stacked = computeTxStackedAmount(
        transaction.amount,
        transaction.date,
        stackingPercentage,
      );

      if (transaction.ticker === 'usdt') {
        console.log(stacked);
      }

      if (transaction.transactionType === 'sell') {
        totalStackedAmount -= stacked; // remove potentially profit
        totalAmount -= Number(transaction.amount);
      } else {
        totalStackedAmount += stacked;
        totalAmount += +transaction.amount + stacked;
        averagePrice +=
          Number(transaction.priceAtDate) /
          transactions.filter((tx) => tx.transactionType === 'buy').length;
      }
    });

    const { currentPrice } = transactions[0].cryptoData;
    //totalPrice -- сколько все стоит сейчас
    const totalPrice = trimByValue(totalAmount * Number(currentPrice));
    //totalAveragePrice -- сколько потратил денег на закупку
    const totalAveragePrice = trimByValue(averagePrice * totalAmount);
    const totalStackedInFiat = trimByValue(
      totalStackedAmount * Number(currentPrice),
    );
    return {
      totalAmount,
      totalPrice,
      averagePrice,
      totalAveragePrice,
      totalStackedAmount,
      totalStackedInFiat,
    };
  }
}

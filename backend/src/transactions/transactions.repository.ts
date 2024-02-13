import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateCryptoTxDto } from './dto/create-crypto-tx.dto';
import { User } from '../auth/user.entity';
import { Asset } from '../assets/asset.entity';

@Injectable()
export class TransactionsRepository extends Repository<Transaction> {
  constructor(private dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }

  async createCryptoTransaction(
    user: User,
    createCryptoTxDto: CreateCryptoTxDto,
    crypto: Asset,
  ): Promise<Transaction> {
    const { amount, transactionType, date, priceAtDate, stackingPercentage } =
      createCryptoTxDto;

    const tx: Transaction = this.create({
      asset: crypto,
      transactionType: transactionType,
      amount: amount,
      date: date,
      priceAtDate: priceAtDate,
      user: user,
      stackingPercentage: stackingPercentage,
    });

    try {
      await this.save(tx);
      return tx;
    } catch (error) {
      console.warn(error);
      throw new UnprocessableEntityException();
    }
  }
}

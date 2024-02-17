import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateCryptoTxDto } from './dto/create-crypto-tx.dto';
import { User } from '../auth/user.entity';
import { Asset } from '../assets/asset.entity';
import {
  CreateTransactionDto,
  TRANSACTION_TYPE,
} from './types/transactions.types';
import { getTotalAmount } from '../assets/utils/assets.utils';

@Injectable()
export class TransactionsRepository extends Repository<Transaction> {
  constructor(private dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }

  /*
   * Проверяем, валидность транзакции:
   * 1. При продаже количество в транзакции должно быть меньше количества в балансе
   */
  async transactionValidator(user: User, createTxDto: CreateTransactionDto) {
    const { transactionType, amount } = createTxDto;
    if (transactionType === TRANSACTION_TYPE.BUY) {
      return true;
    } else {
      const transactions = await this.find({
        where: {
          user: user,
          asset: {
            ticker: createTxDto.ticker,
          },
        },
      });
      const totalAmount = getTotalAmount(transactions);
      if (totalAmount < amount) {
        throw new ConflictException({
          msg: `Некорректное количество. Доступно: "${totalAmount}". Указано в транзакции: "${amount}"`,
        });
      }
      return true;
    }
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

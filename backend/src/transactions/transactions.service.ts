import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './Entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from '../users/entities/user.entity';
import { Crypto } from '../currencies/entities/crypto.entity';

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
}

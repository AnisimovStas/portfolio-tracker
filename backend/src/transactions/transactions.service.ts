import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './Entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(
    transactionDto: CreateTransactionDto,
    user: User | null,
  ): Promise<Transaction> {
    if (!user || !user.id) {
      throw new HttpException('User not authenticated', HttpStatus.BAD_REQUEST);
    }
    console.log(user);

    const txWithUser = { ...transactionDto, userId: user.id };

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

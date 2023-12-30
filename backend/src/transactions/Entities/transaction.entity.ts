import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { TTransaction } from '../dto/create-transaction.dto';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  ticker: string;

  @Column()
  amount: string;

  @Column()
  transactionType: TTransaction;

  @Column()
  date: string;

  @Column()
  currencyType: string;
}

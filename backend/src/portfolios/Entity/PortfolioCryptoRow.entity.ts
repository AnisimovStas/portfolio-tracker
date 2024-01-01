import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from '../../transactions/Entities/transaction.entity';
import { Portfolio } from './Portfolio.entity';

@Entity()
export class PortfolioCryptoRow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.crypto)
  portfolio: number;

  @Column()
  userId: string;

  @Column()
  ticker: string;

  @Column()
  stackingPercentage: string;

  @Column()
  description: string;

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.portfolioCryptoRow,
    {
      eager: true,
    },
  )
  transactions: Transaction[];
}

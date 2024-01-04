import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from '../../transactions/Entities/transaction.entity';

@Entity()
export class Crypto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coinGeckoId: string;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column()
  icon: string;

  @Column()
  currentPrice: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.cryptoData)
  transactions: Transaction[];
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from '../assets/asset.entity';
import { User } from '../auth/user.entity';
import { TRANSACTION_TYPE } from './types/transactions.types';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  transactionType: TRANSACTION_TYPE;

  @Column()
  date: Date;

  @Column({ type: 'float' })
  priceAtDate: number;

  @Column({ nullable: true, type: 'float' })
  stackingPercentage: number | null;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Asset, (asset) => asset.transactions)
  asset: Asset;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}

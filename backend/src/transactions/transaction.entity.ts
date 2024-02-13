import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TTransaction } from './dto/create-transaction.dto';
import { Asset } from '../assets/asset.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: string;

  @Column()
  transactionType: TTransaction;

  @Column()
  date: string;

  @Column()
  priceAtDate: string;

  @Column({ nullable: true })
  stackingPercentage: string;

  @Column({ default: '' })
  description: string;

  @ManyToOne(() => Asset, (asset) => asset.transactions)
  asset: Asset;
}

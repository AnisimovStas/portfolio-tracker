import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ASSET_TYPE } from './types/assets.types';
import { Transaction } from '../transactions/transaction.entity';
import { AssetHistoricalPrice } from './asset-historical-price.entity';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: ASSET_TYPE;

  @Column({ nullable: true })
  coinGeckoId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  moexId: number;

  @Column({ nullable: true })
  isin: string;

  //он же secId
  @Column()
  ticker: string;

  @Column()
  icon: string;

  @Column({ type: 'float' })
  currentPrice: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.asset)
  transactions: Transaction[];

  @OneToMany(
    () => AssetHistoricalPrice,
    (assetHistoricalPrice) => assetHistoricalPrice.asset,
  )
  historicalPrices: AssetHistoricalPrice[];
}

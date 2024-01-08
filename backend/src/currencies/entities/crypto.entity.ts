import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CryptoTx } from '../../cryptotx/entity/cryptoTx.entity';

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

  @OneToMany(() => CryptoTx, (transaction) => transaction.cryptoData)
  transactions: CryptoTx[];
}

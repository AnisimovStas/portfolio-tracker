import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Portfolio } from '../../portfolios/Entity/Portfolio.entity';
import { CryptoTx } from '../../cryptotx/entity/cryptoTx.entity';

@Entity()
export class CryptoRow {
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

  @OneToMany(() => CryptoTx, (cryptoTx) => cryptoTx.row, {
    eager: true,
  })
  transactions: CryptoTx[];
}

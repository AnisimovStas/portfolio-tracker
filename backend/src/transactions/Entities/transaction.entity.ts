import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { TTransaction } from '../dto/create-transaction.dto';
import { Crypto } from '../../currencies/entities/crypto.entity';
import { PortfolioCryptoRow } from '../../portfolios/Entity/PortfolioCryptoRow.entity';

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

  @ManyToOne(() => Crypto, (crypto) => crypto.ticker, { eager: true })
  crypto: Crypto;

  @ManyToOne(
    () => PortfolioCryptoRow,
    (portfolioCryptoRow) => portfolioCryptoRow.transactions,
  )
  portfolioCryptoRow: PortfolioCryptoRow;
}

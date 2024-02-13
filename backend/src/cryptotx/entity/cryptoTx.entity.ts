import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Crypto } from '../../currencies/entities/crypto.entity';
import { CryptoRow } from '../../crypto-row/entity/cryptoRow.entity';
import { TRANSACTION_TYPE } from '../../transactions/types/transactions.types';

@Entity()
export class CryptoTx {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  ticker: string;

  @Column()
  amount: string;

  @Column()
  transactionType: TRANSACTION_TYPE;

  @Column()
  date: string;

  @Column()
  currencyType: string;

  @Column()
  priceAtDate: string;

  @ManyToOne(() => Crypto, (crypto) => crypto.transactions)
  cryptoData: Crypto;

  @ManyToOne(
    () => CryptoRow,
    (portfolioCryptoRow) => portfolioCryptoRow.transactions,
  )
  row: CryptoRow;
}

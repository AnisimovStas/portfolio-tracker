import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TTransaction } from '../../transactions/dto/create-transaction.dto';
import { Crypto } from '../../currencies/entities/crypto.entity';
import { PortfolioCryptoRow } from '../../portfolios/Entity/PortfolioCryptoRow.entity';
import { CryptoRow } from '../../crypto-row/entity/cryptoRow.entity';

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
  transactionType: TTransaction;

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

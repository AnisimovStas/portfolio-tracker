import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';
import { HistoryOfAssetInPortfolio } from '../portfolios/Entity/HistoryOfAssetInPortfolio.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  displayName: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(
    () => HistoryOfAssetInPortfolio,
    (historyOfAssetInPortfolio) => historyOfAssetInPortfolio.user,
  )
  historyOfAssetInPortfolio: HistoryOfAssetInPortfolio[];
}

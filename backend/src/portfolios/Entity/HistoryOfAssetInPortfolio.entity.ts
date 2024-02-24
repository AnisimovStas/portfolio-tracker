import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { Asset } from '../../assets/asset.entity';

@Entity()
export class HistoryOfAssetInPortfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.historyOfAssetInPortfolio)
  user: User;

  @ManyToOne(() => Asset, (asset) => asset.historyOfAssetInPortfolio)
  asset: Asset;

  @Column({ type: 'float' })
  /*
   * PriceValue: цена на указанную дату * количество
   */
  priceValue: number;

  @Column({ type: 'float' })
  profit: number;

  @Column({ type: 'float', nullable: true })
  /*
   * earnedAmountByStacking: сколько пользователь заработал на стейкинге (в монетках) на указанную дату
   */
  earnedAmountByStacking: number;

  @CreateDateColumn()
  date: Date;
}

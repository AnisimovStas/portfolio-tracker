import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}

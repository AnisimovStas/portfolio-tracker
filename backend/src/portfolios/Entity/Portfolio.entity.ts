import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PortfolioCryptoRow } from './PortfolioCryptoRow.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @OneToMany(() => PortfolioCryptoRow, (crypto) => crypto.portfolio)
  crypto: PortfolioCryptoRow[];
}

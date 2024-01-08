import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CryptoRow } from '../../crypto-row/entity/cryptoRow.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @OneToMany(() => CryptoRow, (crypto) => crypto.portfolio)
  crypto: CryptoRow[];
}

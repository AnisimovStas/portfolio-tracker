import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CryptoRow } from '../../crypto-row/entity/cryptoRow.entity';
import { User } from '../../auth/user.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CryptoRow, (crypto) => crypto.portfolio)
  crypto: CryptoRow[];

  @OneToOne(() => User, (user) => user.portfolio, { eager: false })
  user: User;
}

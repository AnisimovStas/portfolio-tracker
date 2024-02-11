import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from '../portfolios/Entity/Portfolio.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  displayName: string;

  @OneToOne(() => Portfolio, (portfolio) => portfolio.user, { eager: false })
  portfolio: Portfolio;
}

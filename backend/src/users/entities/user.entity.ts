import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Portfolio } from '../../portfolios/Entity/Portfolio.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  displayName: string;

  @OneToOne(() => Portfolio, { eager: true })
  @JoinColumn({ name: 'userId' })
  portfolio: Portfolio;
}

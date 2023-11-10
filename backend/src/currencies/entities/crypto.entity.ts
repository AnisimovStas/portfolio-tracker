import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Crypto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column()
  icon: string;

  @Column()
  currentPrice: number;
}

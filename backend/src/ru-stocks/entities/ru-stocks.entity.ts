import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RuStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  moexId: number;

  @Column()
  isin: string;

  //он же secId
  @Column()
  ticker: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  currentPrice: string;
}

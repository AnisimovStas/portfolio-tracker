import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fiat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;
}

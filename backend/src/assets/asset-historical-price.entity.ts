import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Asset } from './asset.entity';

@Entity()
export class AssetHistoricalPrice {
  @PrimaryColumn()
  date: string;

  @Column()
  price: string;

  @ManyToOne(() => Asset, (asset) => asset.historicalPrices)
  asset: Asset;
}

import { User } from '../../auth/user.entity';
import { Asset } from '../../assets/asset.entity';

export class HistoryOfAssetDto {
  user: User;
  asset: Asset;
  priceValue: number;
  profit: number;
  earnedAmountByStacking?: number;
}

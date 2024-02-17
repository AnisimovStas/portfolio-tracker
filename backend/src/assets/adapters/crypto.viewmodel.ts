import { CryptoViewModelType } from '../types/crypto.viewModel.type';
import { Asset } from '../asset.entity';
import {
  getDeposited,
  getDescription,
  getProfit,
  getProfitPercentage,
  getTotalAmount,
  getTotalCurrentPrice,
} from '../utils/assets.utils';
import { getEarnedByStacking } from '../utils/crypto.utils';

export const cryptoViewModel = (crypto: Asset): CryptoViewModelType => {
  const earnedByStacking = getEarnedByStacking(crypto);
  return {
    coinGeckoId: crypto.coinGeckoId,
    name: crypto.name,
    ticker: crypto.ticker,
    icon: crypto.icon,
    earnedByStacking: earnedByStacking,
    totalAmount: getTotalAmount(crypto.transactions),
    totalCurrentPrice: getTotalCurrentPrice(crypto),
    profit: {
      value: getProfit(crypto, earnedByStacking),
      percentage: getProfitPercentage(crypto, earnedByStacking),
    },
    deposited: getDeposited(crypto),
    currentPrice: crypto.currentPrice,
    description: getDescription(crypto.transactions),
    transactions: crypto.transactions,
  };
};

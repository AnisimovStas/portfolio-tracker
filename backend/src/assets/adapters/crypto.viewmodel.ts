import { CryptoViewModelType } from '../types/crypto.viewModel.type';
import { Asset } from '../asset.entity';
import {
  getAverageBuyPrice,
  getDeposited,
  getDescription,
  getProfit,
  getProfitPercentage,
  getTotalAmount,
  getTotalCurrentPrice,
} from '../utils/assets.utils';
import {
  getEarnedAmountByStacking,
  getEarnedMoneyByStacking,
} from '../utils/crypto.utils';

export const cryptoViewModel = (crypto: Asset): CryptoViewModelType => {
  const earnedByStacking = getEarnedMoneyByStacking(crypto);
  const earnedAmountByStacking = getEarnedAmountByStacking(crypto);
  return {
    id: crypto.id,
    coinGeckoId: crypto.coinGeckoId,
    name: crypto.name,
    ticker: crypto.ticker,
    icon: crypto.icon,
    earnedByStacking: earnedByStacking,
    earnedAmountByStacking: earnedAmountByStacking,
    averageBuyPrice: getAverageBuyPrice(crypto.transactions),
    totalAmount: getTotalAmount(crypto.transactions, earnedAmountByStacking),
    totalCurrentPrice: getTotalCurrentPrice(crypto, earnedAmountByStacking),
    profit: {
      value: getProfit(crypto, earnedAmountByStacking),
      percentage: getProfitPercentage(crypto, earnedAmountByStacking),
    },
    deposited: getDeposited(crypto),
    currentPrice: crypto.currentPrice,
    description: getDescription(crypto.transactions),
    transactions: crypto.transactions,
  };
};

import { Transaction } from '../../transactions/transaction.entity';
import { TRANSACTION_TYPE } from '../../transactions/types/transactions.types';
import { Asset } from '../asset.entity';

export const getTotalAmount = (
  transactions: Transaction[],
  extraAmount?: number,
): number => {
  let baseTotalAmount = 0;
  for (const transaction of transactions) {
    baseTotalAmount +=
      transaction.transactionType === TRANSACTION_TYPE.BUY
        ? transaction.amount
        : -transaction.amount;
  }
  return baseTotalAmount + extraAmount;
};

export const getTotalCurrentPrice = (
  asset: Asset,
  extraAmount?: number,
): number => {
  return asset.currentPrice * getTotalAmount(asset.transactions, extraAmount);
};

export const getDeposited = (asset: Asset): number => {
  const { transactions } = asset;
  let deposited = 0;
  for (const transaction of transactions) {
    if (transaction.transactionType === TRANSACTION_TYPE.BUY) {
      deposited += transaction.priceAtDate * transaction.amount;
    }
  }
  return deposited;
};

export const getDaysFromNow = (date: Date): number => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getProfitFromSellAmount = (
  transactions: Transaction[],
): number => {
  let profitFromSell = 0;
  for (const transaction of transactions) {
    profitFromSell +=
      transaction.transactionType === TRANSACTION_TYPE.SELL
        ? transaction.priceAtDate * transaction.amount
        : 0;
  }
  return profitFromSell;
};

export const getProfit = (asset: Asset, extraAmount?: number): number => {
  const { transactions } = asset;
  const totalAmount = getTotalAmount(transactions, extraAmount);
  const profitFromSell = getProfitFromSellAmount(transactions);
  const deposited = getDeposited(asset);

  return totalAmount * asset.currentPrice - deposited + profitFromSell;
};

export const getProfitPercentage = (
  asset: Asset,
  extraAmount?: number,
): number => {
  const profit = getProfit(asset, extraAmount);
  const deposited = getDeposited(asset);
  return (profit / deposited) * 100;
};

export const getDescription = (transactions: Transaction[]): string | null => {
  const transactionWithDescription = transactions.find(
    (transaction) => transaction.description,
  );
  if (!transactionWithDescription) {
    return null;
  }
  return transactionWithDescription.description;
};

export const getAverageBuyPrice = (transactions: Transaction[]): number => {
  let totalBuyPrice = 0;
  let buyTransactionsCount = 0;
  for (const transaction of transactions) {
    if (transaction.transactionType === TRANSACTION_TYPE.BUY) {
      totalBuyPrice += transaction.priceAtDate;
      buyTransactionsCount++;
    }
  }
  const averageBuyPrice = totalBuyPrice / buyTransactionsCount;

  return averageBuyPrice;
};

import { Asset } from '../asset.entity';
import { Transaction } from '../../transactions/transaction.entity';
import { getDaysFromNow } from './assets.utils';
import { TRANSACTION_TYPE } from '../../transactions/types/transactions.types';

export const getEarnedByStackingFromTransaction = (
  transaction: Transaction,
): number => {
  if (!transaction.stackingPercentage) {
    return 0;
  }
  const stackedDays = getDaysFromNow(transaction.date);
  return (
    (transaction.stackingPercentage / (365 * 100)) *
    stackedDays *
    transaction.amount
  );
};

export const getEarnedByStacking = (crypto: Asset): number => {
  let earnedByStacking = 0;
  for (const transaction of crypto.transactions) {
    const earned = getEarnedByStackingFromTransaction(transaction);
    earnedByStacking +=
      transaction.transactionType === TRANSACTION_TYPE.BUY ? earned : -earned;
  }
  return earnedByStacking * crypto.currentPrice;
};

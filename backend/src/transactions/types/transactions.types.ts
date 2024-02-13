import { CreateCryptoTxDto } from '../dto/create-crypto-tx.dto';

export enum TRANSACTION_TYPE {
  BUY = 'buy',
  SELL = 'sell',
}

export type CreateTransactionDto = CreateCryptoTxDto;

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';
import { CryptoTx } from './entity/cryptoTx.entity';
import { CurrenciesService } from '../currencies/currencies.service';
import { Crypto } from '../currencies/entities/crypto.entity';
import { CryptoRow } from '../crypto-row/entity/cryptoRow.entity';
import {
  computeTxStackedAmount,
  trimByValue,
} from '../transactions/utils/helpers';

@Injectable()
export class CryptotxService {
  constructor(
    @InjectRepository(Crypto)
    private readonly cryptoRepository: Repository<Crypto>,
    private readonly currencyService: CurrenciesService,
    @InjectRepository(CryptoTx)
    private readonly cryptoTxRepository: Repository<CryptoTx>,
  ) {}

  public async createCryptoTx(
    transactionDto: CreateTransactionDto,
    userId: string,
    cryptoRow: CryptoRow,
  ): Promise<CryptoTx> {
    if (!userId) {
      throw new HttpException('User not authenticated', HttpStatus.BAD_REQUEST);
    }

    const newTx = new CryptoTx();

    const crypto = await this.cryptoRepository.findOneBy({
      ticker: transactionDto.ticker,
    });

    if (!crypto) {
      throw new HttpException('Crypto not found', HttpStatus.BAD_REQUEST);
    }

    const historicalPrice = await this.currencyService.getCryptoHistoricalPrice(
      crypto.coinGeckoId,
      transactionDto.date,
    );

    if (!historicalPrice) {
      throw new HttpException('Invalid date', HttpStatus.BAD_REQUEST);
    }

    newTx.userId = userId;
    newTx.ticker = transactionDto.ticker;
    newTx.amount = transactionDto.amount;
    newTx.transactionType = transactionDto.transactionType;
    newTx.date = transactionDto.date;
    newTx.currencyType = transactionDto.currencyType;
    newTx.cryptoData = crypto;
    newTx.priceAtDate = historicalPrice;
    newTx.row = cryptoRow;

    return this.cryptoTxRepository.save(newTx);
  }

  public getTotalCryptoInfo(
    transactions: CryptoTx[],
    stackingPercentage: string,
  ): {
    totalAmount: number;
    totalPrice: number;
    totalAveragePrice: number;
    totalStackedAmount: number;
    totalStackedInFiat: number;
    averagePrice: number;
    profit: number;
    profitPercentage: string;
  } {
    let totalAmount = 0;
    let averagePrice = 0;
    let totalStackedAmount = 0;
    transactions.forEach((transaction) => {
      const stacked = computeTxStackedAmount(
        transaction.amount,
        transaction.date,
        stackingPercentage,
      );

      if (transaction.transactionType === 'sell') {
        totalStackedAmount -= stacked; // remove potentially profit
        totalAmount -= Number(transaction.amount);
      } else {
        totalStackedAmount += stacked;
        totalAmount += +transaction.amount + stacked;
        averagePrice +=
          Number(transaction.priceAtDate) /
          transactions.filter((tx) => tx.transactionType === 'buy').length;
      }
    });

    const { currentPrice } = transactions[0].cryptoData;
    //totalPrice -- сколько все стоит сейчас
    const totalPrice = trimByValue(totalAmount * Number(currentPrice));
    //totalAveragePrice -- сколько потратил денег на закупку
    const totalAveragePrice = trimByValue(averagePrice * totalAmount);
    const totalStackedInFiat = trimByValue(
      totalStackedAmount * Number(currentPrice),
    );

    const profit = trimByValue(totalPrice - totalAveragePrice);
    const profitPercentage = (
      ((totalPrice - totalAveragePrice) / totalAveragePrice) *
      100
    ).toFixed(2);

    return {
      totalAmount: trimByValue(totalAmount),
      totalPrice,
      averagePrice,
      totalAveragePrice,
      totalStackedAmount,
      totalStackedInFiat,
      profit,
      profitPercentage,
    };
  }

  async fixImageLinks() {
    const crypto = await this.cryptoRepository.find();

    const cryptoWithFixedLinks = crypto.map((c) => {
      return {
        ...c,
        icon: c.icon.replace('/assets', '/assets/crypto'),
      };
    });

    return await this.cryptoRepository.save(cryptoWithFixedLinks);
  }
}

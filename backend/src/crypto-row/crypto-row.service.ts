import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCryptoRowDto } from '../portfolios/dto/create-row.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoRow } from './entity/cryptoRow.entity';
import { Repository } from 'typeorm';
import { Portfolio } from '../portfolios/Entity/Portfolio.entity';
import { CryptotxService } from '../cryptotx/cryptotx.service';

@Injectable()
export class CryptoRowService {
  constructor(
    @InjectRepository(CryptoRow)
    private readonly cryptoRowRepository: Repository<CryptoRow>,
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    private readonly cryptoTxService: CryptotxService,
  ) {}
  public async addCryptoCurrency(userId: string, payload: CreateCryptoRowDto) {
    const cryptoRow = await this.cryptoRowRepository.findOne({
      where: { userId: userId, ticker: payload.ticker },
    });

    if (!cryptoRow) {
      if (payload.transactionType === 'sell') {
        throw new HttpException(
          'Cannot sell crypto that you do not own',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newCryptoRow = new CryptoRow();

      const portfolio = await this.portfolioRepository.findOne({
        where: { userId: userId },
      });

      newCryptoRow.portfolio = portfolio.id;
      newCryptoRow.userId = userId;
      newCryptoRow.ticker = payload.ticker;
      newCryptoRow.stackingPercentage = payload.stackingPercentage;
      newCryptoRow.description = payload.description;

      await this.cryptoRowRepository.save(newCryptoRow);

      return this.cryptoTxService.createCryptoTx(payload, userId, newCryptoRow);
    }

    return this.cryptoTxService.createCryptoTx(payload, userId, cryptoRow);
  }

  public modifyCryptoRow(currency: CryptoRow) {
    const {
      totalAmount,
      totalPrice,
      totalAveragePrice,
      averagePrice,
      totalStackedAmount,
      totalStackedInFiat,
      profit,
      profitPercentage,
    } = this.cryptoTxService.getTotalCryptoInfo(
      currency.transactions,
      currency.stackingPercentage,
    );
    const { cryptoData } = currency.transactions[0];

    const transactionsWithFilteredFields = currency.transactions.map((tx) => {
      return {
        id: tx.id,
        ticker: tx.ticker,
        transactionType: tx.transactionType,
        amount: tx.amount,
        priceAtDate: tx.priceAtDate,
        date: tx.date,
      };
    });

    return {
      ...cryptoData,
      transactions: transactionsWithFilteredFields,
      stackingPercentage: currency.stackingPercentage,
      description: currency.description,
      PortfolioRowId: currency.id,
      totalAmount,
      totalPrice,
      averagePrice,
      totalStackedAmount,
      totalStackedInFiat,
      totalAveragePrice,
      profit,
      profitPercentage,
    };
  }

  public async editCryptoRowDescription(rowId: number, newDescription: string) {
    const cryptoRow = await this.cryptoRowRepository.findOne({
      where: { id: rowId },
    });

    if (!cryptoRow) {
      throw new HttpException(
        'this crypto row not found in Portfolio',
        HttpStatus.NOT_FOUND,
      );
    }

    cryptoRow.description = newDescription;

    console.log('new crypto row', cryptoRow);
    await this.cryptoRowRepository.save(cryptoRow);
  }
}

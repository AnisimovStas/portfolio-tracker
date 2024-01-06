import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../transactions/Entities/transaction.entity';
import { Repository } from 'typeorm';
import { Crypto } from '../currencies/entities/crypto.entity';
import { Portfolio } from './Entity/Portfolio.entity';
import { PortfolioCryptoRow } from './Entity/PortfolioCryptoRow.entity';
import { CreateRowDto } from './dto/create-row.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { CurrenciesService } from '../currencies/currencies.service';
import { editDescriptionDto } from './dto/edit-description.dto';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Crypto)
    private readonly cryptoRepository: Repository<Crypto>,
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    @InjectRepository(PortfolioCryptoRow)
    private readonly portfolioCryptoRowRepository: Repository<PortfolioCryptoRow>,
    private readonly transactionService: TransactionsService,
    private readonly currencyService: CurrenciesService,
  ) {}

  async getPortfolio(userId: string) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { userId },
      relations: {
        crypto: {
          transactions: {
            cryptoData: true,
          },
        },
      },
    });

    const modifiedCrypto = portfolio.crypto
      .map((currency) => {
        const {
          totalAmount,
          totalPrice,
          totalAveragePrice,
          averagePrice,
          totalStackedAmount,
          totalStackedInFiat,
          profit,
          profitPercentage,
        } = this.transactionService.getTotalInfo(
          currency.transactions,
          currency.stackingPercentage,
        );
        const { cryptoData } = currency.transactions[0];

        const transactionsWithFilteredFields = currency.transactions.map(
          (tx) => {
            return {
              id: tx.id,
              ticker: tx.ticker,
              transactionType: tx.transactionType,
              amount: tx.amount,
              priceAtDate: tx.priceAtDate,
              date: tx.date,
            };
          },
        );

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
      })
      .sort((a, b) => b.totalPrice - a.totalPrice);

    const modifiedPortfolio = {
      ...portfolio,
      crypto: modifiedCrypto,
    };

    return modifiedPortfolio ?? '';
  }

  async addCurrency(userId: string, payload: CreateRowDto) {
    const { ticker } = payload;

    let portfolioCryptoRow = await this.portfolioCryptoRowRepository.findOne({
      where: { userId, ticker },
    });

    if (!portfolioCryptoRow) {
      if (payload.transactionType === 'sell') {
        throw new HttpException(
          'Cannot sell crypto that you do not own',
          HttpStatus.BAD_REQUEST,
        );
      }

      const portfolio = await this.portfolioRepository.findOne({
        where: { userId },
      });

      portfolioCryptoRow = new PortfolioCryptoRow();
      portfolioCryptoRow.portfolio = portfolio.id;
      portfolioCryptoRow.userId = userId;
      portfolioCryptoRow.ticker = ticker;
      portfolioCryptoRow.stackingPercentage = payload.stackingPercentage;
      portfolioCryptoRow.description = payload.description;

      await this.portfolioCryptoRowRepository.save(portfolioCryptoRow);
    }

    const newTransaction = new Transaction();

    const crypto = await this.cryptoRepository.findOneBy({
      ticker: ticker,
    });

    const historicalPrice = await this.currencyService.getCryptoHistoricalPrice(
      crypto.coinGeckoId,
      payload.date,
    );

    if (!historicalPrice) {
      throw new HttpException('Invalid date', HttpStatus.BAD_REQUEST);
    }

    newTransaction.userId = userId;
    newTransaction.ticker = ticker;
    newTransaction.amount = payload.amount;
    newTransaction.transactionType = payload.transactionType;
    newTransaction.date = payload.date;
    newTransaction.currencyType = payload.currencyType;
    newTransaction.cryptoData = crypto;
    newTransaction.priceAtDate = historicalPrice;

    newTransaction.portfolioCryptoRow = portfolioCryptoRow;

    await this.transactionRepository.save(newTransaction);
  }
  async createPortfolio(userId: string) {
    const portfolio = this.portfolioRepository.create({
      userId,
    });
    await this.portfolioRepository.save(portfolio);
    return portfolio;
  }

  async editRowDescription(payload: editDescriptionDto) {
    const { portfolioRowId, newDescription } = payload;
    const portfolioRow = await this.portfolioCryptoRowRepository.findOneBy({
      id: portfolioRowId,
    });

    if (!portfolioRow) {
      throw new HttpException('Portfolio row not found', HttpStatus.NOT_FOUND);
    }

    portfolioRow.description = newDescription;

    console.log(portfolioRow);
    await this.portfolioCryptoRowRepository.save(portfolioRow);

    return { msg: 'description updated' };
  }
}

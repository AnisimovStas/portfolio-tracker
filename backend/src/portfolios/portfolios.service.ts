import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../transactions/Entities/transaction.entity';
import { In, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Crypto } from '../currencies/entities/crypto.entity';
import { Portfolio } from './Entity/Portfolio.entity';
import { PortfolioCryptoRow } from './Entity/PortfolioCryptoRow.entity';
import { CreateRowDto } from './dto/create-row.dto';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Crypto)
    private readonly cryptoRepository: Repository<Crypto>,
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    @InjectRepository(PortfolioCryptoRow)
    private readonly portfolioCryptoRowRepository: Repository<PortfolioCryptoRow>,
    private readonly transactionService: TransactionsService,
  ) {}

  async getPortfolio(userId: string) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { userId },
    });
    return portfolio ?? '';
  }

  async addCurrency(userId: string, payload: CreateRowDto) {
    const { ticker } = payload;

    let portfolioCryptoRow = await this.portfolioCryptoRowRepository.findOne({
      where: { userId, ticker },
    });

    if (!portfolioCryptoRow) {
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

    newTransaction.userId = userId;
    newTransaction.ticker = ticker;
    newTransaction.amount = payload.amount;
    newTransaction.transactionType = payload.transactionType;
    newTransaction.date = payload.date;
    newTransaction.currencyType = payload.currencyType;
    newTransaction.crypto = crypto;

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

  async getUserTransactions(userId: string) {
    const transactions = await this.transactionRepository.find({
      where: { userId },
    });
    return transactions;

    if (transactions.length > 0) {
      const TickersArray = transactions
        .map((transaction) => transaction.ticker.toLowerCase())
        .filter((value, index, self) => self.indexOf(value) === index);
      const cryptoList = await this.cryptoRepository.findBy({
        ticker: In(TickersArray),
      });
      return { txData: transactions, coinInfo: cryptoList };
    }

    return [];
  }
}

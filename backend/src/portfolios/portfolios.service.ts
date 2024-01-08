import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './Entity/Portfolio.entity';
import { TCreateRowDto } from './dto/create-row.dto';
import { editDescriptionDto } from './dto/edit-description.dto';
import { CryptoRowService } from '../crypto-row/crypto-row.service';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
    private readonly cryptoRowService: CryptoRowService,
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

    const modifiedCrypto = portfolio.crypto.map((currency) => {
      return this.cryptoRowService.modifyCryptoRow(currency);
    });

    return { ...portfolio, crypto: modifiedCrypto };
  }

  async addCurrency(userId: string, payload: TCreateRowDto) {
    const { currencyType } = payload;

    const portfolio = await this.portfolioRepository.findOne({
      where: { userId },
    });

    if (currencyType === 'crypto') {
      return this.cryptoRowService.addCryptoCurrency(
        userId,
        payload,
        portfolio.id,
      );
    }
  }
  async createPortfolio(userId: string) {
    const portfolio = this.portfolioRepository.create({
      userId,
    });
    await this.portfolioRepository.save(portfolio);
    return portfolio;
  }

  async editRowDescription(payload: editDescriptionDto) {
    const { portfolioRowId, newDescription, rowType } = payload;
    if (rowType === 'crypto') {
      await this.cryptoRowService.editCryptoRowDescription(
        portfolioRowId,
        newDescription,
      );
    }
    return { msg: 'description updated' };
  }
}

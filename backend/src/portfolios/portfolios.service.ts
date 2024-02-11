import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { editDescriptionDto } from './dto/edit-description.dto';
import { CryptoRowService } from '../crypto-row/crypto-row.service';
import { PortfoliosRepository } from './portfolios.repository';
import { User } from '../auth/user.entity';
import { Portfolio } from './Entity/Portfolio.entity';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(PortfoliosRepository)
    private readonly portfolioRepository: PortfoliosRepository,
    private readonly cryptoRowService: CryptoRowService,
  ) {}

  // async getPortfolio(user: User) {
  //   const portfolio = await this.portfolioRepository.findOne({
  //     where: { userId },
  //     relations: {
  //       crypto: {
  //         transactions: {
  //           cryptoData: true,
  //         },
  //       },
  //     },
  //   });
  //
  //   const modifiedCrypto = portfolio.crypto.map((currency) => {
  //     return this.cryptoRowService.modifyCryptoRow(currency);
  //   });
  //
  //   return { ...portfolio, crypto: modifiedCrypto };
  // }

  // async addCurrency(userId: string, payload: TCreateRowDto) {
  //   const { currencyType } = payload;
  //
  //   const portfolio = await this.portfolioRepository.findOne({
  //     where: { userId },
  //   });
  //
  //   if (currencyType === 'crypto') {
  //     return this.cryptoRowService.addCryptoCurrency(
  //       userId,
  //       payload,
  //       portfolio.id,
  //     );
  //   }
  // }
  async createPortfolio(user: User): Promise<Portfolio> {
    return this.portfolioRepository.createPortfolio(user);
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

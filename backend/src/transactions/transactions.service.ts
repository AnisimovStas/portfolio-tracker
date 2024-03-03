import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsRepository } from './transactions.repository';
import { User } from '../auth/user.entity';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './types/transactions.types';
import { ASSET_TYPE } from '../assets/types/assets.types';
import { CreateCryptoTxDto } from './dto/create-crypto-tx.dto';
import { Asset } from '../assets/asset.entity';
import { AssetsService } from '../assets/assets.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsRepository)
    private transactionsRepository: TransactionsRepository,
    private assetsService: AssetsService,
  ) {}

  getTransactions(user: User): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      relations: {
        asset: true,
      },
      where: {
        user,
      },
    });
  }

  createTransaction(
    user: User,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { assetType } = createTransactionDto;

    switch (assetType) {
      case ASSET_TYPE.CRYPTO:
        return this.createCryptoTransaction(user, createTransactionDto);
    }
  }

  async createCryptoTransaction(
    user: User,
    createCryptoTxDto: CreateCryptoTxDto,
  ): Promise<Transaction> {
    const { ticker, assetType } = createCryptoTxDto;

    await this.transactionsRepository.transactionValidator(
      user,
      createCryptoTxDto,
    );

    const cryptoInfo: Asset = await this.assetsService.getAssetByTickerAndType(
      ticker,
      assetType,
    );

    return this.transactionsRepository.createCryptoTransaction(
      user,
      createCryptoTxDto,
      cryptoInfo,
    );
  }
}

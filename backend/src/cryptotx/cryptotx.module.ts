import { Module } from '@nestjs/common';
import { CryptotxService } from './cryptotx.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoTx } from './entity/cryptoTx.entity';
import { Crypto } from '../currencies/entities/crypto.entity';
import { CurrenciesModule } from '../currencies/currencies.module';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoTx, Crypto]), CurrenciesModule],
  providers: [CryptotxService],
  exports: [CryptotxService],
})
export class CryptotxModule {}

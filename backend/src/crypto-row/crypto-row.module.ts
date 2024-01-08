import { Module } from '@nestjs/common';
import { CryptoRowService } from './crypto-row.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoRow } from './entity/cryptoRow.entity';
import { CryptotxModule } from '../cryptotx/cryptotx.module';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoRow]), CryptotxModule],
  providers: [CryptoRowService],
  exports: [CryptoRowService],
})
export class CryptoRowModule {}

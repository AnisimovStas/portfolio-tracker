import { Module } from '@nestjs/common';
import { CryptoRowService } from './crypto-row.service';
import { CryptotxModule } from '../cryptotx/cryptotx.module';

@Module({
  imports: [CryptotxModule],
  providers: [CryptoRowService],
  exports: [CryptoRowService],
})
export class CryptoRowModule {}

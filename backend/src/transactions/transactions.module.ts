import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './Entities/transaction.entity';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { AuthModule } from '../auth/auth.module';
// import { GoogleStrategy } from '../auth/utils/GoogleStrategy';
// import { GoogleAuthGuard } from '../auth/utils/Guards';
// import { SessionSerializer } from '../auth/utils/Serializer';
// import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), AuthModule],
  providers: [
    TransactionsService,
    // GoogleStrategy,
    // GoogleAuthGuard,
    // SessionSerializer,
    // {
    //   provide: 'AUTH_SERVICE',
    //   useClass: AuthService,
    // },
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}

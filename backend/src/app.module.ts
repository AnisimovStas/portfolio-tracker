import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ImageService } from './image/image.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    PortfoliosModule,
    CurrenciesModule,
    TransactionsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'assets', 'crypto'),
      serveRoot: '/assets',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ImageService],
})
export class AppModule {}

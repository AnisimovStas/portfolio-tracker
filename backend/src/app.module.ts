import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { ImageService } from './image/image.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RuStocksModule } from './ru-stocks/ru-stocks.module';
import { ConfigModule } from '@nestjs/config';
import { CryptotxModule } from './cryptotx/cryptotx.module';
import { CryptoRowModule } from './crypto-row/crypto-row.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'portfolio',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PortfoliosModule,
    CurrenciesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'assets'),
      serveRoot: '/assets',
    }),
    AuthModule,
    ScheduleModule.forRoot(),
    RuStocksModule,
    CryptotxModule,
    CryptoRowModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, ImageService],
})
export class AppModule {}

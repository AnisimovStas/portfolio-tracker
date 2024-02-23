import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from './image/image.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { AssetsModule } from './assets/assets.module';
import { AppConfig, DatabaseConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get('database'),
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'img'),
      serveRoot: '/img',
    }),
    AuthModule,
    ScheduleModule.forRoot(),
    TransactionsModule,
    AssetsModule,
  ],
  controllers: [],
  providers: [ImageService],
})
export class AppModule {}

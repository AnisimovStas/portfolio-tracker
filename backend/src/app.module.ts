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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('TYPEORM_HOST'),
          port: parseInt(configService.get<string>('TYPEORM_PORT')),
          username: configService.get<string>('TYPEORM_USERNAME'),
          password: configService.get<string>('TYPEORM_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: ['dist/**/*entity.js'],
          migrations: ['dist/migrations/*.js'],
          migrationsRun: false,
          migrationsTableName: configService.get<string>(
            'TYPEORM_MIGRATIONS_TABLE_NAME',
          ),
          migrationDir: 'src/migrations',
          synchronize: false,
          autoLoadEntities: true,
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

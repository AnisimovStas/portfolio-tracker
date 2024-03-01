import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    logging: process.env.NODE_ENV === 'development',
    migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
    synchronize: process.env.NODE_ENV === 'development',
    migrationsTableName: 'migrations',
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  };
});

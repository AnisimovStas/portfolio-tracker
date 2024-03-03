import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { TRANSACTION_TYPE } from '../types/transactions.types';
import { ASSET_TYPE } from '../../assets/types/assets.types';
import { Transform } from 'class-transformer';

export class CreateCryptoTxDto {
  @IsString()
  @Length(2, 4)
  ticker: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  amount: number;

  @IsEnum(TRANSACTION_TYPE)
  transactionType: TRANSACTION_TYPE;

  @IsDateString({})
  date: Date;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  priceAtDate: number;

  @IsNumber()
  @IsPositive()
  @ValidateIf((_object, value) => Number(value) !== 0)
  @Transform(({ value }) => (value ? Number(value) : null))
  stackingPercentage: number | null;

  @IsEnum(ASSET_TYPE)
  assetType: ASSET_TYPE;
}

import type { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';

export type TCreateRowDto = CreateCryptoRowDto;

export interface CreateCryptoRowDto extends CreateTransactionDto {
  description: string;
  stackingPercentage: string;
}

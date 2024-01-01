import type { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';

export interface CreateRowDto extends CreateTransactionDto {
  description: string;
  stackingPercentage: string;
}

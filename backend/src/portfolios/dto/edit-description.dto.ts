import { TCurrencyType } from '../../transactions/dto/create-transaction.dto';

export interface editDescriptionDto {
  rowType: TCurrencyType;
  portfolioRowId: number;
  newDescription: string;
}

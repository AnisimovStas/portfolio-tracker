import type { IPortfolioCryptoRow } from "~/layers/Portfolio/store/Portfolio.store";

export type TBlockType = "crypto" | "stock";
export interface IActiveTypesProps {
  active: IPortfolioCryptoRow;
  blockType: TBlockType;
  totalBlockValue: number;
}

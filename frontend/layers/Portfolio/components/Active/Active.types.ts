import type { ICrypto } from "~/services/crypto/crypto.service";
import { ACTIVE_TYPE } from "~/types/transaction.types";

export interface IActiveTypesProps {
  active: ICrypto;
  blockType: ACTIVE_TYPE;
  totalBlockValue: number;
}

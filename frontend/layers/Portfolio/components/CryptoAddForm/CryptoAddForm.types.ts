export interface ICryptoAddFormProps {
  amount: string;
  stackingPercentage: string;
}

export interface ICryptoAddFormEmits {
  (e: "update:amount", value: string): void;
  (e: "update:stackingPercentage", value: string): void;
}

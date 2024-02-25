export const formatCurrency = (value: number | undefined | null): string => {
  if (!value) return "-";
  return Number(value.toFixed(2)).toLocaleString();
};

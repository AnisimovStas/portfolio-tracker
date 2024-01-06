export const calculateDaysDifference = (dateString: string): number => {
  const [day, month, year] = dateString.split('-').map(Number);

  const currentDate = new Date();
  const specifiedDate = new Date(year, month - 1, day);

  const timeDifference = currentDate.getTime() - specifiedDate.getTime();

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
};

export const trimByValue = (value: number): number => {
  if (value >= 10000) {
    return +value.toFixed(0);
  }

  if (value >= 100) {
    return +value.toFixed(2);
  }

  if (value >= 1) {
    return +value.toFixed(3);
  }

  return value;
};

export const computeTxStackedAmount = (
  initAmount: string,
  txDate: string,
  stakingPercentage: string,
) => {
  if (!+stakingPercentage) {
    return 0;
  }
  const stackingPerDay = Number(stakingPercentage) / 100 / 365;
  const daysDifference = calculateDaysDifference(txDate);

  const stackedAmount = stackingPerDay * daysDifference * Number(initAmount);
  return trimByValue(stackedAmount);
};

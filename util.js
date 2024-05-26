export const getCurrency = (value) => {
  return value.toLocaleString("en-In", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};
export const getInvestedAmount = (amount, years) => {
  return amount * years * 12;
};
export const getEstimatedReturns = (monthlyInvestment, annualRate, years) => {
  const months = years * 12;
  const monthlyRate = annualRate / 12;

  // Future value calculation
  const futureValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate / 100, months) - 1) / (monthlyRate / 100)) *
    (1 + monthlyRate / 100);
  console.log(futureValue);
  let inv = futureValue.toFixed(0) - monthlyInvestment * months;
  return +inv;
};

export const getInflationAdjValue = (futureValue, inflationRate, years) => {
  let inf = inflationRate / 100;
  let infltionAdjusted = futureValue / Math.pow(1 + inf, years);
  return futureValue - infltionAdjusted;
};

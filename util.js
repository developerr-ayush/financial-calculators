// Function to format numbers with abbreviated forms and hover tooltips
export const getFormattedCurrency = (value) => {
  if (typeof value !== "number" || isNaN(value)) {
    return "₹0";
  }

  const absValue = Math.abs(value);

  // Define the abbreviations and their thresholds
  const abbreviations = [
    { threshold: 1e12, symbol: "T" }, // Trillion
    { threshold: 1e7, symbol: "CR" }, // Crore (10 million)
    { threshold: 1e5, symbol: "L" }, // Lakh (100 thousand)
    { threshold: 1e3, symbol: "K" }, // Thousand
  ];

  // Find the appropriate abbreviation
  for (const abbr of abbreviations) {
    if (absValue >= abbr.threshold) {
      const formattedValue = (value / abbr.threshold).toFixed(1);
      // Remove trailing .0 if it's a whole number
      const displayValue = formattedValue.endsWith(".0")
        ? formattedValue.slice(0, -2)
        : formattedValue;

      return {
        display: `₹${displayValue}${abbr.symbol}`,
        fullValue: value.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }),
        rawValue: value,
      };
    }
  }

  // For smaller values, return formatted currency
  return {
    display: value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }),
    fullValue: value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }),
    rawValue: value,
  };
};

// Legacy function for backward compatibility
export const getCurrency = (value) => {
  const formatted = getFormattedCurrency(value);
  return formatted.display;
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

// ---- Currency formatting (fast + tidy) ----
const INR0 = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const ABBR = [
  { threshold: 1e12, symbol: "T" }, // trillion
  { threshold: 1e7, symbol: "CR" }, // crore
  { threshold: 1e5, symbol: "L" }, // lakh
  { threshold: 1e3, symbol: "K" }, // thousand
];

export const getFormattedCurrency = (value) => {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) {
    return { display: "₹0", fullValue: INR0.format(0), rawValue: 0 };
  }

  const sign = num < 0 ? "-" : "";
  const abs = Math.abs(num);

  for (const { threshold, symbol } of ABBR) {
    if (abs >= threshold) {
      const x = (abs / threshold).toFixed(1);
      const trimmed = x.endsWith(".0") ? x.slice(0, -2) : x;
      return {
        display: `${sign}₹${trimmed}${symbol}`,
        fullValue: INR0.format(num),
        rawValue: num,
      };
    }
  }

  // < 1,000 → just full currency
  return {
    display: INR0.format(num),
    fullValue: INR0.format(num),
    rawValue: num,
  };
};

// Backward compat (kept same API)
export const getCurrency = (value) => getFormattedCurrency(value).display;

// ---- Simple totals ----
export const getInvestedAmount = (amount, years) => {
  if (!Number.isFinite(amount) || !Number.isFinite(years)) return 0;
  return amount * 12 * Math.max(0, years);
};

// ---- SIP / Recurring investment returns (O(1) closed-form) ----
// By default assumes deposit at START of month (annuity-due like many SIPs).
// Pass { due: false } if deposit at END of month (ordinary annuity).
export const getEstimatedReturns = (
  monthlyInvestment,
  annualRate, // percent, e.g. 12 for 12%
  years,
  opts = { due: true, round: true }
) => {
  const { due = true, round = true } = opts ?? {};
  const n = Math.max(0, Math.floor(years * 12));
  const r = Math.pow(1 + (annualRate ?? 0) / 100, 1 / 12) - 1; // monthly decimal rate

  // total paid in
  const totalInvested = monthlyInvestment * n;

  if (
    !Number.isFinite(monthlyInvestment) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years)
  ) {
    return 0;
  }

  if (r === 0) {
    // no growth → returns = 0
    return 0;
  }

  // FV of ordinary annuity: P * [((1+r)^n - 1) / r]
  // If payments at start (due), multiply by (1+r)
  const growthFactor = (Math.pow(1 + r, n) - 1) / r;
  const futureValue = monthlyInvestment * growthFactor * (due ? 1 + r : 1);

  // Calculate returns using correct compound interest formula
  const returns = futureValue - totalInvested;

  return round ? Math.round(returns) : returns;
};

// ---- Inflation impact ----
// Returns the loss of purchasing power (how much inflation "eats").
// If you want present value too, see getInflationAdjustedBreakdown below.
export const getInflationAdjValue = (futureValue, inflationRate, years) => {
  if (
    !Number.isFinite(futureValue) ||
    !Number.isFinite(inflationRate) ||
    !Number.isFinite(years)
  )
    return 0;
  const i = (inflationRate ?? 0) / 100;
  const presentValue = futureValue / Math.pow(1 + i, years);
  return futureValue - presentValue;
};

// (Optional) If you want both numbers handy:
export const getInflationAdjustedBreakdown = (
  futureValue,
  inflationRate,
  years
) => {
  const i = (inflationRate ?? 0) / 100;
  const presentValue = futureValue / Math.pow(1 + i, years);
  return {
    presentValue, // what FV is worth today
    inflationLoss: futureValue - presentValue,
  };
};

// ---- SIP Calculations ----
// Calculate future value of regular SIP
export const calculateSIPFutureValue = (
  monthlyInvestment,
  annualRate,
  years,
  opts = { due: true }
) => {
  const { due = true } = opts ?? {};

  if (
    !Number.isFinite(monthlyInvestment) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years)
  ) {
    return 0;
  }

  const n = Math.max(0, Math.floor(years * 12)); // number of months
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;

  if (monthlyRate === 0) {
    return monthlyInvestment * n;
  }

  // Future value of ordinary annuity formula: P * [((1+r)^n - 1) / r]
  // For annuity due (payment at start of period), multiply by (1+r)
  const futureValue =
    ((monthlyInvestment * (Math.pow(1 + monthlyRate, n) - 1)) / monthlyRate) *
    (due ? 1 + monthlyRate : 1);

  return Math.round(futureValue);
};

// Calculate total invested amount for SIP
export const calculateSIPTotalInvested = (monthlyInvestment, years) => {
  if (!Number.isFinite(monthlyInvestment) || !Number.isFinite(years)) {
    return 0;
  }
  return Math.round(monthlyInvestment * Math.max(0, Math.floor(years * 12)));
};

// Calculate SIP returns (future value - total invested)
export const calculateSIPReturns = (
  monthlyInvestment,
  annualRate,
  years,
  opts = { due: true }
) => {
  const futureValue = calculateSIPFutureValue(
    monthlyInvestment,
    annualRate,
    years,
    opts
  );
  const totalInvested = calculateSIPTotalInvested(monthlyInvestment, years);
  return Math.round(futureValue - totalInvested);
};

// ---- StepUp SIP Calculations ----
// Calculate future value of StepUp SIP (increasing monthly investment)
export const calculateStepUpSIPFutureValue = (
  initialMonthlyInvestment,
  annualStepUpRate,
  annualRate,
  years,
  opts = { due: true }
) => {
  const { due = true } = opts ?? {};

  if (
    !Number.isFinite(initialMonthlyInvestment) ||
    !Number.isFinite(annualStepUpRate) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years)
  ) {
    return 0;
  }

  // Use correct monthly rate calculation
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;

  if (monthlyRate === 0) {
    return calculateStepUpSIPTotalInvested(
      initialMonthlyInvestment,
      annualStepUpRate,
      years
    );
  }

  let futureValue = 0;

  // Calculate future value for each year's contributions
  for (let year = 0; year < years; year++) {
    const currentYearMonthlyInvestment =
      initialMonthlyInvestment * Math.pow(1 + annualStepUpRate / 100, year);

    // This year's contributions will grow for (years - year) years
    const remainingYears = years - year;
    const n = remainingYears * 12; // number of months this contribution grows

    // Future value of ordinary annuity: P * [((1+r)^n - 1) / r] * (1+r) for annuity due
    const yearFutureValue =
      ((currentYearMonthlyInvestment * (Math.pow(1 + monthlyRate, n) - 1)) /
        monthlyRate) *
      (due ? 1 + monthlyRate : 1);

    futureValue += yearFutureValue;
  }

  return Math.round(futureValue);
};

// Helper function to calculate future value for one year's SIP contributions
const calculateYearSIPFutureValue = (
  monthlyInvestment,
  monthlyRate,
  remainingYears,
  due
) => {
  const n = remainingYears * 12; // remaining months

  if (monthlyRate === 0) {
    return monthlyInvestment * n;
  }

  // Future value of ordinary annuity: P * [((1+r)^n - 1) / r] * (1+r) for annuity due
  const futureValue =
    ((monthlyInvestment * (Math.pow(1 + monthlyRate, n) - 1)) / monthlyRate) *
    (due ? 1 + monthlyRate : 1);

  return futureValue;
};

// Calculate total invested amount for StepUp SIP
export const calculateStepUpSIPTotalInvested = (
  initialMonthlyInvestment,
  annualStepUpRate,
  years
) => {
  if (
    !Number.isFinite(initialMonthlyInvestment) ||
    !Number.isFinite(annualStepUpRate) ||
    !Number.isFinite(years)
  ) {
    return 0;
  }

  let totalInvested = 0;

  for (let year = 0; year < years; year++) {
    const currentYearMonthlyInvestment =
      initialMonthlyInvestment * Math.pow(1 + annualStepUpRate / 100, year);
    totalInvested += currentYearMonthlyInvestment * 12;
  }

  return Math.round(totalInvested);
};

// Calculate StepUp SIP returns (future value - total invested)
export const calculateStepUpSIPReturns = (
  initialMonthlyInvestment,
  annualStepUpRate,
  annualRate,
  years,
  opts = { due: true }
) => {
  const futureValue = calculateStepUpSIPFutureValue(
    initialMonthlyInvestment,
    annualStepUpRate,
    annualRate,
    years,
    opts
  );
  const totalInvested = calculateStepUpSIPTotalInvested(
    initialMonthlyInvestment,
    annualStepUpRate,
    years
  );
  return Math.round(futureValue - totalInvested);
};

// ---- Year-by-Year Calculations ----
// Generate year-by-year data for SIP
export const generateSIPYearlyData = (
  monthlyInvestment,
  annualRate,
  years,
  inflationRate = 0
) => {
  const data = [];

  for (let year = 1; year <= years; year++) {
    const investedAmount = calculateSIPTotalInvested(monthlyInvestment, year);
    const futureValue = calculateSIPFutureValue(
      monthlyInvestment,
      annualRate,
      year
    );
    const returns = futureValue - investedAmount;

    let presentValue = futureValue;
    if (inflationRate > 0) {
      const inflationAdjusted = getInflationAdjValue(
        futureValue,
        inflationRate,
        year
      );
      presentValue = futureValue - inflationAdjusted;
    }

    data.push({
      year,
      investedAmount,
      returns,
      futureValue,
      presentValue,
    });
  }

  return data;
};

// Generate year-by-year data for StepUp SIP
export const generateStepUpSIPYearlyData = (
  initialMonthlyInvestment,
  annualStepUpRate,
  annualRate,
  years,
  inflationRate = 0
) => {
  const data = [];

  for (let year = 1; year <= years; year++) {
    const investedAmount = calculateStepUpSIPTotalInvested(
      initialMonthlyInvestment,
      annualStepUpRate,
      year
    );
    const futureValue = calculateStepUpSIPFutureValue(
      initialMonthlyInvestment,
      annualStepUpRate,
      annualRate,
      year
    );
    const returns = futureValue - investedAmount;

    let presentValue = futureValue;
    if (inflationRate > 0) {
      const inflationAdjusted = getInflationAdjValue(
        futureValue,
        inflationRate,
        year
      );
      presentValue = futureValue - inflationAdjusted;
    }

    data.push({
      year,
      investedAmount,
      returns,
      futureValue,
      presentValue,
    });
  }

  return data;
};

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";

export function IncomeTaxCalculator() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial income from URL or default to empty
  const [income, setIncome] = useState(searchParams.get("income") || "");

  // Update URL when income changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (income) params.set("income", income);
    setSearchParams(params);
  }, [income, setSearchParams]);

  // Debounced function to track income
  const debouncedTrackIncome = useCallback(
    (value) => {
      if (window.gtag && value) {
        window.gtag("event", "income_input", {
          event_category: "Tax Calculator",
          income_value: parseFloat(value),
          currency: "INR",
        });
      }
    },
    [] // Empty dependencies as we don't need any external values
  );

  // Setup debounced tracking
  useEffect(() => {
    const timer = setTimeout(() => {
      if (income) {
        debouncedTrackIncome(income);
      }
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, [income, debouncedTrackIncome]);

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const [tax, setTax] = useState(0);
  const [slabBreakdown, setSlabBreakdown] = useState([]);
  const [isSalaried, setIsSalaried] = useState(false);
  const [rebateAmount, setRebateAmount] = useState(0);
  const [taxableIncome, setTaxableIncome] = useState(0);
  const STANDARD_DEDUCTION = 75000;
  const REBATE_LIMIT = 1200000;
  const MARGINAL_RELIEF_LIMIT = 1270000;

  const calculateTax = () => {
    const incomeValue = parseFloat(income);

    if (isNaN(incomeValue) || incomeValue < 0) {
      alert("Please enter a valid income.");
      return;
    }

    // Apply standard deduction for salaried individuals
    const taxableIncomeValue = isSalaried
      ? Math.max(0, incomeValue - STANDARD_DEDUCTION)
      : incomeValue;

    setTaxableIncome(taxableIncomeValue);

    let calculatedTax = 0;
    const breakdown = [];

    const slabs = [
      { min: 0, max: 400000, rate: 0 },
      { min: 400000, max: 800000, rate: 0.05 },
      { min: 800000, max: 1200000, rate: 0.1 },
      { min: 1200000, max: 1600000, rate: 0.15 },
      { min: 1600000, max: 2000000, rate: 0.2 },
      { min: 2000000, max: 2400000, rate: 0.25 },
      { min: 2400000, max: Infinity, rate: 0.3 },
    ];

    for (const slab of slabs) {
      const applicableIncome = Math.max(
        0,
        Math.min(taxableIncomeValue, slab.max) - slab.min
      );
      const slabTax = applicableIncome * slab.rate;
      calculatedTax += slabTax;
      breakdown.push({
        min: slab.min,
        max: slab.max === Infinity ? "Above" : slab.max,
        rate: slab.rate * 100,
        income: applicableIncome,
        tax: slabTax,
      });
    }

    // Check for rebate and marginal relief
    if (taxableIncomeValue <= REBATE_LIMIT) {
      setRebateAmount(calculatedTax);
      setTax(0);
    } else if (taxableIncomeValue <= MARGINAL_RELIEF_LIMIT) {
      // Marginal Relief calculation
      const excessIncome = taxableIncomeValue - REBATE_LIMIT; // Amount over 12L
      const finalTax = excessIncome; // Tax will be equal to excess amount

      setRebateAmount(calculatedTax - finalTax);
      setTax(finalTax);
    } else {
      setRebateAmount(0);
      setTax(calculatedTax);
    }

    // Track successful tax calculation
    if (window.gtag) {
      window.gtag("event", "tax_calculated", {
        event_category: "Tax Calculator",
        income_value: incomeValue,
        is_salaried: isSalaried,
        has_rebate: rebateAmount > 0,
        tax_amount: tax,
        currency: "INR",
      });
    }

    setSlabBreakdown(breakdown);
  };

  // Add useEffect to calculate tax whenever income changes
  useEffect(() => {
    if (income) {
      calculateTax();
    } else {
      setTax(0);
      setSlabBreakdown([]);
    }
  }, [income, isSalaried]);

  return (
    <div className="pt-20">
      <SEO
        title="Income Tax Calculator FY 2025-26"
        description="Calculate your income tax for FY 2025-26 under the new tax regime. Free online tax calculator with standard deduction and tax slab breakdown."
        keywords="income tax calculator, tax calculator 2025-26, new tax regime, income tax india, standard deduction calculator"
      />

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-6 rounded-lg">
          <p className="font-bold mb-2">Disclaimer:</p>
          <ul className="ml-5 mt-2 list-disc space-y-1">
            <li>
              This calculator assumes you are an Indian resident individual
            </li>
            <li>
              The calculations provided are estimates and may not be 100%
              accurate
            </li>
            <li>
              Please consult with a tax professional for precise tax planning
            </li>
          </ul>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Income Tax Calculator (New Regime) FY 25-26
          </h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6 shadow-2xl">
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Annual Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  id="income"
                  name="income"
                  value={income}
                  onChange={handleIncomeChange}
                  min="0"
                  step="1000"
                  placeholder="Enter your total annual income"
                  className="w-full pl-8 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  aria-label="Annual income in rupees"
                />
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Enter your total annual income
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="salaried"
                checked={isSalaried}
                onChange={(e) => setIsSalaried(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="salaried" className="text-slate-300">
                Salaried Individual (Standard Deduction: ₹75,000)
              </label>
            </div>
          </div>
        </div>

        {income && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              Tax Breakdown
            </h2>

            {isSalaried && (
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <p className="text-blue-100 mb-1">
                  Standard Deduction: ₹
                  {STANDARD_DEDUCTION.toLocaleString("en-IN")}
                </p>
                <p className="text-blue-100">
                  Taxable Income: ₹
                  {(parseFloat(income) - STANDARD_DEDUCTION).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            )}

            <div className="bg-slate-700/30 rounded-lg overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/90">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Income Slab (₹)
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Rate (%)
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Income in Slab (₹)
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Tax Amount (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {slabBreakdown.map((slab, index) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-300">
                          {slab.min.toLocaleString("en-IN")} -{" "}
                          {slab.max === "Above"
                            ? `${slab.max} 2,400,000`
                            : slab.max.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300 text-right">
                          {slab.rate}%
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300 text-right">
                          {slab.income.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300 text-right">
                          {slab.tax.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {rebateAmount > 0 && (
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <p className="text-green-100 mb-2">
                  {taxableIncome <= REBATE_LIMIT
                    ? `Your taxable income (₹${taxableIncome.toLocaleString(
                        "en-IN"
                      )}) is eligible for Section 87A rebate.`
                    : `Your taxable income (₹${taxableIncome.toLocaleString(
                        "en-IN"
                      )}) is eligible for Marginal Relief.`}
                </p>
                <p className="text-green-100">
                  Tax relief of ₹{rebateAmount.toLocaleString("en-IN")} will be
                  provided.
                </p>
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg">
              {rebateAmount > 0 ? (
                <div>
                  <p className="text-blue-100 mb-2">
                    Calculated Tax: ₹
                    {(tax + rebateAmount).toLocaleString("en-IN")}
                  </p>
                  <p className="text-blue-100 mb-2">
                    Tax Relief: -₹{rebateAmount.toLocaleString("en-IN")}
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    Final Tax Payable: ₹{tax.toLocaleString("en-IN")}
                  </h3>
                </div>
              ) : (
                <h3 className="text-2xl font-bold text-white">
                  Total Tax: ₹
                  {tax.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </h3>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

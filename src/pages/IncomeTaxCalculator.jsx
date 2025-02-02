import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

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
    <div>
      <div
        style={{
          backgroundColor: "#fef9c3",
          borderLeft: "4px solid #eab308",
          color: "#854d0e",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "0.25rem",
        }}
      >
        <p style={{ fontWeight: "bold" }}>Disclaimer:</p>
        <ul
          style={{
            marginLeft: "1.25rem",
            marginTop: "0.5rem",
            listStyleType: "disc",
          }}
        >
          <li>This calculator assumes you are an Indian resident individual</li>
          <li>
            The calculations provided are estimates and may not be 100% accurate
          </li>
          <li>
            Please consult with a tax professional for precise tax planning
          </li>
        </ul>
      </div>
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Income Tax Calculator (New Regime) FY 25-26
          </Typography>

          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Annual Income"
                type="number"
                id="income"
                name="income"
                value={income}
                onChange={handleIncomeChange}
                InputProps={{
                  startAdornment: "₹",
                }}
                variant="outlined"
                required
                helperText="Enter your total annual income"
                inputProps={{
                  min: "0",
                  step: "1000",
                  "aria-label": "Annual income in rupees",
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSalaried}
                    onChange={(e) => setIsSalaried(e.target.checked)}
                    color="primary"
                  />
                }
                label="Salaried Individual (Standard Deduction: ₹75,000)"
                sx={{ mt: 1 }}
              />
            </Box>
          </Paper>

          {income && (
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Tax Breakdown
              </Typography>

              {isSalaried && (
                <Paper
                  sx={{
                    p: 2,
                    mb: 3,
                    bgcolor: "info.light",
                    color: "info.contrastText",
                  }}
                >
                  <Typography variant="body1">
                    Standard Deduction: ₹
                    {STANDARD_DEDUCTION.toLocaleString("en-IN")}
                  </Typography>
                  <Typography variant="body1">
                    Taxable Income: ₹
                    {(parseFloat(income) - STANDARD_DEDUCTION).toLocaleString(
                      "en-IN"
                    )}
                  </Typography>
                </Paper>
              )}

              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ mb: 3 }}
              >
                <Table aria-label="tax breakdown table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Income Slab (₹)</TableCell>
                      <TableCell align="right">Rate (%)</TableCell>
                      <TableCell align="right">Income in Slab (₹)</TableCell>
                      <TableCell align="right">Tax Amount (₹)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {slabBreakdown.map((slab, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {slab.min.toLocaleString("en-IN")} -{" "}
                          {slab.max === "Above"
                            ? `${slab.max} 2,400,000`
                            : slab.max.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell align="right">{slab.rate}%</TableCell>
                        <TableCell align="right">
                          {slab.income.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell align="right">
                          {slab.tax.toLocaleString("en-IN")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {rebateAmount > 0 && (
                <Paper
                  sx={{
                    p: 2,
                    mb: 3,
                    bgcolor: "success.light",
                    color: "success.contrastText",
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    {taxableIncome <= REBATE_LIMIT
                      ? `Your taxable income (₹${taxableIncome.toLocaleString(
                          "en-IN"
                        )}) is eligible for Section 87A rebate.`
                      : `Your taxable income (₹${taxableIncome.toLocaleString(
                          "en-IN"
                        )}) is eligible for Marginal Relief.`}
                  </Typography>
                  <Typography variant="body1">
                    Tax relief of ₹{rebateAmount.toLocaleString("en-IN")} will
                    be provided.
                  </Typography>
                </Paper>
              )}

              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                {rebateAmount > 0 ? (
                  <>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Calculated Tax: ₹
                      {(tax + rebateAmount).toLocaleString("en-IN")}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Tax Relief: -₹{rebateAmount.toLocaleString("en-IN")}
                    </Typography>
                    <Typography variant="h5" component="h3">
                      Final Tax Payable: ₹{tax.toLocaleString("en-IN")}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="h5" component="h3">
                    Total Tax: ₹
                    {tax.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                )}
              </Paper>
            </Paper>
          )}
        </Box>
      </Container>
    </div>
  );
}

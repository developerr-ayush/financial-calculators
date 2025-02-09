import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export const BudgetingFramework = () => {
  const [income, setIncome] = useState(
    () => localStorage.getItem("income") || ""
  );
  const [budgetDistribution, setBudgetDistribution] = useState({
    needs: 0,
    wants: 0,
    savings: 0,
  });

  // Real-time budget distribution
  useEffect(() => {
    const incomeValue = parseFloat(income);
    if (income && !isNaN(incomeValue)) {
      setBudgetDistribution({
        needs: incomeValue * 0.5, // 50% for needs
        wants: incomeValue * 0.3, // 30% for wants
        savings: incomeValue * 0.2, // 20% for savings
      });
    }
  }, [income]);

  // Format income with thousands separator
  const handleIncomeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setIncome(value);
    localStorage.setItem("income", value);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Simple Budgeting Calculator
      </Typography>
      <Card sx={{ p: 3, boxShadow: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Monthly Income (₹)"
              variant="outlined"
              fullWidth
              value={income}
              onChange={handleIncomeChange}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Budget Distribution:</Typography>
            <Typography>
              Needs: ₹{budgetDistribution.needs.toFixed(2)}
            </Typography>
            <Typography>
              Wants: ₹{budgetDistribution.wants.toFixed(2)}
            </Typography>
            <Typography>
              Savings: ₹{budgetDistribution.savings.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

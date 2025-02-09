import { Box, Card, Grid, Slider, TextField, Typography } from "@mui/material";
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
  const [needsRatio, setNeedsRatio] = useState(50);
  const [wantsRatio, setWantsRatio] = useState(30);
  const [savingsRatio, setSavingsRatio] = useState(20);

  // Real-time budget distribution
  useEffect(() => {
    const incomeValue = parseFloat(income);
    if (income && !isNaN(incomeValue)) {
      setBudgetDistribution({
        needs: incomeValue * (needsRatio / 100),
        wants: incomeValue * (wantsRatio / 100),
        savings: incomeValue * (savingsRatio / 100),
      });
    }
  }, [income, needsRatio, wantsRatio, savingsRatio]);

  // Format income with thousands separator
  const handleIncomeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setIncome(value);
    localStorage.setItem("income", value);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Monthly Budget
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          label="Monthly Income (₹)"
          variant="outlined"
          fullWidth
          value={income}
          onChange={handleIncomeChange}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          sx={{ mb: 2, mt: 2, maxWidth: "300px", marginInline: "auto" }} // Added margin-top for spacing
        />
      </Box>
      <Card sx={{ p: 3, boxShadow: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Adjust Ratios:</Typography>
            <Typography>Needs Ratio: {needsRatio}%</Typography>
            <Slider
              value={needsRatio}
              onChange={(e, newValue) => setNeedsRatio(newValue)}
              aria-labelledby="needs-ratio-slider"
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ color: "#3f51b5", mb: 2 }}
            />
            <Typography>Wants Ratio: {wantsRatio}%</Typography>
            <Slider
              value={wantsRatio}
              onChange={(e, newValue) => setWantsRatio(newValue)}
              aria-labelledby="wants-ratio-slider"
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ color: "#3f51b5", mb: 2 }}
            />
            <Typography>Savings Ratio: {savingsRatio}%</Typography>
            <Slider
              value={savingsRatio}
              onChange={(e, newValue) => setSavingsRatio(newValue)}
              aria-labelledby="savings-ratio-slider"
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ color: "#3f51b5", mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
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

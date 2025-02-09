import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  Slider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"; // Importing necessary chart.js components
import { Pie } from "react-chartjs-2"; // Importing Pie chart component
import { formatInrCurrency } from "../utils/formatters"; // We'll create this

Chart.register(ArcElement, Tooltip, Legend); // Registering components

export const BudgetingCalculator = () => {
  const [income, setIncome] = useState(() => localStorage.getItem("income") || "");
  const [needsRatio, setNeedsRatio] = useState(0.5); // 50% for needs
  const [wantsRatio, setWantsRatio] = useState(0.3); // 30% for wants
  const [savingsRatio, setSavingsRatio] = useState(0.2); // 20% for savings
  const [budgetDistribution, setBudgetDistribution] = useState({
    needs: 0,
    wants: 0,
    savings: 0,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Calculate total ratio
  const totalRatio = useMemo(() => {
    return Number((needsRatio + wantsRatio + savingsRatio).toFixed(2));
  }, [needsRatio, wantsRatio, savingsRatio]);

  // Real-time budget distribution
  useEffect(() => {
    if (income && totalRatio === 1) {
      const incomeValue = parseFloat(income);
      setBudgetDistribution({
        needs: incomeValue * needsRatio,
        wants: incomeValue * wantsRatio,
        savings: incomeValue * savingsRatio,
      });
    }
  }, [income, needsRatio, wantsRatio, savingsRatio, totalRatio]);

  // Handle ratio changes with automatic adjustment
  const handleRatioChange = (type, newValue) => {
    const value = newValue / 100;
    const remaining = 1 - value;

    switch (type) {
      case "needs": {
        const wantsRatioAdjusted = (wantsRatio / (wantsRatio + savingsRatio)) * remaining;
        const savingsRatioAdjusted = (savingsRatio / (wantsRatio + savingsRatio)) * remaining;
        setNeedsRatio(value);
        setWantsRatio(wantsRatioAdjusted);
        setSavingsRatio(savingsRatioAdjusted);
        break;
      }
      case "wants": {
        const needsRatioAdjusted = (needsRatio / (needsRatio + savingsRatio)) * remaining;
        const newSavingsRatio = (savingsRatio / (needsRatio + savingsRatio)) * remaining;
        setNeedsRatio(needsRatioAdjusted);
        setWantsRatio(value);
        setSavingsRatio(newSavingsRatio);
        break;
      }
      case "savings": {
        const newNeedsRatio = (needsRatio / (needsRatio + wantsRatio)) * remaining;
        const newWantsRatio = (wantsRatio / (needsRatio + wantsRatio)) * remaining;
        setNeedsRatio(newNeedsRatio);
        setWantsRatio(newWantsRatio);
        setSavingsRatio(value);
        break;
      }
      default:
        break;
    }
  };

  // Format income with thousands separator
  const handleIncomeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setIncome(value);
    localStorage.setItem("income", value);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Category", "Percentage", "Amount"];
    const data = [
      ["Needs", `${(needsRatio * 100).toFixed(1)}%`, `₹${budgetDistribution.needs.toFixed(2)}`],
      ["Wants", `${(wantsRatio * 100).toFixed(1)}%`, `₹${budgetDistribution.wants.toFixed(2)}`],
      ["Savings", `${(savingsRatio * 100).toFixed(1)}%`, `₹${budgetDistribution.savings.toFixed(2)}`],
    ];

    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "budget_distribution.csv";
    link.click();
  };

  const resetRatios = () => {
    setNeedsRatio(0.5);
    setWantsRatio(0.3);
    setSavingsRatio(0.2);
  };

  const chartData = {
    labels: ["Needs", "Wants", "Savings"],
    datasets: [
      {
        data: [
          budgetDistribution.needs,
          budgetDistribution.wants,
          budgetDistribution.savings,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Budgeting Calculator
      </Typography>
      <Typography variant="body1" gutterBottom>
        Adjust your budget ratios below. Ensure they total 100%. Total Ratio: {(totalRatio * 100).toFixed(1)}%
      </Typography>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Monthly Income (₹)"
              variant="outlined"
              fullWidth
              value={formatInrCurrency(income)}
              onChange={handleIncomeChange}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <Grid item xs={12}>
              <Typography>
                Needs Ratio: {(needsRatio * 100).toFixed(1)}%
              </Typography>
              <Slider
                value={needsRatio * 100}
                onChange={(_, value) => handleRatioChange("needs", value)}
                min={0}
                max={100}
                sx={{ color: "#FF6384" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Wants Ratio: {(wantsRatio * 100).toFixed(1)}%
              </Typography>
              <Slider
                value={wantsRatio * 100}
                onChange={(_, value) => handleRatioChange("wants", value)}
                min={0}
                max={100}
                sx={{ color: "#36A2EB" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Savings Ratio: {(savingsRatio * 100).toFixed(1)}%
              </Typography>
              <Slider
                value={savingsRatio * 100}
                onChange={(_, value) => handleRatioChange("savings", value)}
                min={0}
                max={100}
                sx={{ color: "#FFCE56" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                disabled={totalRatio !== 1}
                onClick={() =>
                  setSnackbar({
                    open: true,
                    message: "Budget updated successfully!",
                    severity: "success",
                  })
                }
              >
                Update Budget
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetRatios}
                sx={{ ml: 2 }}
              >
                Reset Ratios
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Distribution:</Typography>
              <Typography>
                Needs: {formatInrCurrency(budgetDistribution.needs)}
              </Typography>
              <Typography>
                Wants: {formatInrCurrency(budgetDistribution.wants)}
              </Typography>
              <Typography>
                Savings: {formatInrCurrency(budgetDistribution.savings)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={exportToCSV}
                disabled={!income || totalRatio !== 1}
              >
                Export as CSV
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Pie data={chartData} options={{ animation: { duration: 500 } }} />
          </Grid>
        </Grid>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

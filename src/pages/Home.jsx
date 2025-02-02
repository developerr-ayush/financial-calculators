import { Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export const Home = () => {
  return (
    <div>
      <SEO
        title="Financial Calculators"
        description="Free online financial calculators for Income Tax, SIP, Inflation and more. Plan your finances better with our easy-to-use calculators."
        keywords="financial calculators, tax calculator, SIP calculator, inflation calculator, finance tools"
      />

      <Box sx={{ p: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/sip-calculator" style={{ textDecoration: "none" }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Typography variant="h5" gutterBottom>
                  SIP Calculator
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Calculate your SIP investments and returns
                </Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/inflation-calculator" style={{ textDecoration: "none" }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Inflation Calculator
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Calculate the impact of inflation on your money
                </Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link
              to="/income-tax-calculator"
              style={{ textDecoration: "none" }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Income Tax Calculator
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Calculate your income tax under the new tax regime
                </Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

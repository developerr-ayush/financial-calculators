import { Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const calculatorData = [
  {
    path: "/sip-calculator",
    title: "SIP Calculator",
    description: "Calculate your SIP investments and returns",
  },
  {
    path: "/inflation-calculator",
    title: "Inflation Calculator",
    description: "Calculate the impact of inflation on your money",
  },
  {
    path: "/income-tax-calculator",
    title: "Income Tax Calculator",
    description: "Calculate your income tax under the new tax regime",
  },
  {
    path: "/budgeting-framework",
    title: "Budgeting Framework",
    description: "Calculate your monthly budget",
  },
];

export const Home = () => {
  return (
    <div>
      <SEO
        title="Financial Calculators"
        description="Free online financial calculators for Income Tax, SIP, Inflation and more. Plan your finances better with our easy-to-use calculators."
        keywords="financial calculators, tax calculator, SIP calculator, inflation calculator, finance tools"
      />

      <Box
        sx={{ p: 4, bgcolor: "#121212", color: "#ffffff", borderRadius: "8px" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Financial Calculators
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Choose a calculator to help you manage your finances effectively.
        </Typography>
        <Grid container spacing={3}>
          {calculatorData.map(({ path, title, description, icon }) => (
            <Grid item xs={12} sm={6} md={4} key={path}>
              <Link to={path} style={{ textDecoration: "none" }}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    height: "250px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    bgcolor: "#1e1e1e",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 20,
                    },
                  }}
                >
                  {icon}
                  <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                    {title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {description}
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

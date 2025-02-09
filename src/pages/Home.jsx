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

      <Box sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {calculatorData.map(({ path, title, description }) => (
            <Grid item xs={12} sm={6} md={4} key={path}>
              <Link to={path} style={{ textDecoration: "none" }}>
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

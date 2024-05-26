import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useState } from "react";
import BasicTable from "./Table";
let SIPData = [
  {
    name: "amount",
    type: "number",
    label: "Montly Investment",
  },
  {
    name: "duration",
    type: "number",
    label: "Time Period",
  },
  {
    name: "rate",
    type: "number",
    label: "Expected return rate % (p.a)",
  },
  // {
  //   name: "inflation",
  //   type: "number",
  //   label: "Enter Inflation Rate",
  // },
];
let cols = [
  "Years",
  "Invested",
  "Interest",
  "Total Returns",
  //   "Inflation Adjusted",
];
export const SIP = () => {
  const [data, setData] = useState({
    amount: 0,
    duration: 0,
    rate: 0,
    inflation: 0,
  });
  const [rows, setRows] = useState([]);
  const handleChange = (e) => {
    // make sure input is number
    if (isNaN(e.target.value)) {
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let { amount, duration, rate } = data;
    let total = 0;
    let investment = 0;
    let interest = 0;
    // let infltionAdjusted = 0;
    let temp = [];
    for (let i = 1; i <= duration; i++) {
      investment = i * amount * 12;
      interest = investment * (rate / 100);
      total = investment + interest;

      temp.push([
        i,
        investment.toLocaleString("en-In", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }),
        interest.toLocaleString("en-In", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }),
        total.toLocaleString("en-In", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }),
      ]);
    }
    console.log(temp);
    setRows(temp);
  };
  return (
    <Box>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item md={4} sx={{ width: "100%" }}>
          <Card
            sx={{
              p: 2,
              width: { xs: "100%", sm: "auto" },
              margin: "auto",
              position: "sticky",
              top: 10,
            }}
          >
            <form onSubmit={handleSubmit}>
              {SIPData.map((item) => (
                <TextField
                  sx={{ mb: 2, width: "100%" }}
                  key={item.name}
                  id="outlined-error"
                  label={item.label}
                  value={data[item.name]}
                  name={item.name}
                  onChange={handleChange}
                />
              ))}
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                Show Me Magic
              </Button>
            </form>
          </Card>
        </Grid>
        {!!rows.length && (
          <Grid item md={8} sx={{ width: "100%" }}>
            <BasicTable cols={cols} rows={rows} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

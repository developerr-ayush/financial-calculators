import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import BasicTable from "./Table";
import {
  getCurrency,
  getEstimatedReturns,
  getInflationAdjValue,
  getInvestedAmount,
} from "../../util";
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
  {
    name: "inflation",
    type: "number",
    label: "Enter Inflation Rate",
  },
];
let cols = [
  "Years",
  "Invested",
  "Interest",
  "Total Returns",
  "Present Value",
];
export const SIP = () => {
  const [data, setData] = useState({
    amount: 25000,
    duration: 10,
    rate: 12,
    inflation: 6,
  });
  const estdReturn = useMemo(() => {
    return getEstimatedReturns(data.amount, data.rate, data.duration);
  }, [data]);
  const totalInv = useMemo(() => {
    return getInvestedAmount(data.amount, data.duration);
  }, [data]);
  const totalVal = useMemo(() => {
    return estdReturn + totalInv;
  }, [estdReturn, totalInv]);
  const presentVal = useMemo(() => {
    let inflationAdjusted = getInflationAdjValue(
      totalVal,
      data.inflation,
      data.duration
    );
    return totalVal - inflationAdjusted;
  }, [data, totalVal]);
  const [rows, setRows] = useState([]);
  const handleChange = (e) => {
    // make sure input is number
    if (isNaN(e.target.value)) {
      return;
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    let { amount, duration, rate, inflation } = data;
    let temp = [];
    for (let i = 1; i <= duration; i++) {
      let invested = amount * i * 12;
      let interest = getEstimatedReturns(amount, rate, i);
      let totalReturns = invested + interest;
      let inflationAdjusted = getInflationAdjValue(totalReturns, inflation, i);
      temp.push([i, getCurrency(invested), getCurrency(interest), getCurrency(totalReturns), getCurrency(totalReturns - inflationAdjusted)]);
    }
  
    setRows(temp);
  }, [data, totalVal]);
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <p>Invested Amount</p>
              <p>{getCurrency(totalInv)}</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <p>Estimated Returns</p>
              <p>{getCurrency(estdReturn)}</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <p>Total Value</p>
              <p>{getCurrency(totalVal)}</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <p>Present Value</p>
              <p>{getCurrency(presentVal)}</p>
            </Box>
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

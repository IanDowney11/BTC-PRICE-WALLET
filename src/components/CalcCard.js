import React, { useState, useEffect } from "react";
import {TextField, Select, MenuItem, Typography, Grid} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Utility function to format number with commas
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



export default function CalcCardData(props) {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("SATS");
  const [currency, setCurrency] = useState("AUD");
  const [result, setResult] = useState("");

  const handleAmountChange = (event) => {
    const sanitizedValue = event.target.value.replace(/[^\d.]/g, "");

    if (sanitizedValue === "" || !isNaN(parseFloat(sanitizedValue))) {
      setAmount(sanitizedValue);
    }
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  useEffect(() => {
    handleButtonClick();
  }, [unit, currency, amount]);

  const handleButtonClick = () => {
    var divider = 100000000;
    if (unit === "BTC") {
      divider = 1;
    }

    var currencyVal = props.auPriceProp;
    if (currency === "USD") {
      currencyVal = props.usPriceProp;
    } else if (currency === "NZD") {
      currencyVal = props.nzPriceProp;
    }

    const resultValue = (Math.round(currencyVal * amount) / divider).toFixed(2);
    setResult("$" + formatNumberWithCommas(resultValue));
  };

  const formattedAmount = formatNumberWithCommas(amount);

  return (
    <Grid container spacing={2} sx={{maxWidth: 700, margin: 'auto'}}>
      <Grid item xs={12}>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          value={formattedAmount}
          onChange={handleAmountChange}
          type="text" // Change the type to "text" to allow commas in the TextField
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          id="unit"
          value={unit}
          label=""
          onChange={handleUnitChange}
          fullWidth
        >
          <MenuItem value={"SATS"}>SATS</MenuItem>
          <MenuItem value={"BTC"}>BTC</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <Select
          labelId="demo-simple-select-label"
          id="currency"
          value={currency}
          label=""
          onChange={handleCurrencyChange}
          fullWidth
        >
          <MenuItem value={"AUD"}>AUD</MenuItem>
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"NZD"}>NZD</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <Typography id="result" variant="h3" gutterBottom textAlign="center">
          {result}
        </Typography>
      </Grid>
    </Grid>
  );
}

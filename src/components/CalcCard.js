import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Typography from "@mui/material/Typography";

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
    var devider = 100000000;
    if (unit === "BTC") {
      devider = 1;
    }

    var currencyVal = props.auPriceProp;
    if (currency === "USD") {
      currencyVal = props.usPriceProp;
    } else if (currency === "NZD") {
      currencyVal = props.nzPriceProp;
    }

    const resultValue = (Math.round(currencyVal * amount) / devider).toFixed(2);
    setResult("$" + formatNumberWithCommas(resultValue));
  };

  const formattedAmount = formatNumberWithCommas(amount);

  return (
    <form>
      <TextField
        id="amount"
        style={{ width: 350, padding: 5 }}
        label="Amount"
        variant="outlined"
        value={formattedAmount}
        onChange={handleAmountChange}
        type="text" // Change the type to "text" to allow commas in the TextField
      />
      <br />
      <Select
        id="unit"
        value={unit}
        label=""
        onChange={handleUnitChange}
        style={{ width: 110, margin: 5 }}
      >
        <MenuItem value={"SATS"}>SATS</MenuItem>
        <MenuItem value={"BTC"}>BTC</MenuItem>
      </Select>
      <Select
        labelId="demo-simple-select-label"
        id="currency"
        value={currency}
        label=""
        onChange={handleCurrencyChange}
        style={{ width: 110, margin: 5 }}
      >
        <MenuItem value={"AUD"}>AUD</MenuItem>
        <MenuItem value={"USD"}>USD</MenuItem>
        <MenuItem value={"NZD"}>NZD</MenuItem>
      </Select>
      <br />
      <Typography id="result" variant="h3" gutterBottom>
        {result}
      </Typography>
    </form>
  );
}
